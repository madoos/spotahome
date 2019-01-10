import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Brand from '../../components/Brand';
import CardList from '../../components/CardList';
import Detail from '../Detail';
import './style.css';
import api from '../../api';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards  : [],
            detail : {
                id    : 129228,
                photo :
                    'https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/9ad8e3ff47245977fdc660a25136a825d011c9607f5bcf139a5a1092.jpg',
                title : '3-bedroom apartment for rent in Retiro, Madrid',
                price : 2200
            }
        };
    }

    render() {
        const { cards, detail } = this.state;

        return (
            <div className="home-component">
                <Layout>
                    <Brand name="Spotaroom" />
                    <Detail {...detail} />
                    <CardList items={cards} />
                </Layout>
            </div>
        );
    }

    async componentDidMount() {
        const { data } = await api.marketsByCity('madrid');
        this.setState({ cards : data });
    }
}

export default Home;
