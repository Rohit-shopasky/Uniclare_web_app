const initstate = {
  loginfo: {
    femail: "",
    fmobileno: "",
    funivcode: "",
    fusertype: "",
    fuserid: ""
  },
  token: ""
};

const loginReducer = (state = initstate, action) => {
  switch (action.type) {
    case "LOGIN":
      const { loginfo, token } = action.payload.data;
      localStorage.setItem("logtoken", token);
      localStorage.setItem("funivcode", loginfo.funivcode);
      localStorage.setItem("fusertype", loginfo.fusertype);
      return action.payload.data;
    default:
      return state;
  }
};

const user_initstate = {
  femail: "",
  fmobileno: "",
  funivcode: "",
  fusertype: "",
  fuserid: "",
  fdob: "",
  fgender: "",
  fcuruniv: "",
  fcurtype: "",
  fname: "",
  fphotopath: "",
  fdeggrp: "",
  fyear: "",
  fexamtype: "",
  fexamdate: "",
  fexamrange: ""
};

const userReducer = (state = user_initstate, action) => {
  switch (action.type) {
    case "USER_INFO":
      const { user } = action.payload.data;
      return user;
    case "SET_USER_TYPE":
      return { ...state, fcurtype: action.payload.ftype };
    case "SET_UNIV":
      return { ...state, fcuruniv: action.payload.funivcode };
    case "SET_DEGGRP":
      localStorage.setItem("control", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const userTypeReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER_TYPE":
      const { usertype } = action.payload.data;
      return usertype;
    default:
      return state;
  }
};

const menuinitstate = {
  items: [
    {
      icon: "icon-speedometer",
      name: "Dashboard",
      url: "/dashboard"
    }
  ]
};

const menuReducer = (state = menuinitstate, action) => {
  switch (action.type) {
    case "GET_MENUS":
      const menu = { items: action.payload.data };
      return menu;
    default:
      return state;
  }
};

const regn_initstate = {
  states: [],
  univs: [],
  fstate: "",
  funivcode: "",
  fuserid: "",
  fregvalid: false,
  studinfo: {
    fname: "",
    ffather: "",
    fmother: "",
    fusertype: "",
    fdob: ""
  },
  fmobileno: "",
  femail: "",
  fpasswd: "",
  fcpasswd: "",
  fmobvalid: false,
  fmotp: "",
  feotp: ""
};

const regnReducer = (state = regn_initstate, action) => {
  switch (action.type) {
    case "GET_STATES":
      return { ...state, states: action.payload.data.states };
    case "GET_UNIVS":
      return { ...state, univs: action.payload.data.univs };
    case "CHANGE_REGN":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "VALID_REGNO":
      return {
        ...state,
        fregvalid: true,
        studinfo: action.payload.data.studRegnInfo
      };
    case "MOBILE_VALID":
      return { ...state, fmobvalid: true };
    case "CLEAR_REGN":
      return regn_initstate;
    default:
      return state;
  }
};

const fgt_initstate = {
  fmobileno: "",
  fpasswd: "",
  fcpasswd: "",
  fmobvalid: false,
  fmotp: ""
};

const fgtReducer = (state = fgt_initstate, action) => {
  switch (action.type) {
    case "CHANGE_FGT":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "FGT_MOBILE_VALID":
      return { ...state, fmobvalid: true };
    case "CLEAR_FGT":
      return fgt_initstate;
    default:
      return state;
  }
};

export {
  loginReducer,
  userReducer,
  userTypeReducer,
  menuReducer,
  regnReducer,
  fgtReducer
};
