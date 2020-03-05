import univadmin from "../../apis/univadmin";

export const getHolidayList = fyear => {
  return async (dispatch, getState) => {
    const state = getState();
    // dispatch({
    //   type: "SET_LOADER"
    // });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "holidayList",
        // fyear: fyear,
        univcode: state.univ.funivcode
      }
    });
    console.log("response list", response);
    // dispatch({
    //   type: "UNSET_LOADER"
    // });

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
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: "FETCH_HOLIDAY_LIST",
        payload: response.data
      });
    }
  };
};
