export const getDegExmRng = (state = [], action) => {
  switch (action.type) {
    case "LOAD_DEGEXM_RNG":
      return action.payload.data;
    default:
      return state;
  }
};

export const shwFeeUpdateDet = (state = [], action) => {
  switch (action.type) {
    case "SHW_FEE_DET":
      return action.payload.data;
    case "CHANGE_TBL_DATA":
      let { el, i } = action.payload;
      var ustate = state.map((item, j) => {
        let data = item;
        if (j === i) {
          data = { ...el };
        }
        return data;
      });
      return ustate;
    default:
      return state;
  }
};
