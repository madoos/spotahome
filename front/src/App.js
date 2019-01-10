import 'babel-polyfill';
import React from 'react';
import Layout from './components/Layout';
import Brand from './components/Brand';
import Home from './containers/Home';
import Detail from './containers/Detail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Layout>
                <div className="app-component">
                    <Brand name="Spotaroom" />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route
                                exact
                                path="/detail/:id"
                                component={Detail}
                            />
                        </Switch>
                    </div>
                </div>
            </Layout>
        </Router>
    );
};

export default App;
