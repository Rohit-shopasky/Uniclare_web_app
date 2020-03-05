let elData = [];
export const refundReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_REFUND_LIST":
      return action.payload;
    case "CHANGE_REFUND_DET":
      let { el, i } = action.payload;
      const newSublvl = state.map((item, j) => {
        let data = item;
        if (j === i) data = { ...el };
        return data;
      });
      return newSublvl;
    case "EMPTY_REFUND_LIST":
      return [];
    default:
      return state;
  }
};
