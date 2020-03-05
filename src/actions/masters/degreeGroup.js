import univadmin from "../../apis/univadmin";

export const getDegreeGroupDegree = deggrp => {
  return async (dispatch, getState) => {
    console.log(deggrp);
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegreeGroupDegree",
        deggrp: deggrp,
        univcode: state.univ.funivcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log(typeof response.data)
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      dispatch({
        type: "SHOW_ERROR",
        payload: error
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "FETCH_DEGGRP_DEGREE",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch({
        type: "SHOW_ERROR",
        payload: error
      });
    }
  };
};

/*
export const addDateMaster = (item) => {
  return {
    type: 'ADD_DATE_MASTER',
    payload: item
  }
}

export const deleteDateMaster = () => {
  return {
    type: 'DELETE_DATE_MASTER',
  }
}*/

export const selectDeggrpDegree = (el, i) => {
  return {
    type: "SELECT_DEGGRP_DEGREE",
    payload: { el, i }
  };
};

export const saveDeggrpDegrees = deggrp => {
  return async (dispatch, getState) => {
    console.log(deggrp);
    const state = getState();
    const degrees = state.degGrpDegree;
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=saveDeggrpDegrees&univcode=" + state.univ.funivcode,
      {
        data: {
          deggrp: deggrp,
          degrees: degrees
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
