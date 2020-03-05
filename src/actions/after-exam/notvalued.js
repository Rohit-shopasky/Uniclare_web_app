import univadmin from "../../apis/univadmin";
import { showError } from "../index";

export const getNotval = (data, alluser) => {
  console.log("fromDATA", data, alluser);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "valuatordet",
        univcode: state.univ.funivcode,
        techfrom: data.tcodefrom,
        teachto: data.tcodeto,
        collfrom: data.vdatefrom,
        collto: data.vdateto,
        type: data.reportType,

        user: alluser,
        board: data.boardType
      }
    });
    console.log("daatfromdd", response);

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
        type: "GET_NOT_VAL",
        payload: response.data.data
      });
    }
  };
};

export const reportNotval = (data, alluser) => {
  console.log("fromDATA", data, alluser);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get(
      "http://192.168.0.32/univadmin/app.php?a=valuatorReport&univcode=041&teachfrom=0&teachto=z&status=all&collfrom=0&collto=z&type=nval&user=user"
    );
    console.log("daatfromdd", response);

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
        type: "REPORT_NOT_VAL",
        payload: response.data.data
      });
    }
  };
};
//drop down

export const getDropDownValue = (data, alluser) => {
  console.log("fromDATA", data, alluser);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getBoard",
        univcode: state.univ.funivcode,
        user: alluser
      }
    });
    console.log("GET_DROP_DOWN_VALUE", response);

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
        type: "GET_DROP_DOWN_VALUE",
        payload: response.data
      });
    }
  };
};
