import { combineReducers } from "redux-immutable";
import routing from "./routing";
import todos from "./todos";
import count from "./count";

const rootReducer = combineReducers({
    routing,
    todos,
    count
});

export default rootReducer;
