import { combineReducers } from "redux";
import todos from "./todos";
import count from "./count";

const rootReducer = combineReducers({
    todos,
    count
});

export default rootReducer;