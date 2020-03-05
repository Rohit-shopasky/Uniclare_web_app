const initstate = {
  deggrp: "C",
  fmsgtype: "SMS",
  fsendto: "CL",
  fevttype: "GEN",
  fevent: "GEN",
  fcollfrom: "0000",
  fcollto: "ZZZZ",
  fdegfrom: "00000",
  fdegto: "ZZZZZ",
  fregfrom: "00000",
  fregto: "ZZZZZ",
  fboardfrom: "0000",
  fboardto: "ZZZZ",
  ftitle: "",
  fmsg: "",
  fevents: [],
  fresevent: "",
  fedit: "T",
  fteachfrom: "0000",
  fteachto: "ZZZZ",
};

const smsReducer = (state = initstate, action) => {
  switch (action.type) {
    case "GET_EVENTS":
      return { ...state, fevents: action.payload.data };
    case "FILTER_MSG":
      const fevent = action.payload.value;
      const msgobj = state.fevents.filter((el, i) => {
        if (el.fevent == fevent) return el;
      })[0];
      return {
        ...state,
        fmsg: msgobj.fmessage,
        fedit: msgobj.fedit,
        ftitle: msgobj.ftitle
      };
    case "CHANGE_SMS":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "CLEAR_SMS":
      return initstate;
    default:
      return state;
  }
};

export { smsReducer };
