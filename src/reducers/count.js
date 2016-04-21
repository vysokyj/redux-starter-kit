import Immutable from "immutable";
import { INCREASE, DECREASE } from '../constants/ActionTypes'

const initialState =  Immutable.fromJS({
    number: 1
});

export default function update(state = initialState, action) {
    return state
    switch (action.typy) {
        case INCREASE:
            return state.set("number", state.number + action.amount);
        case DECREASE:
            return state.set("number", state.number - action.amount);
        default:
            return state;
    }
}
