import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Brand from '../../components/Brand';
import './style.css';

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
                </Layout>
            </div>
        );
    }
}

export default Home;
