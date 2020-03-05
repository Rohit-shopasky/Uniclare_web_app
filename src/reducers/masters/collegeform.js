const initstate = {
  FCOLLCODE: "",
  FCOLLNAME: "",
  FTOWN: "",
  FCOLLADD1: "",
  FCOLLADD2: "",
  FCOLLADD3: "",
  FCOLLADD4: "",
  FPRINCIPALNAME: "",
  FPHONE: "",
  FEMAILC: "",
  FADMSTATUS: "",
  FCOLLTYPE: "",
  ffaculty: "",
  fbank: "",
  fbankbranch: "",
  fbankaccno: "",
  fifsccode: "",
  fchequefavour: "",
  fbranchcode: "",
  fbankplace: "",
  fmobile: "",
  faltmobile: "",
  FALTMOBILE: ""
};

export const CollegeForm = (state = initstate, action) => {
  switch (action.type) {
    case "GET_SPECIFIC_COLLEGE":
      return action.payload.data;
    case "COLLEGE_FORM":
      const { name, value } = action.payload;
      return { ...state, [name]: value };

    case "CANCEL_FORM":
      return initstate;
    default:
      return state;
  }
};
