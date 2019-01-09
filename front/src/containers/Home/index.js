import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Brand from '../../components/Brand';
import CardList from '../../components/CardList';
import './style.css';

import data from './data.json';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="home-component">
                <Layout>
                    <Brand name="Spotaroom" />
                    <CardList items={data} />
                </Layout>
            </div>
        );
    }
}

export default Home;
