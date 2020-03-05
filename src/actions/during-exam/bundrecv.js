import univadmin from "../../apis/univadmin";

export const BundleRec = detBC => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=bundleRecv&univcode=" + state.univ.funivcode,
      {
        data: detBC
      }
    );

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
        type: "BUND_RECV",
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

export const changeDetBC = (el, i) => {
  console.log("action");
  return {
    type: "CHANGE_DET_BARCODE",
    payload: { el, i }
  };
};
