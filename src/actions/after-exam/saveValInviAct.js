import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const saveValInvi = (ftechcodefrm, ftechcodeto, nontype, message) => {
  return async function(dispatch, getState) {
    const state = getState();
    const fdeggrp = state.user.fdeggrp;
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "saveteachvalapi",
        univcode: state.univ.funivcode,
        fboardfrom: "com",
        fboardto: "com",
        status: "all",
        fscale: "all"
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("fffff", response.data, typeof response.data);

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "hjgfjd went wrong" },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_SAVE_VAL_INVI",
        payload: response.data
      });
    } else {
      dispatch({
        type: "DEL_VAL_INVI"
      });
      const error = { header: "Error", content: response.data.msg };
      dispatch(showError(error));
    }
  };
};

export const changeInvite = (el, i) => {
  return {
    type: "CHANGE_INVITE_DATA",
    payload: { el, i }
  };
};

export const changeALL = (el, i) => {
  return {
    type: "CHANGE_ALL",
    payload: { el, i }
  };
};
