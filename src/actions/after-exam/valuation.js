import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const fetchQpBoard = fdeggrp => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getfboard",
        deggrp: fdeggrp,
        univcode: state.user.fcuruniv
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "FETCH_BOARDS",
        payload: response.data
      });
    }
  };
};

export const fetchQpStatistics = fboard => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    dispatch({
      type: "DELETE_QPSTATS"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getscript",
        deggrp: state.user.fdeggrp,
        univcode: state.user.fcuruniv,
        fboard: fboard,
        fexamno: state.user.fexamrange
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "FETCH_QPSTATS",
        payload: response.data
      });
    }
  };
};

export const fetchQpStatisticsSum = () => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    dispatch({
      type: "DELETE_QPSTATS_SUM"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getscriptSummary",
        deggrp: state.user.fdeggrp,
        univcode: state.user.fcuruniv,
        fexamno: state.user.fexamrange
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "FETCH_QPSTATS_SUM",
        payload: response.data
      });
    }
  };
};
