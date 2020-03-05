const initstate = {
  DegDet: {
    fdegree: "",
    fdescpn: "",
    ffaculty: "",
    fdeggrp: "",
    fadyear: "",
    fadexamtyp: "",
    fmeexamtyp: "",
    fmeyear: "",
    feligrem01: "",
    feligrem02: "",
    fexamdate: "",
    fadmdeg: "",
    freshold: "",
    frvappfee: "",
    frvappfine: "",
    fxrappfee: ""
  },
  SemDet: [
    {
      fexamno: "",
      fexamname: "",
      ftotsub: "",
      fresyear: "",
      fresexamtype: "",
      fresexamdate: "",
      frvfee: "",
      frtfee: "",
      fxeroxfee: "",
      fcvfee: "",
      frifee: "",
      frvdays: "",
      frtdays: "",
      fxrdays: "",
      fcvdays: "",
      fridays: ""
    }
  ]
};
export const getDegreeDet = (state = initstate, action) => {
  switch (action.type) {
    case "GET_DEG_DETAILS":
      return action.payload.data;

    case "CHANGE_DEG_DATA":
      const { name, value } = action.payload;

      return {
        SemDet: [...state.SemDet],
        DegDet: { ...state.DegDet, [name]: value }
      };

    case "CHANGE_SEM_DATA":
      let { el, i } = action.payload;
      const newSemDet = state.SemDet.map((item, j) => {
        let data = item;
        if (j === i) {
          data = { ...el };
        }
        return data;
      });
      return {
        DegDet: { ...state.DegDet },
        SemDet: newSemDet
      };

    case "SUCC_RES":
      return initstate;

    case "CANCEL_DEG_DET":
      return initstate;

    case "ADD_SEM":
      let { newRow } = action.payload;
      return {
        DegDet: { ...state.DegDet },
        SemDet: [...state.SemDet, newRow]
      };

    default:
      return state;
  }
};
