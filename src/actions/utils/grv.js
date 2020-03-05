import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getGrvList = type => {
  return async function(dispatch, getState) {
    const state = getState();

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getgrvlst",
        fgroup: "250",
        fusername: "raksha",
        type: type,
        fuserid: state.user.fuserid
      }
    });

    // console.log('resgrvlst', response.data);
    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_GRV_LIST",
        payload: response.data
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};
export const getGrv = grvno => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getgrv",
        fgroup: "250",
        fusername: "raksha",
        fgrvno: grvno
      }
    });
    // console.log('resgrv', response);
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_GRV",
        payload: response.data
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};

export const submitquery = query => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post("/app.php?a=submitquery", {
      data: {
        user: state.user,
        query: query
      }
    });
    // console.log('resgrv', response);
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
      return -1;
    } else {
      const error = {
        header: "Success",
        content:
          "Query submitted successfully. Your reference No. : " +
          response.data.data.msg
      };
      dispatch(showError(error));
      return 0;
    }
  };
};

export const grvSend = (rply, file) => {
  return async function(dispatch, getState) {
    const state = getState();
    const grv = state.grv.header;
    console.log("state", state.grv.header.fgrvid);
    // console.log('replay', rply);
    const response = await univadmin.post("/app.php?a=grvSend", {
      data: {
        fgroup: "250",
        fusername: "raksha",
        fgrv: grv,
        frply: rply,
        ffile: file
      }
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: { msg: "Something went wrong" },
        status: "failure"
      };
      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GRV_SENT",
        payload: response.data
      });
      dispatch({
        type: "GET_LIST_GRV",
        payload: state.grv.header.fgrvid
      });
      dispatch({
        type: "GRV_DET",
        payload: state.grv.header.fgrvid
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};

export const clrGrv = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const grvid = state.grv.header.fgrvid;
    // console.log('state', state.grv.header.fgrvid);
    console.log("grv", grvid);
    const response = await univadmin.post("/app.php?a=grvClr", {
      data: {
        fgroup: "250",
        fusername: "raksha",
        fgrvid: grvid
      }
    });

    // if (typeof response.data !== 'object') {
    //   const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
    //   dispatch({
    //     type: 'SET_ERROR',
    //     payload: data
    //   });
    // }
    // else if (response.data.error_code === 0) {
    //   dispatch({
    //     type: 'CLR_GRV',
    //     payload: response.data
    //   });
    // }
    // else {
    //   dispatch({
    //     type: 'SET_ERROR',
    //     payload: response.data
    //   });
    // }
  };
};
