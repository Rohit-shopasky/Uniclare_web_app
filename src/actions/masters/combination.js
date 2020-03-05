import univadmin from "../../apis/univadmin";
import * as types from "../../types";
import { showError } from "../index";
import { stat } from "fs";

export const fetchComb = degree => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getCombinations",
        deg: degree,
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: types.FETCH_COMBS,
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const fetchCombSub = combcode => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getCombinationSubjects",
        deg: state.combination.fdegree,
        combcode: combcode,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: types.FETCH_COMBSUBS,
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const saveCombination = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveCombination&univcode=" + state.univ.funivcode,
      {
        comb: {
          fdegree: state.combination.fdegree,
          fcombcode: state.combination.fcombcode,
          fcombdesc: state.combination.fcombdesc,
          combsubs: state.combination.combsubs
        }
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const deleteCombination = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=deleteCombination&univcode=" + state.univ.funivcode,
      {
        comb: {
          fdegree: state.combination.fdegree,
          fcombcode: state.combination.fcombcode
        }
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const changeComb = param => {
  return {
    type: types.CHANGE_COMB,
    payload: param
  };
};

export const addCombSub = () => {
  return {
    type: types.ADD_COMB_SUB
  };
};

export const cancelComb = () => {
  return {
    type: types.CANCEL_COMB
  };
};
