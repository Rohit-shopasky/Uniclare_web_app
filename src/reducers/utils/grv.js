const initstate = {
  header: {
    fgrvdate: "",
    fgrvemail: "",
    fgrvfrom: "",
    fgrvid: "",
    fgrvmobile: "",
    fgrvmode: "",
    fgrvmsg: "",
    fgrvstatus: null,
    fgrvsub: "",
    fgrvuser: "",
    fregno: "",
    fstudemail: "",
    funivcode: "",
    funivname: "",
    funivshort: ""
  },
  txns: []
};

export const grvlstReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_GRV_LIST":
      return action.payload.data;
    case "GET_LIST_GRV":
      if (action.payload) return state.filter(i => i.fgrvid !== action.payload);
      return state;
    default:
      return state;
  }
};

export const grvReducer = (state = initstate, action) => {
  switch (action.type) {
    case "GET_GRV":
      if (action.payload.data)
        // console.log('reducer', action.payload.data);
        return action.payload.data;
    case "GRV_DET":
      if (action.payload) return initstate;
    default:
      return state;
  }
};

export const grvSntReducer = (state = [], action) => {
  switch (action.type) {
    case "GRV_SENT":
      if (action.payload.data) {
        // console.log('reducer', action.payload.data);
        // setTimeout('window.location.reload();', 3000);
        return action.payload.data;
      }

    default:
      return state;
  }
};
