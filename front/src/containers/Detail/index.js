import React, { Component } from 'react';
import { number } from 'prop-types';
import DetailUI from '../../components/Detail';
import Monitor from './components/Monitor';

import openSocket from 'socket.io-client';
import config from '../../config';
import { randomId, omitMe, handleCloseTabWith } from '../../utils';

import { fromEvent } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { path, prop, merge } from 'ramda';
import api from '../../api';

import './style.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.userId = randomId(100);
        this.homeId = this.getHomeId(props);
        this.socket = openSocket(config.monitor.socket);
        this.usersWatching$ = fromEvent(this.socket, `home:${this.homeId}`);
    }

    static propTypes = {
        id : number
    };

    state = {
        usersWatching : 0,
        detail        : null
    };

    render() {
        const { usersWatching, detail } = this.state;
        const data = { ...detail, id : this.homeId };

        return (
            <div className="detail-component-container">
                {detail ? (
                    <DetailUI {...data}>
                        <Monitor users={usersWatching} />
                    </DetailUI>
                ) : null}
            </div>
        );
    }

    async componentDidMount() {
        this.publishWatchingHome();
        this.subscribeUsersWatching();
        handleCloseTabWith(this.handleCloseView);
        await this.renderDetail();
    }

    componentWillUnmount() {
        this.handleCloseView();
    }

    credentials() {
        return {
            userId : this.userId,
            homeId : this.homeId
        };
    }

    publishWatchingHome() {
        this.socket.emit('watching-home', this.credentials());
    }

    publishLeaveHome() {
        this.socket.emit('leave-home', this.credentials());
    }

    subscribeUsersWatching() {
        this.usersWatching$
            .pipe(
                pluck('users'),
                map(omitMe)
            )
            .subscribe(usersCount =>
                this.handleSetState({ usersWatching : usersCount })
            );
    }

    handleCloseView = () => this.publishLeaveHome();

    getHomeId(props) {
        return path(['match', 'params', 'id'], props) || prop('id', props);
    }

    async renderDetail() {
        const detail = await api.detail(this.homeId);
        this.handleSetState({ detail });
    }

    handleSetState(newState) {
        this.setState(merge(this.state, newState));
    }
}

export default Detail;
