import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getTimeTables = (
  fqpfrm,
  fqpto,
  fdatefrm,
  fdateto,
  fdegfrm,
  fdegto
) => {
  return async function(dispatch, getState) {
    const state = getState();
    // console.log(, fdeggrp, fqpfrm, fqpto, fdatefrm, fdateto, stype, rtype);
    const fdeggrp = state.user.fdeggrp;
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getTimeTables",
        univcode: state.univ.funivcode,
        dgp: fdeggrp,
        fqpfrm: fqpfrm,
        fqpto: fqpto,
        fdatefrom: fdatefrm,
        fdateto: fdateto,
        fdegfrm: fdegfrm,
        fdegto: fdegto
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("viewTimeTable", response.data, typeof response.data);
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
        type: "GET_VIEW_TIME_TABLE",
        payload: response.data
      });
    } else {
      dispatch({
        type: "DEL_VIEW_TIME_TABLE"
      });
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};
