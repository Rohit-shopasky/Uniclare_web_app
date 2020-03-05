import univadmin from "../../apis/univadmin";

export const fetchHTDwonloadCnt = frtype => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "fetchHTDwonloadCnt",
        fdeggrp: state.user.fdeggrp,
        frtype: frtype,
        univcode: state.univ.funivcode
      }
    });
    dispatch({
      type: "UNSET_LOADER"
    });
    if (typeof response.data !== "object") {
      const data = {
        error_code: -1,
        data: {
          msg: "Something went wrong wile fetching HT Download status Details"
        },
        status: "failure"
      };

      dispatch({
        type: "SET_ERROR",
        payload: data
      });
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      console.log(response.data);
      dispatch({
        type: "FETCH_HTCNT",
        payload: response.data
      });
    }
  };
};
