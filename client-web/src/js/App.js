import * as React from 'react';
import { Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
const App = () => (React.createElement(Router, null,
    React.createElement("div", null,
        React.createElement("nav", null,
            React.createElement(Link, { to: "/" }, "Home"),
            React.createElement(Link, { to: "/about" }, "About"),
            React.createElement(Link, { to: "/blog" }, "Blog")),
        React.createElement("div", { className: "content" },
            React.createElement(Routes, null)))));
export default hot(module)(App);
