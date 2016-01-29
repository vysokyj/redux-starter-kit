import React, { Component, PropTypes } from "react";
import { Link } from "react-router"
import { connect } from "react-redux";
import { routeActions } from "react-router-redux";


function App({ push, children }) {
    return (
        <div>
            <header>
                Links:
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/todos">Todos</Link>
                {' '}
                <Link to="/address">Address</Link>
            </header>
            <div>
                <button onClick={() => push('/foo')}>Go to /foo</button>
            </div>
            <div style={{ marginTop: '1.5em' }}>{children}</div>
        </div>
    )
}

export default connect(
    null,
    routeActions
)(App);