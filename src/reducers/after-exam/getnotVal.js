const GetNotVal = (state = { valuatordet: [] }, action) => {
  switch (action.type) {
    case "GET_NOT_VAL":
      console.log("actionType", action.payload.data);
      return action.payload;
    default:
      return state;
  }
};
export { GetNotVal };

export const fetchDropNotValued = (state = { board: [] }, action) => {
  switch (action.type) {
    case "GET_DROP_DOWN_VALUE":
      return action.payload.data;

    default:
      return state;
  }
};
