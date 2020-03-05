import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getWorkDoneSummry = (paramsval, techercode, fcurtype) => {
  var response = {};
  return async function(dispatch, getState) {
    const state = getState();
    console.log("summmm", paramsval, techercode);
    dispatch({
      type: "SET_LOADER"
    });
    if (fcurtype == "600") {
      response = await univadmin.get(
        "/app.php?a=teachworksumaryapi&univcode=" +
          state.univ.funivcode +
          "&deggrp=UG" +
          "&tcodefrom=" +
          techercode +
          "&tcodeto=" +
          techercode +
          "&vdatefrom=" +
          paramsval.vdatefrom +
          "&vdateto=" +
          paramsval.vdateto +
          "&format=PDF" +
          "&user="
      );
    } else if (fcurtype != "600") {
      response = await univadmin.get(
        "/app.php?a=teachworksumaryapi&univcode=" +
          state.univ.funivcode +
          "&deggrp=UG" +
          "&tcodefrom=" +
          paramsval.tcodefrom +
          "&tcodeto=" +
          paramsval.tcodeto +
          "&vdatefrom=" +
          paramsval.vdatefrom +
          "&vdateto=" +
          paramsval.vdateto +
          "&format=PDF" +
          "&user="
      );
    }
    dispatch({
      type: "UNSET_LOADER"
    });
    console.log("dataa", response.data.data);
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
    } else if (response.data.error_code === -1) {
      const error = { header: "Error", content: response.data.data.msg };
      dispatch(showError(error));
    } else {
      dispatch({
        type: "WORK_DONE_REPORT_SUMMARY",
        payload: response.data
      });
    }
  };
};
