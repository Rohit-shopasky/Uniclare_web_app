import univadmin from "../../apis/univadmin";

export const getDateMaster = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDateMaster",
        deggrp: state.user.fdeggrp,
        univcode: state.univ.funivcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log(typeof response.data)
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
        type: "FETCH_DATE_MASTER",
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

export const addDateMaster = item => {
  return {
    type: "ADD_DATE_MASTER",
    payload: item
  };
};

export const deleteDateMaster = () => {
  return {
    type: "DELETE_DATE_MASTER"
  };
};

export const changeDateMaster = (el, i) => {
  return {
    type: "CHANGE_DATE_MASTER",
    payload: { el, i }
  };
};

export const insertUpdateDateMaster = (newDateMaster, fdeggrp) => {
  return async (dispatch, getState) => {
    const state = getState();
    // const myObjStr = JSON.stringify(newDateMaster);
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=insertUpdateDateMaster&univcode=" + state.univ.funivcode,
      {
        data: {
          fdeggrp: state.user.fdeggrp,
          univcode: state.univ.funivcode,
          newDM: newDateMaster,
          user: state.user
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
