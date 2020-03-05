export const feeHeadsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FEE_HEADS":
      if (action.payload.data.length === 0) {
        const item = {
          ffeecode: "",
          fdescpn: "",
          fshortname: "",
          fsequence: "",
          fdeleted: false,
          fdisabled: false
        };
        return [item];
      } else {
        return action.payload.data;
      }
    default:
      return state;
  }
};

export const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CATEGORY":
      return action.payload.data;
    default:
      return state;
  }
};

const feeStrForm_initstate = {
  fdegree: [],
  fexamno: [],
  fcategory: [],
  fconstype: [],
  fcombcode: "",
  module_opt: [],
  feetype: []
};

export const feeStrFormReducer = (state = feeStrForm_initstate, action) => {
  switch (action.type) {
    case "CHANGE_FEESTRFORM":
      return { ...state, [action.payload.name]: action.payload.value };
    case "CANCEL_FEESTR":
      return {
        ...state,
        fdegree: [],
        fexamno: [],
        fcategory: [],
        fconstype: "",
        fcombcode: ""
      };
    default:
      return state;
  }
};

const feedetl_initstate = {
  details: [],
  diff: "F",
  feeHeadCntRes: 0,
  feeRowsCnt: 0
};

export const feeDetlReducer = (state = feedetl_initstate, action) => {
  switch (action.type) {
    case "GET_FEEDETL":
      return action.payload.data;
    case "CANCEL_FEESTR":
      return feedetl_initstate;
    default:
      return state;
  }
};

export const feeDateReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FEEDATES":
      return action.payload.data;
    case "CANCEL_FEESTR":
      return [];
    default:
      return state;
  }
};
