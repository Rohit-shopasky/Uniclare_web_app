import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getEvents = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getEvents",
        univcode: state.univ.funivcode,
        fsendto: state.smsNotif.fsendto,
        fevttype: state.smsNotif.fmsgtype
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    console.log(response);

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_EVENTS",
        payload: response.data
      });
    }
  };
};

export const pushSms = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=pushSms&univcode=" +
        state.univ.funivcode +
        "&fdeggrp=" +
        state.user.fdeggrp,
      { data: state.smsNotif }
    );
    console.log("REs", response);
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const success = { header: "Success", content: response.data.data.msg };
      dispatch(changesms("fresevent", response.data.data.event));
      dispatch(showError(success));
    }
  };
};

export const changesms = (name, value) => {
  return {
    type: "CHANGE_SMS",
    payload: { name, value }
  };
};

export const fliterMsg = (name, value) => {
  return {
    type: "FILTER_MSG",
    payload: { name, value }
  };
};
