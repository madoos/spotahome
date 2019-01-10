import React, { Component } from 'react';
import { string, number } from 'prop-types';
import DetailUI from '../../components/Detail';
import Monitor from './components/Monitor';

import openSocket from 'socket.io-client';
import config from '../../config';
import { randomId, omitMe } from '../../utils';

import { fromEvent } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import './style.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { usersWatching : 0 };
        this.userId = randomId(100);
        this.socket = openSocket(config.monitor.socket);
        this.usersWatching$ = fromEvent(this.socket, `home:${props.id}`);
    }

    static propTypes = {
        id    : number.isRequired,
        photo : string.isRequired,
        title : string.isRequired,
        price : number.isRequired
    };

    render() {
        const data = this.props;
        const { usersWatching } = this.state;

        return (
            <div className="detail-component-container">
                <DetailUI {...data}>
                    <Monitor users={usersWatching} />
                </DetailUI>
            </div>
        );
    }

    componentDidMount() {
        this.publishWatchingHome();
        this.subscribeUsersWatching();
    }

    credentials() {
        return {
            userId : this.userId,
            homeId : this.props.id
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
                this.setState({ usersWatching : usersCount })
            );
    }
}

export default Detail;
