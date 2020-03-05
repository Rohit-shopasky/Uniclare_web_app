export const fetchDropDownOptions = (state = [], action) => {
  switch (action.type) {
    case "GET_DROP_DOWN_OPTIONS":
      // console.log("dp", action.payload.data);

      //if (action.payload.data.length != 0)
      return action.payload.data;

    default:
      return state;
  }
};
