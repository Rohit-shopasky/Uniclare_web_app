import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const resultStatCollegeWise = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get(
      "app.php?a=getResStats&univcode=" +
        state.univ.funivcode +
        "&fcollcode=" +
        state.user.fcollcode
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
      dispatch({
        type: "GET_RESULT_STAT_COLLEGEWISE",
        payload: response.data
      });
    }
  };
};
