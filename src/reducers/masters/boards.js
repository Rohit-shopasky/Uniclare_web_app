export const getBoard = (state = [], action) => {
  switch (action.type) {
    case "GET_BOARD":
      return action.payload.data;
    default:
      return state;
  }
};
