import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getActiveCollegeList = () => {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get(
      "/app.php?a=getActiveCollegeList&univcode=" + state.univ.funivcode
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("response", response.data);
    if (response.data.error_code == -1) {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code == -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "FETCH_ACTIVE_COLLEGE",
        payload: response.data
      });
    }
  };
};
