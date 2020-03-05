import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getSendSms = (ftechcodefrm, ftechcodeto, nontype, message) => {
  return async function(dispatch, getState) {
    const state = getState();
    const fdeggrp = state.user.fdeggrp;
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "teachvalapi",
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
    console.log("Sending SMS", response.data, typeof response.data);

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_SEND_SMS",
        payload: response.data
      });
    } else {
      dispatch({
        type: "DEL_SEND_SMS"
      });
      const error = { header: "Error", content: response.data.msg };
      dispatch(showError(error));
    }
  };
};
