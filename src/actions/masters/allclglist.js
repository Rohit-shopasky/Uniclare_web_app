import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getCollegeList = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get(
      "app.php?a=GetAllCollegeList&univcode=" + state.univ.funivcode
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
        type: "ALL_COLLEGE_LIST",
        payload: response.data
      });
    }
  };
};
