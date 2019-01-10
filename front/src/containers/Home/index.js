import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Brand from '../../components/Brand';
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
                <Layout>
                    <Brand name="Spotaroom" />
                    <CardList items={cards} />
                </Layout>
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
