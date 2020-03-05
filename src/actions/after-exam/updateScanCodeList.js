import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const updateCodeList = data => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });

    const state = getState();

    const response = await univadmin.post(
      "app.php?a=updateScanCodeList&univcode=" + state.univ.funivcode,
      {
        data: data
      }
    );

    dispatch({
      type: "UNSET_LOADER"
    });

    // console.log("RVRTACTION", response);

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
