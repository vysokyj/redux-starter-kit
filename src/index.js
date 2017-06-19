import { applyMiddleware, createStore, combineReducers } from "redux";
import { routerReducer, routerMiddleware }  from "react-router-redux";
import { intlReducer } from "react-intl-redux";
import { createBrowerHistory } from "history";
import promise from "redux-promise";
import thunk from "redux-thunk"; // actions are functions
import { createRouter } from "./components";
import reducers from "./reducers";
import "./styles.scss";
const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer,
    intl: intlReducer
});
const history = createBrowerHistory()
const router = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router)(createStore);
const store = createStoreWithMiddleware(rootReducer);
createRouter(store, history);
