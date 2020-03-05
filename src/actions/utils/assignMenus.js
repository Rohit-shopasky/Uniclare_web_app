import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getUserTypeList = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getUserTypeList",
        univcode: state.univ.funivcode,
        usertype: state.user.fcurtype
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

export const getMenuList = userType => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getMenuList",
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
        type: "MENU_LIST",
        payload: response.data
      });
    }
  };
};

export const updateUserMenus = data => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=updateUserMenus&univcode=" + state.univ.funivcode,
      {
        data: data
      }
    );

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
