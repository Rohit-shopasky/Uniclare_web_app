import * as types from "../../types";

const init_state = {
  fdegree: "",
  combs: [],
  fcombcode: "",
  fcombdesc: "",
  optsubs: [],
  combsubs: []
};

export default (state = init_state, action) => {
  switch (action.type) {
    case types.FETCH_COMBS:
      return { ...state, combs: action.payload.data.combination };
    case types.CHANGE_COMB:
      return { ...state, ...action.payload };
    case types.FETCH_COMBSUBS:
      let combsubs = action.payload.data.combsubs;
      if (combsubs.length === 0) {
        combsubs = [{ fsubcode: "", fdeleted: "false" }];
      }
      return {
        ...state,
        optsubs: action.payload.data.optsubs,
        combsubs: combsubs
      };
    case types.ADD_COMB_SUB:
      return {
        ...state,
        combsubs: [...state.combsubs, { fsubcode: "", fdeleted: "false" }]
      };
    case types.CANCEL_COMB:
      return init_state;
    default:
      return state;
  }
};
