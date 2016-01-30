import { combineReducers } from "redux";
import { routeReducer } from "react-router-redux";
import todos from "./todos";
import count from "./count";

const rootReducer = combineReducers({
    todos,
    count,
    routing: routeReducer
});

export default rootReducer;