import univadmin from "../../apis/univadmin";
import { showError } from "../index";
export const qpFileUpload = file => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const formData = new FormData();
    formData.set("file", file, file.name);
    const response = await univadmin.post("upload_file.php", formData, {
      headers: {
        "Content-type": "multipart/form-data"
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    dispatch({
      type: "SET_QPNAME",
      payload: response.data
    });
  };
};

export const qpStatUpload = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "uploadScriptStats",
        gfilename: state.upload.fqpfilenm,
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const mastabuUpload = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "mastabuUpload",
        gfilename: state.upload.fqpfilenm,
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};
