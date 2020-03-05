import univadmin from "../../apis/univadmin";
import { showError } from "../index";
{
  /*
http://192.168.0.9/univadmin/app.php?a=getStudentPhotosDegreeWise&univcode=041&collcode=1001&fdegree=BA1&regfrom=000&regto=zzzz

      "universitysolutions.in/univadmin/app.php?a=photoCropDet&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        state.user.fcollcode +
        "&folder=" +
        state.univ.ffolder*/
}

export const savePhtoto = (data, collcode) => {
  console.log("daaaa", data, collcode);

  return async (dispatch, getState) => {
    dispatch({
      type: "SET_LOADER"
    });
    const state = getState();
    const response = await univadmin.post(
      "app.php?a=saveCropedPhoto&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        collcode,
      {
        data
      }
    );
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
      const error = { header: "Success", content: response.data.data.msg };
      dispatch(showError(error));
    }
  };
};

// photoCropDet&univcode=041&collcode=1001
export const cropImage = (collcode, fdegree, fregno) => {
  console.log(
    "app.php?a=photoCropDet&univcode=" +
      "&collcode=" +
      collcode +
      "&fdegree=" +
      fdegree
  );
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get(
      "app.php?a=photoCropDet&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        collcode +
        "&fregno=" +
        fregno

      //"http://universitysolutions.in/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1001&folder=bcu"
      // `http://192.168.0.21/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1002`
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
        type: "CROP_IMAGE",
        payload: response.data
      });
    }
  };
};

export const getStudentPhotosDegreeWise = (
  collcode,
  deggrp,
  regfrom,
  regto
) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });

    const response = await univadmin.get(
      "app.php?a=getStudentPhotosDegreeWise&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        collcode +
        "&fdeggrp=" +
        state.user.fdeggrp +
        "&fdegree=" +
        deggrp +
        "&regfrom=" +
        regfrom +
        "&regto=" +
        regto

      //"http://universitysolutions.in/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1001&folder=bcu"
      // `http://192.168.0.21/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1002`
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
        type: "GET_STUDENT_PHOTO_LIST",
        payload: response.data
      });
    }
  };
};

export const collegeWiseDegreeList = collcode => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: "SET_LOADER"
    });
    console.log(
      "api hit",
      collcode,
      "app.php?a=getCollegeDegrees&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        collcode +
        "&fdeggrp" +
        state.user.fdeggrp
    );

    const response = await univadmin.get(
      "app.php?a=getCollegeDegrees&univcode=" +
        state.univ.funivcode +
        "&collcode=" +
        collcode +
        "&fdeggrp=" +
        state.user.fdeggrp

      //"http://universitysolutions.in/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1001&folder=bcu"
      // `http://192.168.0.21/univadmin/app.php?a=photoCropDet&univcode=041&collcode=1002`
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
        type: "COLLEGE_WISE_DEGREE_GROUP",
        payload: response.data
      });
    }
  };
};
