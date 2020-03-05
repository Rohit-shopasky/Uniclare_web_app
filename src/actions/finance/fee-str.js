import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getFeeHeads = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getFeeHeads",
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
      dispatch({
        type: "GET_FEE_HEADS",
        payload: response.data
      });
    }
  };
};

export const getCategory = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getCategory",
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
      dispatch({
        type: "GET_CATEGORY",
        payload: response.data
      });
    }
  };
};

export const saveFeeHeads = feeheads => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveFeeHeads&univcode=" + state.univ.funivcode,
      {
        data: {
          feeheads: feeheads
        }
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

export const changefeeform = (name, value) => {
  return {
    type: "CHANGE_FEESTRFORM",
    payload: { name, value }
  };
};

export const cancelFeestr = () => {
  return {
    type: "CANCEL_FEESTR"
  };
};

export const displayfeeDetails = () => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=displayfeeDetails&univcode=" + state.univ.funivcode,
      {
        feeStrForm: state.feeStrForm
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
      dispatch({
        type: "GET_FEEDETL",
        payload: response.data
      });
    }
  };
};

export const getFeeParams = () => {
  return async function(dispatch, getState) {
    const state = getState();
    // dispatch({
    //   type: "SET_LOADER"
    // });
    try {
      const response = await univadmin.post(
        "/app.php?a=getFeeParams&univcode=" + state.univ.funivcode
      );
      // dispatch({
      //   type: "UNSET_LOADER"
      // });

      if (typeof response.data !== "object") {
        const error = { header: "Error", content: "Something went wrong" };
        dispatch(showError(error));
      } else if (response.data.error_code === -1) {
        const error = { header: "Error", content: response.data.data.msg };
        dispatch(showError(error));
      } else {
        console.log(response.data.data.module);
        console.log(response.data.data.feetype);
        dispatch({
          type: "CHANGE_FEESTRFORM",
          payload: { name: "module_opt", value: response.data.data.module }
        });

        dispatch({
          type: "CHANGE_FEESTRFORM",
          payload: { name: "feetype", value: response.data.data.feetype }
        });
      }
    } catch (err) {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    }
  };
};

export const saveFeeDetails = feearray => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveFeeDetails&univcode=" + state.univ.funivcode,
      {
        feeStrForm: state.feeStrForm,
        feearray: feearray
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

export const displayfeeDates = () => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=displayfeeDates&univcode=" + state.univ.funivcode,
      {
        feeStrForm: state.feeStrForm
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
      dispatch({
        type: "GET_FEEDATES",
        payload: response.data
      });
    }
  };
};

export const saveFeeDates = feearray => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveFeeDates&univcode=" + state.univ.funivcode,
      {
        feeStrForm: state.feeStrForm,
        feearray: feearray
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
