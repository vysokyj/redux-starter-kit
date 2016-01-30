import React, { Component, PropTypes } from "react";
import { Link } from "react-router"
import { connect } from "react-redux";
import { routeActions } from "react-router-redux";
import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Well } from "react-bootstrap";

function App({ push, children }) {
    return (
        <div>
            <header>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Example App</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={() => push('/')} href="#">Home</NavItem>
                            <NavItem eventKey={2} onClick={() => push('/todos')} href="#">Todos</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={() => push('/address')} href="#">Address</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <article className="container" style={{ marginTop: "1.5em" }}>{children}</article>
            <footer>
                <Well>
                    Example App<br/>
                    Copyright &copy; Jiri Vysoky, 2016
                </Well>
            </footer>
        </div>
    )
}

export default connect(
    null,
    routeActions
)(App);