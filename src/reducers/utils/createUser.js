const initstate = {
  fname: "",
  funivcode: "",
  fregno: "",
  priusertype: "",
  addiusertype: "",
  fmobileno: "",
  femail: "",
  fdob: "",
  fsex: "",
  fpasswd: "",
  factive: ""
};

export const userTypeList = (state = [], action) => {
  switch (action.type) {
    case "USER_TYPE_LIST":
      return action.payload.data;
    default:
      return state;
  }
};

export const userDetails = (state = [], action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return action.payload.data.det;

    case "CHANGE_USER_DETAILS":
      const { name, value } = action.payload;

      if (name == "priusertype" && state.addiusertype != null) {
        var addi = state.addiusertype.split("*");
        const uaddi = addi.filter((el, i) => el != state.priusertype);
        return { ...state, addiusertype: uaddi.join("*"), [name]: value };
      }
      return { ...state, [name]: value };

    case "NEW_USER_DETAILS":
      return { ...initstate, fmobileno: action.payload };
    default:
      return state;
  }
};
