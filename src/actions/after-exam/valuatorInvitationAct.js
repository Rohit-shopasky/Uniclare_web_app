import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getValInvi = (fboardfrm, fboardto, ftechfrm, ftechto, nontype) => {
  return async function(dispatch, getState) {
    const state = getState();
    const fdeggrp = state.user.fdeggrp;
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "teachvalapi",
        univcode: state.univ.funivcode,
        fteachfrom: ftechfrm,
        fteachto: ftechto,
        fboardfrom: fboardfrm,
        fboardto: fboardto,
        fscale: nontype
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("valuatorInvitation", response.data, typeof response.data);

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
        type: "GET_VAL_INVI",
        payload: response.data
      });
    } else {
      dispatch({
        type: "DEL_VAL_INVI"
      });
      const error = { header: "Error", content: response.data.msg };
      dispatch(showError(error));
    }
  };
};

export const changeInvite = (el, i) => {
  return {
    type: "CHANGE_INVITE_DATA",
    payload: { el, i }
  };
};

export const changeALL = (el, i) => {
  return {
    type: "CHANGE_ALL",
    payload: { el, i }
  };
};

export const sendmessage = inviteParams => {
  console.log("hghfs", inviteParams);

  return {
    type: "SVAE_SEND_MESSAGE",
    payload: inviteParams
  };
};

// export const sendmessagefinal = (message, smsType, fmobileno, finalArry) => {

//     console.log("message updated", message)
//     console.log("SMS TYPE", smsType)
//     console.log("Number", fmobileno)
//     console.log("finalArry", finalArry)
//     return {
//         type: "SEND_ALL_MSG",
//         payload: {
//             message, smsType, fmobileno, finalArry
//         }
//     };
// };

export const sendmessagefinal = (
  message,
  smsType,
  fmobileno,
  finalArry,
  fboard,
  usr,
  fdeggrp,
  fdegree
) => {
  return async (dispatch, getState) => {
    console.log("message updated", message);
    console.log("SMS TYPE", smsType);
    console.log("Number", fmobileno);
    console.log("finalArry", finalArry);
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveteachvalapi&univcode=" + state.univ.funivcode,
      {
        data: {
          univcode: state.univ.funivcode,
          taechdet: finalArry,
          usrmob: fmobileno,
          message: message,
          smstype: smsType,
          fboard: fboard,
          usr: fdegree,
          fdeggrp: fdeggrp
        }
      }
    );

    // const response = await univadmin.post("/app.php", {
    //     params: {
    //         a: "saveteachvalapi",
    //         univcode: state.univ.funivcode,
    //         taechdet: finalArry,
    //         usrmob: fmobileno,
    //         message: message,
    //         smstype: smsType,
    //         fboard: fboard,
    //         usr: usr,
    //         fdeggrp: fdeggrp,
    //         fdegree: fdegree

    //     }
    // });

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
      const success = { header: "Success", content: response.data.data.msg };

      dispatch(showError(success), {
        type: "SAVE_ALL_MSG",
        payload: response.data
      });

      return true;
    }
  };
};
