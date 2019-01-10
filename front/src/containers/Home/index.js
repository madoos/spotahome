import React, { Component } from 'react';
import CardList from '../../components/CardList';
import './style.css';
import api from '../../api';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        cards : []
    };

    render() {
        const { cards } = this.state;

        return (
            <div className="home-component">
                <CardList items={cards} />
            </div>
        );
    }

    async componentDidMount() {
        const { data } = await api.marketsByCity('madrid');
        this.setState({ cards : data });
    }

    componentWillUnmount() {}
}

export default Home;
