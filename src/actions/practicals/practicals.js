import univadmin from "../../apis/univadmin";
import * as types from "../../types";

export const fetchPrDegrees = (deggrp, fboard, modtype) => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegrees",
        modtype: modtype,
        fboard: fboard,
        deggrp: state.user.fdeggrp,
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong wile fetching Practical Degrees" },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: types.FETCH_DEGREES,
        payload: response.data
      });
    }
  };
};

export const fetchPrSubs = (fdegree, fboard) => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getPracticalSubjects",
        fdegree: fdegree,
        fboard: fboard,
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong wile fetching Practical Subjects" },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: "FETCH_PRSUB",
        payload: response.data
      });
    }
  };
};

export const fetchSubPrBoard = fdeggrp => {
  return async function(dispatch, getState) {
    const state = getState();
    // console.log(fdeggrp);
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getPracticalBoards",
        fdeggrp: fdeggrp,
        univcode: state.user.fcuruniv
      }
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong wile fetching Practical Boards" },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: "FETCH_BOARDS",
        payload: response.data
      });
    }
  };
};

export const fetchPrBatchDet = (fdeggrp, fboard, fdegree, fsubcode) => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getPracticalBatchDet",
        fdeggrp: fdeggrp,
        fdegree: fdegree,
        fboard: fboard,
        fsubcode: fsubcode,
        univcode: state.univ.funivcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: {
          msg: "Something went wrong wile fetching Practical Batch Details"
        },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: "FETCH_PRBATCHDET",
        payload: response.data
      });
    }
  };
};
