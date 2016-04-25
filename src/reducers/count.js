import Immutable from "immutable";
import { INCREASE, DECREASE } from '../constants/ActionTypes'

const initialState = Immutable.fromJS({
    number: 1
});

export default function update(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state.update("number", (number) => number + action.amount);
        case DECREASE:
            return state.update("number", (number) => number - action.amount);
        default:
            return state;
    }
}
