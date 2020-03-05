import univadmin from "../../apis/univadmin";
import { showError } from "../index";
import createHistory from "history/createHashHistory";

export const history = createHistory();

export const login = loginCred => {
  return async function(dispatch, getState) {
    let neterror = false;
    const response = await univadmin
      .post(
        "/app.php?a=eGovSignin",
        {
          data: {
            fmobileno: loginCred.fmobileno,
            fpasswd: loginCred.fpasswd
          }
        },
        {
          headers: {
            "X-Auth-Type": "LOGREGN"
          }
        }
      )
      .catch(function(error) {
        neterror = true;
      });

    if (response == undefined) {
      const error = { header: "Error", content: "Network Error" };
      dispatch(showError(error));
      return;
    }

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "LOGIN",
        payload: response.data
      });
      // TOKEN = response.data.data.token;
      history.push("dashboard");
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const islogin = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const logtoken = localStorage.getItem("logtoken");

    if (logtoken == null) {
      // alert('please login to access this web App');
      const error = { header: "Error", content: "Login to access this portal" };
      dispatch(showError(error));
      history.push("/");
      return;
    }

    const response = await univadmin.get("/app.php?a=eGovIsSignedIn", {});

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
      history.push("/");
    } else if (response.data.error_code === 0) {
      await dispatch({
        type: "USER_INFO",
        payload: response.data
      });

      await dispatch({
        type: "FETCH_UNIVS",
        payload: response.data
      });
      await dispatch({
        type: "FETCH_USER_TYPE",
        payload: response.data
      });

      const univs = response.data.data.univs;
      const curuniv = response.data.data.user.fcuruniv;

      const univ = univs.filter((el, i) => el.funivcode == curuniv);

      await dispatch(setCurUniv(univ[0]));
      const control = localStorage.getItem("control");
      if (control !== null) dispatch(setDegreeGroup(JSON.parse(control)));
    } else {
      const error = { header: "Error", content: response.data.msg };
      dispatch(showError(error));
      history.push("/");
    }
  };
};

export const getMenus = () => {
  return async function(dispatch, getState) {
    const logtoken = localStorage.getItem("logtoken");
    if (logtoken == null) {
      return;
    }
    const state = getState();
    const response = await univadmin.get("/app.php?", {
      params: {
        a: "eGovGetMenus",
        univcode: state.user.fcuruniv,
        usertype: state.user.fcurtype
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong while fetching menus"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_MENUS",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const changePassword = data => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=changePassword&univcode=" + state.user.fcuruniv,
      {
        data,
        user: state.user
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong "
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

export const changeMobSendOTP = data => {
  return async function(dispatch, getState) {
    const state = getState();

    const response = await univadmin.post(
      "/app.php?a=changeMobSendOTP&univcode=" + state.user.fcuruniv,
      {
        data,
        user: state.user
      }
    );
    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong "
      };
      dispatch(showError(error));
      return -1;
    } else if (response.data.error_code === 0) {
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
      return 0;
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
      return -1;
    }
  };
};

export const changeMobileNo = data => {
  return async function(dispatch, getState) {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=changeMobileNo&univcode=" + state.user.fcuruniv,
      {
        data,
        user: state.user
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong "
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
      history.push("/");
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const getStates = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php?", {
      params: {
        a: "uniclareGetStates"
      },
      headers: {
        "X-Auth-Type": "LOGREGN"
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_STATES",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const getUnivs = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php?", {
      params: {
        a: "uniclareGetUnivs",
        statecode: state.regn.fstate
      },
      headers: {
        "X-Auth-Type": "LOGREGN"
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "GET_UNIVS",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const validateRegno = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php?", {
      params: {
        a: "uniclareValidateRegno",
        univ: state.regn.funivcode,
        regno: state.regn.fuserid
      },
      headers: {
        "X-Auth-Type": "LOGREGN"
      }
    });

    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "VALID_REGNO",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};
export const changeRegn = (name, value) => {
  return {
    type: "CHANGE_REGN",
    payload: { name, value }
  };
};

export const validatemob = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=uniclareValidateMob",
      {
        regno: state.regn.fuserid,
        univ: state.regn.funivcode,
        mobile: state.regn.fmobileno,
        email: state.regn.femail
      },
      {
        headers: {
          "X-Auth-Type": "LOGREGN"
        }
      }
    );

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch(sendOTP());
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const sendOTP = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=uniclareSendOTP",
      {
        regno: state.regn.fuserid,
        univ: state.regn.funivcode,
        mobile: state.regn.fmobileno,
        email: state.regn.femail,
        password: state.regn.fpasswd
      },
      {
        headers: {
          "X-Auth-Type": "LOGREGN"
        }
      }
    );

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({
        type: "MOBILE_VALID",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const signup = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=uniclareSignUp",
      {
        mobile: state.regn.fmobileno,
        motp: state.regn.fmotp,
        eotp: state.regn.feotp
      },
      {
        headers: {
          "X-Auth-Type": "LOGREGN"
        }
      }
    );

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      history.push("/");
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const sendFgtOtp = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=uniclareForgotPws",
      {
        fmobileno: state.fgtpasswd.fmobileno
      },
      {
        headers: {
          "X-Auth-Type": "LOGREGN"
        }
      }
    );

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      const error = {
        header: "Success",
        content: "OTP Sent to registered Mobile No. and Email ID"
      };
      dispatch(showError(error));

      dispatch({
        type: "FGT_MOBILE_VALID",
        payload: response.data
      });
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const resetPassword = () => {
  return async function(dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=uniclareForgotPwsSave",
      {
        mobileno: state.fgtpasswd.fmobileno,
        password: state.fgtpasswd.fpasswd,
        otp: state.fgtpasswd.fmotp
      },
      {
        headers: {
          "X-Auth-Type": "LOGREGN"
        }
      }
    );

    if (typeof response.data !== "object") {
      // const data = { error_code: -1, data: { msg: "Something went wrong" }, status: "failure" }
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      history.push("/");
    } else {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

export const clearRegn = () => {
  return {
    type: "CLEAR_REGN"
  };
};

export const changefgt = (name, value) => {
  return {
    type: "CHANGE_FGT",
    payload: { name, value }
  };
};

export const clearFgt = () => {
  return {
    type: "CLEAR_FGT"
  };
};

export const setCurUniv = univ => {
  return {
    type: "SET_UNIV",
    payload: univ
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const setCurUserType = type => {
  return {
    type: "SET_USER_TYPE",
    payload: type
  };
};

export const setDegreeGroup = data => {
  return {
    type: "SET_DEGGRP",
    payload: data
  };
};
