import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getDegreeDet = fdeg => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegreeDet",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fdegree: fdeg
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
        type: "GET_DEG_DETAILS",
        payload: response.data
      });
    }
  };
};

export const changeDegDet = (name, value) => {
  return {
    type: "CHANGE_DEG_DATA",
    payload: { name, value }
  };
};

export const changeSemData = (data, i) => {
  return {
    type: "CHANGE_SEM_DATA",
    payload: { el: data, i }
  };
};

export const cancelDegreeDet = () => {
  return {
    type: "CANCEL_DEG_DET"
  };
};

export const addRow = newRow => {
  return {
    type: "ADD_SEM",
    payload: { newRow }
  };
};

export const saveDegree = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });

    const state = getState();
    const uDet = state.getDegreeDet;

    const response = await univadmin.post(
      "app.php?a=saveDegree&univcode=" + state.univ.funivcode,
      {
        data: uDet
      }
    );

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
      const success = { header: "Success", content: response.data.data.msg };
      dispatch(showError(success));
      dispatch({
        type: "SUCC_RES"
      });
    }
  };
};
