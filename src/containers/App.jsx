import React, { Component, PropTypes } from "react";
import { Link } from "react-router"
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from "react-bootstrap";

function App({ push, children }) {
  return (
    <div>
      <header>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Navbar.Brand>
                <a onClick={() => push('/')}>Example App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={2} onClick={() => push('/todos')}>Todos</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <article className="container">
        {children}
      </article>

      <footer>
        <div className="container">
          <p className="text-muted">Copyright &copy; Jiri Vysoky, 2016</p>
        </div>
      </footer>
    </div>
  )
}

export default connect(
  null,
  routerActions
)(App);
