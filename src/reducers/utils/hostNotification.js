export const postNotifList = (state = [], action) => {
  switch (action.type) {
    case "GET_NOTIFICATION_LIST":
      return action.payload.data;
    default:
      return state;
  }
};

const initstate = {
  flabel: "",
  fcolour: "",
  ffromdate: "",
  ftodate: "",
  forder: "",
  ffilepath: "",
  fusertype: "",
  fdeggrp: ""
};
export const editNotification = (state = initstate, action) => {
  switch (action.type) {
    case "EDIT_NOTIFICATION":
      return action.payload.data;
    case "EDIT_NOTIF_DET":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "SET_FILENAME":
      const filename = action.payload;
      return { ...state, ffilepath: filename };
    case "NEW_NOTIF_DET":
      return initstate;
    default:
      return state;
  }
};
