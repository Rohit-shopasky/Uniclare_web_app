import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const studentDegreeCombintaion = fcollcode => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get(
      "app.php?a=getSubjectCombination&univcode=" +
        state.univ.funivcode +
        "&fcollcode=" +
        fcollcode +
        "&fdeggrp=" +
        state.user.fdeggrp
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
      dispatch({
        type: "STUDENT_DEGREE_COMBINATION",
        payload: response.data
      });
    }
  };
};

export const StudentDegreeCombinationADDrow = () => {
  return {
    type: "STUDENT_DEGREE_COMBINATION_CHANGE"
  };
};

export const changeAdmissionData = (el, i) => {
  return {
    type: "CHANGE_ADMISSION_DATA",
    payload: { el, i }
  };
};
export const filterFcombdata = data => {
  return {
    type: "FILTER_FCOMBCODE_DATA",
    payload: data
  };
};

// http://192.168.0.8/univadmin/app.php?a=submitSubjectCombination&univcode=041

// {
//   data: editData
// }
export const showErrorType = text => {
  return async (dispatch, getState) => {
    const state = getState();

    const error = { header: "Error", content: text };
    dispatch(showError(error));
  };
};
export const saveDegreeCombintaion = (
  data,
  fcollcode,
  duplicateData,
  emptyData,
  finalData
) => {
  return async (dispatch, getState) => {
    const state = getState();

    if (emptyData) {
      const error = { header: "Error", content: "You have empty data" };
      dispatch(showError(error));
    } else if (duplicateData) {
      const error = { header: "Error", content: "You have dupilcate data" };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "SET_LOADER"
      });
      const response = await univadmin.post(
        "app.php?a=submitSubjectCombination&univcode=" +
          state.univ.funivcode +
          "&fcollcode=" +
          fcollcode,
        {
          submit: finalData
        }
      );
      dispatch({
        type: "UNSET_LOADER"
      });
      if (typeof response.data !== "object") {
        const error = { header: "Error", content: "Something went wrong" };
        dispatch(showError(error));
      } else if (response.data.error_code === -1) {
        const error = { header: "Error", content: response.data.msg };
        dispatch(showError(error));
      } else {
        const error = { header: "Success", content: response.data.msg };
        dispatch(showError(error));
      }
    }
  };
};
export const cancelCollegeComb = () => {
  return {
    type: "CANCEL_COLLEGECOMB"
  };
};
