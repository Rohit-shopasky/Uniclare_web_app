import univadmin from "../../apis/univadmin";
import { showError } from "../index";
import { type } from "os";

export const getNotifications = fyear => {
  return async (dispatch, getState) => {
    const state = getState();
    // dispatch({
    //   type: "SET_LOADER"
    // });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getNotificationList",
        univcode: state.univ.funivcode,
        fcurType: state.user.fcurtype,
        fdeggrp: state.user.fdeggrp
      }
    });
    console.log("response list", response);
    // dispatch({
    //   type: "UNSET_LOADER"
    // });

    // });
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong." };
      // dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      // dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "NOTIF_LIST",
        payload: response.data
      });
    }
  };
};
