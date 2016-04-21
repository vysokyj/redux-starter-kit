/** This is immutable version of react-router-redux reducer */

import Immutable from "immutable";
/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export default (state = initialState, action) => {
    switch(action.type) {
        case LOCATION_CHANGE:
            return state.set("locationBeforeTransitions", action.payload);
        default:
            return state;
    }
};
