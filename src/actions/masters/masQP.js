import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getmasQPDet = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getmasQPDet",
        univcode: state.univ.funivcode,
        fdeggrp: state.user.fdeggrp,
        fexamrange: state.user.fexamrange
      }
    });
    // console.log("Res", response);

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
        type: "GET_MASQP",
        payload: response.data
      });
    }
  };
};

export const savemasQPDet = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "app.php?a=saveMasQP&univcode=" + state.univ.funivcode,
      { data: state.masQPDet }
    );
    // console.log("REs", response);
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
