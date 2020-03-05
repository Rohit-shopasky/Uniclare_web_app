const initstate = { fboardcode: "", fboardname: "", fdeleted: "F", fedit: "T" };
export const boardList = (state = [initstate], action) => {
  switch (action.type) {
    case "GET_BOARD_LIST":
      return action.payload.data;

    case "CHANGE_BOARDDET":
      let { el, i } = action.payload;
      console.log("reduuuu", el, i);
      return state.map((item, j) => {
        let data = item;
        if (j === i) data = { ...el };
        return data;
      });

    case "ADD_BOARDS":
      // let { newRow } = action.payload;
      console.log("Redu", initstate);
      return [...state, initstate];

    default:
      return state;
  }
};
