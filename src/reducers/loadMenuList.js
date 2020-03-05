export const menuLists = (state = [], action) => {
  switch (action.type) {
    case "MENU_LIST":
      return action.payload.data;
    default:
      return state;
  }
};
