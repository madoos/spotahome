import 'babel-polyfill';
import React from 'react';
import Home from './containers/Home';
import Detail from './containers/Detail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div>
                <div className="app-component">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/detail/:id" component={Detail} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
