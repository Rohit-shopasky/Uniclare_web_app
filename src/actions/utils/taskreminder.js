import univadmin from "../../apis/univadmin";
import { showError } from "../index";
export const taskReminderUser = frmvalues => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });
    // http://192.168.0.28:81/univadmin/app.php?a=getUserTypes&univcode=041
    const response = await univadmin.post(
      "/app.php?a=getUserTypes&univcode=" + state.univ.funivcode
    );

    dispatch({
      type: "UNSET_LOADER"
    });

    if (typeof response.data.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else {
      dispatch({
        type: "REMINDER_MEMEBER_LIST",
        payload: response.data
      });
    }
  };
};
export const changeData = (name, value) => {
  return {
    type: "CHANGE_DATA",
    payload: { name, value }
  };
};
export const changeDataReminder = (name, value) => {
  return {
    type: "CHANGE_DATA_REMINDER",
    payload: { name, value }
  };
};

export const SaveReminderData = data => {
  console.log("from edit", data);
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=getReminderDet&univcode=" + state.univ.funivcode,
      {
        data
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const TaskList = data => {
  console.log("from edit", data);
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=getAllRemainders&univcode=" + state.univ.funivcode,
      {
        frmdby: data
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("response", response, typeof response.data);
    if (typeof response.data.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else {
      dispatch({
        type: "ALL_REMINDER_DATA",
        payload: response.data
      });
    }
  };
};

export const addCommentOnReminder = data => {
  console.log("from edit", data);
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();

    const response = await univadmin.post(
      "/app.php?a=addCommentOnReminder&univcode=" + state.univ.funivcode,
      {
        data
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("msgmsgmsg", response.data.data.msg);
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
