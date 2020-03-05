import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getBoardLists = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getBoardLists",
        univcode: state.univ.funivcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
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
        type: "GET_BOARD_LIST",
        payload: response.data
      });
    }
  };
};

export const saveBoardMaster = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=saveBoardMaster&univcode=" + state.univ.funivcode,
      { data: state.boardList }
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
