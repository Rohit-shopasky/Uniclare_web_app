import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getreasoncd = id => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getreasoncd",
        univcode: state.univ.funivcode,
        reasonID: id
      }
    });

    console.log(response);

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "GET_REASONSID",
        payload: response.data
      });
    }
  };
};

export const changeDet = (el, i, type) => {
  return {
    type: type,
    payload: { el, i }
  };
};

export const savereasonMaster = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=saveReasonMaster&univcode=" + state.univ.funivcode,
      { data: state.getReasonsIDs }
    );
    console.log("REs", response);
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
