import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router"
import { syncHistory, routeReducer } from "react-router-redux"

import App from "./containers/App";
import HomePage from "./containers/HomePage";
import TodoPage from "./containers/TodoPage";
import AddressPage from "./containers/AddressPage";
import configureStore from "./store/configureStore";
import "todomvc-app-css/index.css";

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="home" component={HomePage}/>
                <Route path="todos" component={TodoPage}/>
                <Route path="address" component={AddressPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);