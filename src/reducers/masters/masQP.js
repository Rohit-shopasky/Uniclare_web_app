const initstate = {
  fqpcode: "",
  fsubname: "",
  fexamno: "",
  fboard: "",
  fdeggrp: "",
  fdegreerange: ""
};

export const getMasQP = (state = [initstate], action) => {
  switch (action.type) {
    case "GET_MASQP":
      return action.payload.data;

    case "CHANGE_MASQP":
      let { el, i } = action.payload;
      console.log("redunc", state, el, i);
      const newData = state.map((item, j) => {
        let data = item;
        if (j === i) data = { ...el };
        return data;
      });
      return newData;

    default:
      return state;
  }
};
