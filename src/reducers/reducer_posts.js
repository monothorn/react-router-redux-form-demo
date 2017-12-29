import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from "../actions/index";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            const post = action.payload.data;
            // const newState = { ...state}; //es5
            // newState[post.id] = post;
            // return newState;
            return {...state, [post.id]: post};//key interpolation es6

        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POSTS:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'id');//array to object
        default:
            return state;
    }
}