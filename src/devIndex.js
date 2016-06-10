import { applyMiddleware, createStore, combineReducers } from "redux";
import { hashHistory } from "react-router"
import { syncHistoryWithStore, routerReducer, routerMiddleware }  from "react-router-redux"
import createLogger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk"; // actions are functions
import { createRouter } from "./components";
import reducers from "./reducers";
import "./styles.scss";

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

function initModuleHot() {
    module.hot.accept("./reducers", () => {
        const nextReducers = require("./reducers").default;
        const nextRootReducer = combineReducers({
            ...nextReducers,
            routing: routerReducer
        });
        store.replaceReducer(nextRootReducer);
    });
}

const logger = createLogger();
const router = routerMiddleware(hashHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(hashHistory, store);
if (module.hot) initModuleHot();
createRouter(store, history);
