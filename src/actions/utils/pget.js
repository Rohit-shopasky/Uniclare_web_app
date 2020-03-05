import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getSavedData = fappno => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getSavedData",
        fappno: fappno,
        univcode: state.univ.funivcode
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
        type: "GET_PGET_DATA",
        payload: response.data
      });
    }
  };
};
export const changePgetDet = (name, value) => {
  return {
    type: "CHANGE_PGET_DATA",
    payload: { name, value }
  };
};

export const getFacultyDegree = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getFacultyDegree",
        univcode: state.univ.funivcode
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
        type: "GET_PGET_DEG",
        payload: response.data
      });
    }
  };
};

export const saveApplication = editDet => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=saveApplication&univcode=" + state.univ.funivcode,
      {
        data: editDet
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrongr" };
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
