import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getDegExmRng = fresdate => {
  return async (dispatch, getState) => {
    // dispatch({
    //   type: "SET_LOADER"
    // });
    const state = getState();

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegExmRng",
        univcode: state.univ.funivcode,
        fresdate: fresdate,
        fdeggrp: state.user.fdeggrp
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "LOAD_DEGEXM_RNG",
        payload: response.data
      });
    }
  };
};

export const getFeeUpdateDet = (
  fresdate,
  fexam,
  fdeg,
  fcollfrm,
  fcollto,
  fregfrm,
  fregto
) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getFeeUpdateDet",
        univcode: state.univ.funivcode,
        fresdate: fresdate,
        fdeggrp: state.user.fdeggrp,
        fexam: fexam,
        fdeg: fdeg,
        fcollfrm: fcollfrm,
        fcollto: fcollto,
        fregfrm: fregfrm,
        fregto: fregto
      }
    });

    console.log("ACTION", response);

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
        type: "SHW_FEE_DET",
        payload: response.data
      });
    }
  };
};

export const changeTblDet = (el, i) => {
  return {
    type: "CHANGE_TBL_DATA",
    payload: { el, i }
  };
};

export const updateRVRTFeeDet = (
  data,
  rvrtFeeDet,
  fresdate,
  fdeg,
  fexam,
  fregfrm,
  fregto,
  frvfee,
  frtfee,
  fcvfee,
  fpcfee,
  frvdate,
  frtdate,
  fcvdate,
  fpcdate,
  fcollfrm,
  fcollto
) => {
  console.log("DATA", data);
  return async (dispatch, getState) => {
    // dispatch({
    //   type: "SET_LOADER"
    // });

    const state = getState();

    const response = await univadmin.post(
      "app.php?a=updateRVRTFeeDet&univcode=" + state.univ.funivcode,
      {
        data: data
      }
    );

    // // dispatch({
    // //   type: "UNSET_LOADER"
    // // });

    console.log("RVRTACTION", response);

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};
