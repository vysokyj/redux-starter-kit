import { applyMiddleware, createStore, combineReducers } from "redux";
import { routerReducer, routerMiddleware }  from "react-router-redux";
import { intlReducer } from "react-intl-redux";
import { createHashHistory } from "history";
import { createLogger } from 'redux-logger';
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

const history = createHashHistory()
const router = routerMiddleware(history);
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, promise, router, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

if (module.hot) initModuleHot();
createRouter(store, history);
