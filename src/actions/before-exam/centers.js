import univadmin from "../../apis/univadmin";

export const fetchDegColl = deggrp => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "fetchDegColl",
        univcode: state.univ.funivcode,
        deggrp: deggrp
      }
    });
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
        type: "FETCH_DEGCOLL",
        payload: response.data
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};

export const updateCntr = (el, i) => {
  return {
    type: "UPD_CNTR_DET",
    payload: { el, i }
  };
};

export const addCntr = el => {
  // console.log(el);
  return {
    type: "ADD_CNTR_DET",
    payload: el
  };
};

export const fetchCntrListdet = (examcntr, degGrp, thpr) => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "fetchCntrListdet",
        univcode: state.univ.funivcode,
        deggrp: degGrp,
        examcntr: examcntr,
        thpr: thpr
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });

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
        type: "FETCH_CNTR_DET",
        payload: response.data
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};

export const saveExamCenter = (examcntrlist, examcntr, degGrp, thpr) => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=saveExamCenter&univcode=" + state.univ.funivcode,
      {
        data: {
          deggrp: degGrp,
          examcntr: examcntr,
          thpr: thpr,
          examcntrlist: examcntrlist
        }
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });

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
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};

export const deleteExamCenter = (examcntr, degGrp, thpr) => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=deleteExamCenter&univcode=" + state.univ.funivcode,
      {
        data: {
          deggrp: degGrp,
          examcntr: examcntr,
          thpr: thpr
        }
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });

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
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};
