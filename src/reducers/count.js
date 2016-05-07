import { INCREASE, DECREASE } from '../constants/ActionTypes'

const initialState = {
  number: 1
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
    return {...state, number: state.number + action.amount};
    case DECREASE:
    return {...state, number: state.number - action.amount};
    default:
    return state;
  }
}
