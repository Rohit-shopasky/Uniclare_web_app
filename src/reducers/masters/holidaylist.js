export const holidayList = (state = [], action) => {
  switch (action.type) {
    case "FETCH_HOLIDAY_LIST":
      return action.payload.data;
    // case "CHANGE_REASDET":
    //   let { el, i } = action.payload;
    //   return state.map((item, j) => {
    //     let data = item;
    //     if (j === i) data = { ...el };
    //     return data;
    //   });
    // case "ADD_REASONS":
    //   // let { newRow } = action.payload;
    //   console.log("Redu", initstate);
    //   return [...state, initstate];

    default:
      return state;
  }
};
