import univadmin from "../../apis/univadmin";

export const getHolidayMaster = fyear => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get("/app.php", {
      params: {
        a: "getHolidayMaster",
        fyear: fyear,
        univcode: state.univ.funivcode
      }
    });

    dispatch({
      type: "UNSET_LOADER"
    });

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
        type: "FETCH_HOLIDAY",
        payload: response.data
      });
    }
  };
};

export const changeHolidayMaster = (el, i) => {
  return {
    type: "CHANGE_HOLIDAY",
    payload: { el, i }
  };
};

export const addHoliday = (el, i) => {
  return {
    type: "ADD_HOLIDAY",
    payload: { el }
  };
};

export const deleteHoliday = () => {
  return {
    type: "DELETE_HOLIDAY"
  };
};

export const saveHolidayMaster = (fyear, holidays) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=saveHolidayMaster&univcode=" + state.univ.funivcode,
      {
        data: {
          fyear: fyear,
          holidays: holidays
        }
      }
    );

    dispatch({
      type: "UNSET_LOADER"
    });

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
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    }
  };
};
