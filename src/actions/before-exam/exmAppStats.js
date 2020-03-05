import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getExamAppStats = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    var fcollcode =
      state.user.fcurtype != "" && state.user.fcurtype >= 500
        ? state.user.fcollcode
        : "";
    console.log("fcollcode", fcollcode);
    // state.user.fcollcode
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getExmStatsSumm",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fcollcode: fcollcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_EXMAPP_STATS",
        payload: response.data
      });
    }
  };
};

export const getDetExamAppStats = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    var fcollcode =
      state.user.fcurtype != "" && state.user.fcurtype >= 500
        ? state.user.fcollcode
        : "";
    console.log("fcollcode", fcollcode);
    // state.user.fcollcode
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getExmStats",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fcollcode: fcollcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_DET_EXMSTATS",
        payload: response.data
      });
    }
  };
};
