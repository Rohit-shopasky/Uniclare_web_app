import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getPostnotificationDetails = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getPostnotificationDetails",
        univcode: state.univ.funivcode
      }
    });

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
      // console.log("Notificationnnn", response.data);
      dispatch({
        type: "GET_NOTIFICATION_LIST",
        payload: response.data
      });
    }
  };
};

export const editPostnotification = postNo => {
  // console.log("PostNp", postNo);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getPostnotificationEdit",
        fpostno: postNo,
        univcode: state.univ.funivcode
      }
    });

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
      // console.log("Notificationnnn", response.data);
      dispatch({
        type: "EDIT_NOTIFICATION",
        payload: response.data
      });
    }
  };
};

export const changeNotification = (name, value) => {
  return {
    type: "EDIT_NOTIF_DET",
    payload: { name, value }
  };
};

export const changeNotificationFile = file => {
  return async function (dispatch, getState) {
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
      type: "SET_FILENAME",
      payload: response.data
    });
  };
};

export const updateNotification = (sameFile, description) => {

  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=savePostNotification&univcode=" +
      state.univ.funivcode +
      "&type=edit&samefile=" +
      sameFile,
      {
        data: state.editNotification,
        descpn: description
      }
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const newNotification = () => {
  return {
    type: "NEW_NOTIF_DET"
  };
};

export const addNotification = (sameFile, description) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    // console.log("addNotification", state.editNotification);
    const response = await univadmin.post(
      "app.php?a=savePostNotification&univcode=" +
      state.univ.funivcode +
      "&type=add&samefile=" +
      sameFile,
      {
        data: state.editNotification,
        descpn: description
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrongr" };
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

export const postNotificationDelete = postno => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.get(
      "app.php?a=getPostnotificationDelete&univcode=" +
      state.univ.funivcode +
      "&postno=" +
      postno
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log("REsp", response);
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrongr" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data };
      dispatch(showError(error));
    } else {
      const error = { header: "Success", content: response.data.data };
      dispatch(showError(error));
    }
  };
};
