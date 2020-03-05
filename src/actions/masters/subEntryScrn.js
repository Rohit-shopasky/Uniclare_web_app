import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getSubDet = () => {
  return async (dispatch, getState) => {
    const state = getState();
    // dispatch({
    //   type: "SET_LOADER"
    // });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getSubDet",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fdegree: state.subjectData.mainlvl.fdegree,
        fexamno: state.subjectData.mainlvl.fexamno
      }
    });

    // dispatch({
    //   type: "UNSET_LOADER"
    // });
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_SUBJECTS",
        payload: response.data
      });
    }
  };
};

export const changeSubDet = (name, value) => {
  return {
    type: "CHANGE_SUB_DATA",
    payload: { name, value }
  };
};

export const changeSublvl = (el, i) => {
  return {
    type: "CHANGE_SUB_LVL",
    payload: { el, i }
  };
};

export const getSubjectDet = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getSubjectData",
        univcode: state.univ.funivcode,
        fdegree: state.subjectData.mainlvl.fdegree,
        fexamno: state.subjectData.mainlvl.fexamno,
        fsubcode: state.subjectData.mainlvl.fsubcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("Response", response);

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_SUBJECT_DATA",
        payload: response.data
      });
    }
  };
};

export const cancelDet = () => {
  return {
    type: "CANCEL_DET"
  };
};

export const addRow = type => {
  return {
    type: type
    // payload: { newRow }
  };
};

export const saveSubDet = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const subDet = state.subjectData;

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "app.php?a=saveSubDet&univcode=" + state.univ.funivcode,
      { data: subDet }
    );

    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("Response", response);

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
        type: "SUCC_SUBJECT"
      });
    }
  };
};
