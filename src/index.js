import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router"
import { syncHistory, routeReducer } from "react-router-redux"
import createLogger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";

import App from "./containers/App";
import HomePage from "./containers/HomePage";
import TodoPage from "./containers/TodoPage";
import AddressPage from "./containers/AddressPage";
import rootReducer from "./reducers";
import "todomvc-app-css/index.css";

const logger = createLogger();
// Sync dispatched route actions to the history
const routerHistory = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, routerHistory, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Required for replaying actions from devtools to work
//routerHistory.listenForReplays(store);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
        const nextReducer = require("./reducers");
        store.replaceReducer(nextReducer);
    });
}

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