import { FETCH_DEGREES } from "../../types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_DEGREES:
      return action.payload.data.degrees;
    default:
      return state;
  }
};
