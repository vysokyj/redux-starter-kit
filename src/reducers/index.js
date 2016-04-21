import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import todos from "./todos";
import count from "./count";

const rootReducer = combineReducers({
    todos,
    count,
    routing: routerReducer
});

export default rootReducer;