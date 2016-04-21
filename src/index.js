import React from "react";
import Immutable from "immutable";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { syncHistoryWithStore, routerMiddleware }  from "react-router-redux"
import createLogger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";

import App from "./containers/App";
import HomePage from "./containers/HomePage";
import TodoPage from "./containers/TodoPage";
import AddressPage from "./containers/AddressPage";
import rootReducer from "./reducers";
import "./styles.scss";

const logger = createLogger({
    stateTransformer: state => state.toJS()
});
// Sync dispatched route actions to the history

const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing

    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const initialState = Immutable.Map();
const router = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer, initialState);

// ract-router-redux expected state.routing as plain JS, this method override defaultSelectLocationState
// also used custom immutable routing reducer
const immutableSelectLocationState = state => state.get("routing").toJS();
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: immutableSelectLocationState
});

// Required for replaying actions from devtools to work
//history.listenForReplays(store);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
        const nextReducer = require("./reducers");
        store.replaceReducer(nextReducer);
    });
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="todos" component={TodoPage}/>
                <Route path="address" component={AddressPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);
