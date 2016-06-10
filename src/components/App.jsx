import React from "react";
import PureRenderComponent from "./PureRenderComponent";
import {connect} from "react-redux";
import {routerActions} from "react-router-redux";
import {Navbar, Nav, NavItem} from "react-bootstrap";

@connect(
    null,
    routerActions
)
class App extends PureRenderComponent {

    render() {
        const {push, children} = this.props;
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
}

export default App;
