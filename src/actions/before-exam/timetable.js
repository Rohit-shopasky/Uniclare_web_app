import univadmin from "../../apis/univadmin";

export const generateTimetable = frmvalues => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=generateExamTimetable&univcode=" + state.univ.funivcode,
      {
        data: {
          frmvalues: frmvalues
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

export const getupdateTimetable = frmvalues => {
  return async function(dispatch, getState) {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.post(
      "/app.php?a=getupdateTimetable&univcode=" + state.univ.funivcode,
      {
        data: {
          frmvalues: { ...state.user, fexamrange: frmvalues.fexamrange }
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
    } else if (response.data.error_code === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: response.data
      });
    } else {
      dispatch({
        type: "GENERATE_TIMETABLE",
        payload: response.data
      });
    }
  };
};

export const saveExamtimetable = (timetable, parameters) => {
  return async function(dispatch, getState) {
    const state = getState();
    // const timetable = state.timetable.toJS();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=saveExamTimetable&univcode=" + state.univ.funivcode,
      {
        data: {
          timetable: timetable,
          params: parameters,
          user: state.user
        }
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log(typeof response.data)
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

export const releaseTimeTable = parameters => {
  return async function(dispatch, getState) {
    const state = getState();
    // const timetable = state.timetable.toJS();
    dispatch({
      type: "SET_LOADER"
    });
    const response = await univadmin.post(
      "/app.php?a=releaseExamTimetable&univcode=" + state.univ.funivcode,
      {
        data: {
          params: parameters
        }
      }
    );
    dispatch({
      type: "UNSET_LOADER"
    });
    // console.log(typeof response.data)
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

export const cancelTimetable = () => {
  return {
    type: "CANCEL_TIMETABLE"
  };
};
