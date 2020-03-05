import univadmin from "../../apis/univadmin";

export const lastDateUpdate = data => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("dataaa", data);
    const response = await univadmin.post(
      "app.php?a=lastDateUpdate&univcode=" + state.univ.funivcode,
      {
        data: data
      }
    );
    console.log("action ress", response.data);
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
        type: "LASTDATE_UPDATE",
        payload: response.data
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response
      });
    }
  };
};
