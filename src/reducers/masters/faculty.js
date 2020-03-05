export const getFaculty = (state = [], action) => {
  switch (action.type) {
    case "GET_FACULTY":
      return action.payload.data;
    default:
      return state;
  }
};
