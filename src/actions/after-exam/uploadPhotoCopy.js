import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const saveUploadedPhotocopy = finalData => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "app.php?a=submitUploadedPhotocopy&univcode=" + state.univ.funivcode,
      {
        data: finalData
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.msg };
      dispatch(showError(error));
    } else {
      const error = { header: "Success", content: response.data.msg };
      dispatch(showError(error));
    }
  };
};

export const uploadPhotoCopy = "";
