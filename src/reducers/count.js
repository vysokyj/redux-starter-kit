import Immutable from "immutable";
import { INCREASE, DECREASE } from '../constants/ActionTypes'

const initialState = Immutable.fromJS({
    number: 1
});

function increase(state) {
  return state.set("number", state.get("number") + action.amount);
}

function decrease(state) {
  return state.set("number", state.get("number") - action.amount);
}

export default function update(state = initialState, action) {
    return state
    switch (action.typy) {
        case INCREASE:
            return increase(state);
        case DECREASE:
            return decrease(state);
        default:
            return state;
    }
}
