import univadmin from "../../apis/univadmin";

export const getExmCntr = (fqpfrm, fqpto, fdatefrm, fdateto, rtype, stype) => {
  return async function(dispatch, getState) {
    const state = getState();
    // console.log("ffff", fdeggrp, fqpfrm, fqpto, fdate, stype, rtype);
    const fdeggrp = state.user.fdeggrp;
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getExmCntr",
        univcode: state.univ.funivcode,
        dgp: fdeggrp,
        fqpfrm: fqpfrm,
        fqpto: fqpto,
        fdatefrom: fdatefrm,
        fdateto: fdateto,
        rtype: rtype,
        stype: stype
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("exmCntr", response.data, typeof response.data);
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
        type: "GET_EXM_CNTR",
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
