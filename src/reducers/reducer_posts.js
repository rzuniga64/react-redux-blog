import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        // Get rid of key/value in the list of posts using lodash which will return a new state object.
    case DELETE_POST:
        return _.omit(state, action.payload);
        case FETCH_POST:
        // Get all posts out of state object into new object, use id using key interpolation [] to find post
        // Make a new key on object and set is value to action.payload.data.
        return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      // take a property out of an array of records and create an object using lodash
        return _.mapKeys(action.payload.data, 'id');
    default:
        return state;
  }
}
