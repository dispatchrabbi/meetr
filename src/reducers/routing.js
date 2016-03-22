import Immutable from 'immutable';
import {
  LOCATION_CHANGE,
} from 'react-router-redux';

/*
 * This reducer for the `routing` proprty on the state is usually provided for by react-router-redux. We're using a
 * different one because we're also using Immutable.JS.
 */
const INITIAL_ROUTER_STATE = Immutable.fromJS({
  locationBeforeTransitions: null,
});
export const routing = function routing(state = INITIAL_ROUTER_STATE, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({ locationBeforeTransitions: action.payload });
    default:
      return state;
  }
};
