import { FETCH_PRICES } from "../actions/types";
import axios from 'axios'

const initialState = {
  items: {"d":1},
};
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRICES:
      return {
        items: action.payload,
      };
    default:
      return state;
  }
}