const initstate = {
  mainlvl: {
    fdegree: "",
    fexamno: "",
    fsubcode: "",
    fsubshort: "",
    fsubname: "",
    fmaxmarks: "",
    fminmarks: "",
    ftheorymin: "",
    fpractmin: "",
    fcredits: "",
    fthcr: "",
    fprcr: "",
    fblockno: "",
    fcarryupto: "",
    fdeptcode: "",
    fmandatory: "",
    fsuspend: "",
    fltp: "",
    fsubsidary: "",
    fmarkdesc1: "",
    fmarkdesc2: "",
    fboard: ""
  },
  sublvl: [
    {
      fssubcode: "",
      fssubname: "",
      fshortname: "",
      ftheory: "",
      fintass: "",
      fretain: "",
      fgroup: "",
      fsmaxmarks: "",
      fsminmarks: "",
      fparentsub: "",
      fmodmarks: "",
      fgrace: "",
      fcodeno: "",
      fqpcode: "",
      fvalmax: ""
    }
  ]
};

export const getExmNo = (state = [], action) => {
  switch (action.type) {
    case "FETCH_EXAMNO":
      return action.payload.data;
    default:
      return state;
  }
};

export const getSubDet = (state = initstate, action) => {
  switch (action.type) {
    case "GET_SUBJECTS":
      return action.payload.data;
    default:
      return state;
  }
};

export const getSubData = (state = initstate, action) => {
  switch (action.type) {
    case "GET_SUBJECT_DATA":
      return action.payload.data;

    case "CHANGE_SUB_DATA":
      const { name, value } = action.payload;

      return {
        sublvl: [...state.sublvl],
        mainlvl: { ...state.mainlvl, [name]: value }
      };

    case "CHANGE_SUB_LVL":
      console.log("Redu sub lvllll", action.payload);
      let { el, i } = action.payload;
      const newSublvl = state.sublvl.map((item, j) => {
        let data = item;
        if (j === i) data = { ...el };
        return data;
      });
      return {
        mainlvl: { ...state.mainlvl },
        sublvl: newSublvl
      };

    case "SUCC_SUBJECT":
      return initstate;

    case "CANCEL_DET":
      return initstate;

    case "ADD_SUBLVL":
      // let { newRow } = action.payload;
      return {
        mainlvl: { ...state.mainlvl },
        sublvl: [...state.sublvl, initstate.sublvl]
      };

    default:
      return state;
  }
};
