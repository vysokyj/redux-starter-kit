import { applyMiddleware, createStore, combineReducers } from "redux";
import { browserHistory } from "react-router"
import { syncHistoryWithStore, routerReducer, routerMiddleware }  from "react-router-redux"
import createLogger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { createRouter } from "./components";

import "./styles.scss";

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const logger = createLogger();
const router = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

// Required for replaying actions from devtools to work
//history.listenForReplays(store);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept("./reducers", () => {
    const nextReducer = require("./reducers");
    store.replaceReducer(nextReducer);
  });
}

createRouter(store, history);
