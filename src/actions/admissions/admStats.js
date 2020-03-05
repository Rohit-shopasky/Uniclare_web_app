import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getAdmStats = rtype => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    var fcollcode =
      state.user.fcurtype != "" && state.user.fcurtype >= 500
        ? state.user.fcollcode
        : "";
    // state.user.fcollcode

    const response = await univadmin.get("/app.php", {
      params: {
        a: "admStats",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fcollcode: fcollcode,
        frtype: rtype
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("response.data.error_code", response.data.error_code);
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code == -1) {
      console.log(response.data.data.msg);
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_ADM_STATS",
        payload: response.data
      });
    }
  };
};

export const getSpecificCollDet = fcollcode => {
  return async (dispatch, getState) => {
    const state = getState();
    // dispatch({
    //   type: "SET_LOADER"
    // });
    // var fcollcode =
    //   state.user.fcurtype != "" && state.user.fcurtype >= 500
    //     ? state.user.fcollcode
    //     : "";
    // state.user.fcollcode

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getSpecificCollDet",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fcollcode: fcollcode
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code == -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_PCOLL_DET",
        payload: response.data
      });
    }
  };
};
