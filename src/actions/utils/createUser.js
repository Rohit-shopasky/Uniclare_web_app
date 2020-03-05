import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getUserDetails = fmobileno => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getUserDetails",
        univcode: state.univ.funivcode,
        fmobileno: fmobileno,
        fusertype: state.user.fusertype,
        fcurtype: state.user.fcurtype
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("RESSS", response);
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      // const error = { header: "Error", content: response.data.data.msg };
      // dispatch(showError(error));
      dispatch({
        type: "NEW_USER_DETAILS",
        payload: fmobileno
      });
    } else if (response.data.error_code === 1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "USER_DETAILS",
        payload: response.data
      });
    }
  };
};

export const changeUserDetails = (name, value) => {
  return {
    type: "CHANGE_USER_DETAILS",
    payload: { name, value }
  };
};

export const getUserType = type => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getUserType",
        type: type,
        univcode: state.univ.funivcode
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
        type: "USER_TYPE_LIST",
        payload: response.data
      });
    }
  };
};

export const saveUserDetails = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post("/app.php?a=saveUserDetails", {
      data: state.userDetails
    });
    // console.log("response", response);

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const success = { header: "Success", content: response.data.data.msg };
      dispatch(showError(success));
    }
  };
};

export const saveusertypes = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post("/app.php?a=saveUserTypeList", {
      data: state.userTypeList
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
      const success = { header: "Success", content: response.data.data.msg };
      dispatch(showError(success));
    }
  };
};
