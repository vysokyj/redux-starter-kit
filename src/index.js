import { applyMiddleware, createStore, combineReducers } from "redux";
import { hashHistory } from "react-router";
import { syncHistoryWithStore, routerReducer, routerMiddleware }  from "react-router-redux";
import { intlReducer } from "react-intl-redux";
import promise from "redux-promise";
import thunk from "redux-thunk"; // actions are functions
import { createRouter } from "./components";
import reducers from "./reducers";
import "./styles.scss";
const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    intl: intlReducer
});
const router = routerMiddleware(hashHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(hashHistory, store);
createRouter(store, history);
