import Immutable from "immutable";
import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from "../constants/ActionTypes"

const initialState = Immutable.fromJS([
    {
        text: "Use Redux",
        completed: false,
        id: 0
    }
]);

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.insert(0, Immutable.fromJS({
                id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                completed: false,
                text: action.text
            }));

        case DELETE_TODO:
            return state.filter((todo) => todo.get("id") !== action.id);

        case EDIT_TODO:
            return state.update(
              list.findIndex((todo) => todo.get("id") === action.id),
              (todo) => todo = Immutable.fromJS(action)
            );

        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    todo.set("completed", !todo.get("completed")) :
                    todo
            );

        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.completed)
            return state.map(todo => todo.set("completed", !areAllMarked));

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.get("completed") === false)

        default:
            return state
    }
}
