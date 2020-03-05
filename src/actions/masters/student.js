import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getStudDet = studid => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    dispatch({
      type: "DELETE_STUD_INFO"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getStudentPersonalDetails",
        studid: studid,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("response",response);
    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "FETCH_STUD_INFO",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const getSubject = studid => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getStudentSubjectsForCurrentSem",
        studid: studid,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("responseeee",response);

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "FETCH_CUR_SUB",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const getExamApps = studid => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getStudentExamApplications",
        studid: studid,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("responseeee",response);

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "FETCH_EXAM_APPS",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const getIAMarks = studid => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getStudentIAMarks",
        studid: studid,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "FETCH_IAMARKS",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};
