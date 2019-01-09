import React from 'react';
import { any } from 'prop-types';
import './style.css';

const Layout = ({ children }) => (
    <div className="layout-component">{children}</div>
);

Layout.propTypes = {
    children : any
};

export default Layout;
