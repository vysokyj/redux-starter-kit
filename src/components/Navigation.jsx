import React from "react";
import PureRenderComponent from "./PureRenderComponent";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import { push } from "react-router-redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as RouterActions from "../actions/router";

@connect(
    null,
    (dispatch) => ({
        routerActions: bindActionCreators(RouterActions, dispatch)
    })
)
class Navigation extends PureRenderComponent {

  render() {
    const routerActions = this.props.routerActions;
    return (
      <Navbar inverse staticTop>
          <Navbar.Header>
              <Navbar.Brand>
                  <a onClick={() => routerActions.navigate("/")}>Example App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
              <Nav>
                  <NavItem eventKey={2} onClick={() => routerActions.navigate("/todos")}>Todos</NavItem>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
