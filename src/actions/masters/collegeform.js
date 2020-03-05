import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const Collegeform = (name, value) => {
  return {
    type: "COLLEGE_FORM",
    payload: { name, value }
  };
};

export const CancelForm = () => {
  return {
    type: "CANCEL_FORM",
    payload: 1
  };
};

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

export const GetSpecificCollege = clgcode => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    // app.php?a=GetSpecificCollege&collcode=1003&univcode=041
    const response = await univadmin.get(
      "app.php?a=GetSpecificCollege&collcode=" +
        clgcode +
        "&univcode=" +
        state.univ.funivcode
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
        type: "GET_SPECIFIC_COLLEGE",
        payload: response.data
      });
    }
  };
};

export const SaveCollegeForm = editData => {
  console.log(editData);
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=InsertOrUpdateCollegeDetails&univcode=" +
        state.univ.funivcode,
      {
        data: editData
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("response", response, typeof response.data);
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const error = { header: "Success", content: response.data.msg };
      dispatch(showError(error));
    }
  };
};
