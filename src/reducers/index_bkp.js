import { combineReducers } from "redux";

import curunivReducer from "./curUniv";
import univReducer from "./univs";
import dashboardReducer from "./dashboard";
import { degGrpReducer, degGrpDegreeReducer } from "./deggrp";
import degreesReducer from "./degrees";
import combinationReducer from "./combination";
import saveDeggrpReducer from "./saveDeggrp";
import cntrListReducer from "./cntrList";
import { examCntrDetReducer, degCollReducer } from "./examCntrDet";
import studentInfoReducer from "./studentInfo";
import collegeReducer from "./college";
import dateMaster from "./datemaster";
import activeCollegeReducer from "./getactiveclglist";
import holidayMaster from "./holidayMaster";
import {
  loadingReducer,
  setErrorReducer,
  showErrorReducer
} from "./appDefaults";
import { timetableReduces, reasonReduces, masdateReduces } from "./genaratett";
import { grvlstReducer, grvReducer, grvSntReducer } from "./grv";
import {
  fetchPrSubReduces,
  fetchBoardReducer,
  fetchPrBatchReducer
} from "./practicals";
import { getExmCntrRedu } from "./exmcntr";
import {
  loginReducer,
  userReducer,
  userTypeReducer,
  menuReducer,
  regnReducer,
  fgtReducer
} from "./loginRegn";
import { fetchHallTicketReducer } from "./hallTicket";
import { bundleRecvReducer } from "./bundrecv";
import { lstDateUpdateRedu } from "./lastDateUpdate";
import {
  feeHeadsReducer,
  categoryReducer,
  feeStrFormReducer,
  feeDetlReducer,
  feeDateReducer
} from "./fee-str";
import { uploadReducer } from "./upload";
import { qpStatReducer, qpStatSumReducer } from "./valuation";
import { pgetEditApp, pgetDeg } from "./pget";
import { CollegeForm } from "./collegeform";
//kunal
import { resultStatCollegeWise } from "./collegewisestat";
import { allClgList, GetSpecificCollege } from "./collegeformlist";
import { ExamAppStats, ExmDetStats } from "./exmAppStats";
import { getDegExmRng, shwFeeUpdateDet } from "./RVRTFeeUpdate";
import { getAdmStats, getSpecCollDet } from "./admStats";
// import { allClgList } from "./allclglist";
import cropImage, {
  collegeWiseDegreeList,
  getStudentPhotosDegreeWise
} from "./cropimage";

const reducers = combineReducers({
  user: userReducer,

  usertype: userTypeReducer,
  login: loginReducer,
  regn: regnReducer,
  fgtpasswd: fgtReducer,
  univ: curunivReducer,
  univs: univReducer,
  menu: menuReducer,
  dashboard: dashboardReducer,
  loading: loadingReducer,
  error: setErrorReducer,
  moderror: showErrorReducer,
  combination: combinationReducer,
  deggrp: degGrpReducer,
  degGrpDegree: degGrpDegreeReducer,
  degrees: degreesReducer,
  saveDeggrp: saveDeggrpReducer,
  cntrList: cntrListReducer,
  degcoll: degCollReducer,
  examCntrDet: examCntrDetReducer,
  studentInfo: studentInfoReducer,
  collegeReport: collegeReducer,
  dateMaster: dateMaster,
  holidayMaster: holidayMaster,
  timetable: timetableReduces,
  reason: reasonReduces,
  prsubs: fetchPrSubReduces,
  boards: fetchBoardReducer,
  prbatch: fetchPrBatchReducer,
  masdate: masdateReduces,
  grvlst: grvlstReducer,
  grv: grvReducer,
  grvSnt: grvSntReducer,
  getExmCntrs: getExmCntrRedu,
  HTCnt: fetchHallTicketReducer,
  bundleRecv: bundleRecvReducer,
  lastDU: lstDateUpdateRedu,
  feeheads: feeHeadsReducer,
  upload: uploadReducer,
  qpstat: qpStatReducer,
  qpstatsum: qpStatSumReducer,
  category: categoryReducer,
  feeStrForm: feeStrFormReducer,
  feeDetl: feeDetlReducer,
  feeDate: feeDateReducer,
  pgetEditApp: pgetEditApp,
  pgetDeg: pgetDeg,
  activeCollege: activeCollegeReducer, //kunal
  collegeList: allClgList,
  GetSpecificCollege: GetSpecificCollege,
  CollegeForm: CollegeForm,
  resultStatCollegeWise: resultStatCollegeWise,
  ExamAppStats: ExamAppStats,
  ExmDetStats: ExmDetStats,
  getDegExmRng: getDegExmRng,
  shwFeeUpdateDet: shwFeeUpdateDet,
  admCollStats: getAdmStats,
  getSpecCollDet: getSpecCollDet,
  allcollegeList: allClgList,
  cropImage: cropImage,
  collegeWiseDegreeList: collegeWiseDegreeList,
  getStudentPhotosDegreeWise: getStudentPhotosDegreeWise
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;
