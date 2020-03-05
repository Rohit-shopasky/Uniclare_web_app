import univadmin from "../apis/univadmin";
import * as types from "../types";
import { send } from "q";

export const fetchDegGrp = () => {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.univ.funivcode == "") return;

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegreeGroup",
        univcode: state.user.fcuruniv
      }
    });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: {
          msg: "Something went wrong"
        },
        status: "failure"
      };
      dispatch({ type: "SET_ERROR", payload: data });
    } else if (response.data.error_code === -1) {
      dispatch({ type: "SET_ERROR", payload: response.data });
    } else {
      dispatch({ type: types.FETCH_DEGGRP, payload: response.data });
    }
  };
};

export const fetchDegrees = deggrp => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDegrees",
        deggrp: deggrp,
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({ type: types.FETCH_DEGREES, payload: response.data });
    } else {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    }
  };
};

export const fetchUnivs = () => {
  return async function (dispatch, getState) {
    const response = await univadmin.get("/app.php", {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        a: "getUnivs"
      }
    });
    dispatch({ type: "FETCH_UNIVS", payload: response.data });
  };
};

// Student Related Actions

// Seting the register no in student screen
export const setRegno = regno => {
  return { type: "SET_REGNO", payload: regno };
};

export const fetchStudentInfo = studid => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getStudentInfo",
        studid: studid,
        univcode: state.univ.funivcode
      }
    });

    dispatch({ type: "FETCH_STUD_INFO", payload: response.data });
  };
};

export const fetchRefundList = refundData => {
  return async function (dispatch, getState) {
    const state = getState();

    const response = await univadmin.post(
      "/app.php?a=getRefundAppList&univcode=" + state.univ.funivcode,
      { data: refundData }
    );

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_REFUND_LIST", payload: response.data.data });
    }
  };
};

export const changeRefundData = (el, i) => {
  console.log("action", el, i);
  return {
    type: "CHANGE_REFUND_DET",
    payload: {
      el,
      i
    }
  };
};

export const updateRefundDet = upRefundData => {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch({ type: "SET_LOADER" });

    const response = await univadmin.post(
      "/app.php?a=updateRefund&univcode=" + state.univ.funivcode,
      {
        data: upRefundData,
        userid: state.user.fuserid
      }
    );
    dispatch({ type: "UNSET_LOADER" });
    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      console.log("responseDataMsg", response.data.data.msg);
      const success = {
        header: "Success",
        content: response.data.data.msg
      };
      dispatch(showError(success));
      dispatch({ type: "EMPTY_REFUND_LIST", payload: response.data });


    }
  };
};

export const fetchCntrList = deggrp => {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch({ type: "SET_LOADER" });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getCentresForUpdation",
        deggrp: deggrp,
        univcode: state.univ.funivcode
      }
    });
    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: {
          msg: "Something went wrong"
        },
        status: "failure"
      };
      dispatch({ type: "SET_ERROR", payload: data });
    } else if (response.data.error_code === 0) {
      dispatch({ type: "FETCH_EXAM_CENTRES", payload: response.data });
    } else {
      dispatch({ type: "SET_ERROR", payload: response.data });
    }
  };
};

export const changeCntrList = data => {
  return { type: "CHANGE_EXAM_CENTRES", payload: data };
};

export const saveCntrList = (centrelist, degreeGroup) => {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch({ type: "SET_LOADER" });
    const response = await univadmin.post(
      "/app.php?a=saveUpdatedCentres&univcode=" + state.univ.funivcode,
      {
        data: {
          fdeggrp: degreeGroup,
          cntrlist: centrelist
        }
      }
    );

    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const error = {
        error_code: -1,
        data: {
          msg: "Something went wrong wile Saving Exam Centres."
        },
        status: "failure"
      };
      dispatch(setError(error));
    } else {
      dispatch(setError(response.data));
    }
  };
};

export const saveDegreeGroup = (degreeGroup, delDegreeGroup) => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=saveDegreeGroup&univcode=" + state.univ.funivcode,
      {
        data: {
          deggrp: degreeGroup,
          deldeggrp: delDegreeGroup
        }
      }
    );
    if (typeof response.data !== "object") {
      const error = {
        error_code: -1,
        data: {
          msg: "Something went wrong wile Saving Degree Group."
        },
        status: "failure"
      };
      dispatch(setError(error));
    } else {
      dispatch(setError(response.data));
    }
  };
};

export const compileQpIndent = () => {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch({ type: "SET_LOADER" });
    const response = await univadmin.get("/app.php", {
      params: {
        a: "compileQpIndent",
        deggrp: state.user.fdeggrp,
        univcode: state.univ.funivcode
      }
    });
    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    }
  };
};

export const getReport = (rt, rf, deggrp, fdeggrpfrm, fdeggrpto, fcollfrm, fcollto) => {
  return async (dispatch, getState) => {
    const state = getState();
    let api = "";
    if (rt === "Active College List") api = "getActiveCollegeList";
    else if (rt === "Center College List") api = "getCenterList";
    else if (rt === "Center List With Tagged Colleges") api = "getCntWiseColgList";

    dispatch({ type: "SET_LOADER" });
    const response = await univadmin.get("/app.php", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        a: api,
        val: rt,
        format: rf,
        deggrp: deggrp,
        deggrpfrm: fdeggrpfrm,
        deggrpto: fdeggrpto,
        collfrm: fcollfrm,
        collto: fcollto,
        univcode: state.univ.funivcode
      }
    });

    dispatch({ type: "UNSET_LOADER" });
    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: {
          msg: "Something went wrong"
        },
        status: "failure"
      };
      dispatch({ type: "SET_ERROR", payload: data });
    } else if (response.data.error_code === 0) {
      dispatch({ type: "FETCH_COLG_REPORT", payload: response.data });
    } else {
      dispatch({ type: "SET_ERROR", payload: response.data });
    }
  };
};
export const fetchFaculty = () => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getfaculty",
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_FACULTY", payload: response.data });
    }
  };
};

export const showError = error => {
  return { type: "SHOW_ERROR", payload: error };
};

export const closeError = () => {
  return { type: "CLOSE_ERROR" };
};

export const setError = error => {
  return { type: "SET_ERROR", payload: error };
};

export const unsetError = () => {
  return { type: "UNSET_ERROR" };
};

export const changett = (el, id) => {
  return async function (dispatch, getState) {
    const data = { el, id };
    await dispatch({
      type: "UPDATE_TIMETABLE",
      payload: data
    });
  };
};

export const getExamNo = () => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getExamNo",
        fdeggrp: state.user.fdeggrp,
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === 0) {
      dispatch({ type: "FETCH_EXAMNO", payload: response.data });
    } else {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    }
  };
};

export const fetchBoards = () => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getboard",
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_BOARD", payload: response.data });
    }
  };
};

export const fetchDailyValuation = valuationParams => {
  return async function (dispatch, getState) {
    const state = getState();
    // console.log("validationParams", valuationParams);
    dispatch({ type: "SET_LOADER" });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "dailyValuation",
        univcode: state.univ.funivcode,
        dateFrom: valuationParams.dateFrom,
        dateTo: valuationParams.dateTo,
        boardFrom: valuationParams.boardfrom,
        boardTo: valuationParams.boardto
      }
    });
    //console.log("fetchDailyValuation", response);
    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_DAILY_VALUATION", payload: response.data });
    }
  };
};

export const saveInviteData = inviteParams => {
  return {
    type: "SAVE_INVITE_DATA",
    payload: inviteParams
  };
};

export const saveInviteList = inviteParams => {
  console.log("inviteParams", inviteParams);
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.post(
      "/app.php?a=saveteachvalapi&univcode=" + state.univ.funivcode,
      {
        data: {
          deggrp: state.user.deggrp,
          univcode: state.univ.funivcode,
          board: state.user.fdegree,
          taechdet: inviteParams,
          usr: state.user.fname
        }
      }
    );

    console.log("saveInviteListResponse", saveInviteList);

    console.log("sssss", response.data)
    if (typeof response.data !== "object") {
      const error = { header: "Error", content: "Something went wrong" };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      const success = { header: "Success", content: response.data.data.msg };
      dispatch(
        showError(success),
        {
          type: "SAVE_INVITE_LIST",
          payload: response.data,
        });
    }
  };
};

export const clearDailyValuation = () => {
  return { type: "CLEAR_DAILY_VALUATION" };
};

export const fetchRvPcReport = sendParams => {
  return async function (dispatch, getState) {
    const state = getState();
    // console.log("validationParams", valuationParams);
    dispatch({ type: "SET_LOADER" });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getRvPcReport",
        univcode: state.univ.funivcode,
        dateFrom: sendParams.dateFrom,
        dateTo: sendParams.dateTo,
        qpcodeFrom: sendParams.qpcodeFrom,
        qpcodeTo: sendParams.qpcodeTo,
        regnoFrom: sendParams.regnoFrom,
        regnoTo: sendParams.regnoTo,
        correctionType: sendParams.correctionType,
        status: sendParams.status,
        reportType: sendParams.reportType,
        fdeggrp: sendParams.fdeggrp
      }
    });
    //console.log("fetchDailyValuation", response);
    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
      dispatch({ type: "EMPTY", payload: response.data });

    } else {
      dispatch({ type: sendParams.actionType, payload: response.data });
    }
  };
};

// export const fetchDailyValuation = (valuationParams) => {
//   return async function (dispatch, getState) {
//     const state = getState();
//     // console.log("validationParams", valuationParams);
//     dispatch({ type: "SET_LOADER" });

//     const response = await univadmin.get("/app.php", {
//       params: {
//         a: "dailyValuation",
//         univcode: state.univ.funivcode,
//         dateFrom: valuationParams.dateFrom,
//         dateTo: valuationParams.dateTo,
//         boardFrom: valuationParams.boardfrom,
//         boardTo: valuationParams.boardto
//       }
//     });
//     //console.log("fetchDailyValuation", response);
//     dispatch({ type: "UNSET_LOADER" });

//     if (typeof response.data !== "object") {

//       const error = {
//         header: "Error",
//         content: "Something went wrong"
//       };
//       dispatch(showError(error));
//     } else if (response.data.error_code === -1) {
//       const error = {
//         header: "Error",
//         content: response.data.data.msg
//       };
//       dispatch(showError(error));
//     } else {
//       dispatch({ type: "GET_DAILY_VALUATION", payload: response.data });
//     }
//   };
// };

// export const clearDailyValuation = () => {
//   return { type: "CLEAR_DAILY_VALUATION" };
// };

export const saveRvRtCheckList = sendParams => {
  console.log("sendParams", sendParams);
  return async function (dispatch, getState) {
    const state = getState();
    // console.log("validationParams", valuationParams);
    dispatch({ type: "SET_LOADER" });

    const response = await univadmin.post(
      "/app.php?a=updateChkListDet&univcode=" + state.univ.funivcode,
      { data: sendParams }
    );
    //console.log("fetchDailyValuation", response);
    dispatch({ type: "UNSET_LOADER" });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_DAILY_VALUATION", payload: response.data });
    }
  };
};



export const getDropDownOptions = () => {
  return async function (dispatch, getState) {
    const state = getState();
    const response = await univadmin.get("/app.php", {
      params: {
        a: "getDropDownOptions",
        univcode: state.univ.funivcode
      }
    });

    if (typeof response.data !== "object") {
      const error = {
        header: "Error",
        content: "Something went wrong"
      };
      dispatch(showError(error));
    } else if (response.data.error_code === -1) {
      const error = {
        header: "Error",
        content: response.data.data.msg
      };
      dispatch(showError(error));
    } else {
      dispatch({ type: "GET_DROP_DOWN_OPTIONS", payload: response.data });
    }
  };
};
