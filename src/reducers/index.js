import { combineReducers } from "redux";

import curunivReducer from "./curUniv";
import univReducer from "./univs";
import dashboardReducer from "./dashboard";
import { degGrpReducer, degGrpDegreeReducer } from "./masters/deggrp";
import degreesReducer from "./masters/degrees";
import combinationReducer from "./masters/combination";
import saveDeggrpReducer from "./masters/saveDeggrp";
import cntrListReducer from "./before-exam/cntrList";
import { examCntrDetReducer, degCollReducer } from "./before-exam/examCntrDet";
import studentInfoReducer from "./masters/studentInfo";
import collegeReducer from "./masters/college";
import dateMaster from "./masters/datemaster";
import activeCollegeReducer from "./masters/getactiveclglist";
import { refundReducer } from "./finance/refundListReducer"; //"./refundListReducer";
import holidayMaster from "./masters/holidayMaster"; //"./holidayMaster";
import { getTimeTablesReducer } from "./before-exam/viewtimetable"; //"./viewtimetable";
import { sendSmsReducer } from "./after-exam/sendSmsRed"; //"./sendSmsRed";
import { userTypeList } from "./utils/userTypeList";

import {
  loadingReducer,
  setErrorReducer,
  showErrorReducer
} from "./appDefaults";
import {
  getValInviReducer,
  sendMsgAll
} from "./after-exam/valuationInvitationRed"; //"./valuationInvitationRed";
import {
  timetableReduces,
  reasonReduces,
  masdateReduces
} from "./before-exam/genaratett"; //"./genaratett";
import { grvlstReducer, grvReducer, grvSntReducer } from "./utils/grv"; //"./grv";
import {
  fetchPrSubReduces,
  fetchBoardReducer,
  fetchPrBatchReducer
} from "./practicals/practicals";
import { getExmCntrRedu } from "./before-exam/exmcntr"; //"./exmcntr";
import {
  loginReducer,
  userReducer,
  userTypeReducer,
  menuReducer,
  regnReducer,
  fgtReducer
} from "./registration/loginRegn"; //"./loginRegn";
import { fetchHallTicketReducer } from "./before-exam/hallTicket"; //"./hallTicket";
import { bundleRecvReducer } from "./during-exam/bundrecv"; //"./bundrecv";
import { lstDateUpdateRedu } from "./utils/lastDateUpdate"; //"./lastDateUpdate";
import {
  feeHeadsReducer,
  categoryReducer,
  feeStrFormReducer,
  feeDetlReducer,
  feeDateReducer
} from "./finance/fee-str"; //"./fee-str";
import { uploadReducer } from "./utils/upload"; //"./upload";
import { qpStatReducer, qpStatSumReducer } from "./after-exam/valuation"; //"./valuation";
import { pgetEditApp, pgetDeg } from "./utils/pget"; //"./pget";
import { CollegeForm } from "./masters/collegeform"; //"./collegeform";
// kunal
import { resultStatCollegeWise } from "./after-exam/collegewisestat"; //"./collegewisestat";
import { allClgList, GetSpecificCollege } from "./masters/collegeformlist"; //"./collegeformlist";
import { studentDegreeCombintaion } from "./admissions/admission"; //"./admission";
import { ExamAppStats, ExmDetStats } from "./before-exam/exmAppStats"; //"./exmAppStats";
import { getDegExmRng, shwFeeUpdateDet } from "./after-exam/RVRTFeeUpdate"; //"./RVRTFeeUpdate";
import { getAdmStats, getSpecCollDet } from "./admissions/admStats"; //"./admStats";
// import { allClgList } from "./allclglist";
import { getFaculty } from "./masters/faculty"; //"./faculty";
import { getDegreeDet } from "./masters/degreeEntryScrn"; //"./degreeEntryScrn";
import cropImage, {
  collegeWiseDegreeList,
  getStudentPhotosDegreeWise
} from "./utils/cropimage"; //"./cropimage";
import { userDetails } from "./utils/createUser"; //"./createUser";
import { menuLists } from "./loadMenuList";
import { getExmNo, getSubDet, getSubData } from "./masters/subjectEntrySrcn"; //"./subjectEntrySrcn";
import { getBoard } from "./masters/boards"; //"./boards";
import { getReasonsID } from "./masters/reasonMaster";
import { boardList } from "./masters/boardMaster";
import { getMasQP } from "./masters/masQP";
import { taskReminder, taskReminderLIST } from "./utils/taskreminder";
import { holidayList } from "./masters/holidaylist";
import { postNotifList, editNotification } from "./utils/hostNotification";
import { smsReducer } from "./utils/sms-notification";
import { saveValInvi } from "./after-exam/saveValInviRed";
import { workDoneReport } from "./after-exam/getallworkdone";
import { workDoneReportSummary } from "./after-exam/getworkdoneSummary";
import { saveInvitation, sendMsg } from "./after-exam/valuationInvitationRed";
import { saveInviteList } from "./after-exam/valuationInvitationRed";
import { NotificationList } from "./utils/getNotifications";
import { dailyValuation } from "./after-exam/dailyValuation";
import { dailyRvPcReport } from "./after-exam/dailyRvPcReport";
import { saveRvRtCheckList } from "./after-exam/saveRvRtCheckList";
import { GetNotVal, fetchDropNotValued } from "./after-exam/getnotVal";
import { fetchDropDownOptions } from "./finance/getDropDownOptionsReducer";

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
  collegeList: allClgList,
  CollegeForm: CollegeForm,
  resultStatCollegeWise: resultStatCollegeWise,
  studentDegreeCombintaion: studentDegreeCombintaion,
  ExamAppStats: ExamAppStats,
  ExmDetStats: ExmDetStats,
  getDegExmRng: getDegExmRng,
  shwFeeUpdateDet: shwFeeUpdateDet,
  admCollStats: getAdmStats,
  getSpecCollDet: getSpecCollDet,
  allcollegeList: allClgList,
  cropImage: cropImage,
  collegeWiseDegreeList: collegeWiseDegreeList,
  getStudentPhotosDegreeWise: getStudentPhotosDegreeWise,
  getFaculty: getFaculty,
  getDegreeDet: getDegreeDet,
  activeCollege: activeCollegeReducer,
  refundList: refundReducer,
  GetSpecificCollege: GetSpecificCollege,
  userTypeList: userTypeList,
  userDetails: userDetails,
  menuList: menuLists,
  getExmNo: getExmNo,
  getSubjects: getSubDet,
  subjectData: getSubData,
  board: getBoard,
  getReasonsIDs: getReasonsID,
  boardList: boardList,
  masQPDet: getMasQP,
  taskReminderData: taskReminder,
  ALLReminderTask: taskReminderLIST,
  allworkDOneReport: workDoneReport,
  allworkDoneReportSummary: workDoneReportSummary,
  holidayList: holidayList,
  postNotifList: postNotifList,
  editNotification: editNotification,
  viewTimeTable: getTimeTablesReducer,
  smsNotif: smsReducer,
  dailyValuation: dailyValuation,
  dailyRvPcReport: dailyRvPcReport,
  saveRvRtCheckList: saveRvRtCheckList,
  valInvitation: getValInviReducer,
  valInvi: saveValInvi,
  saveInvitation: saveInvitation,
  saveInviteList: saveInviteList,
  dashboardNotifList: NotificationList,
  sendSms: sendSmsReducer,
  sendMsg: sendMsg,
  getNotvalData: GetNotVal,
  fetchDropNotValued: fetchDropNotValued,
  sendMsgAll: sendMsgAll,
  fetchDropDownOptions: fetchDropDownOptions
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;
