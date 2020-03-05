import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import Profile from "./containers/DefaultLayout/Profile";

const DegreeGroup = React.lazy(() => import("./pages/masters/deggrp"));
const Combination = React.lazy(() => import("./pages/masters/combination"));
const Student = React.lazy(() => import("./pages/masters/student"));
const Centres = React.lazy(() => import("./pages/before-exam/centres"));
const CCentres = React.lazy(() => import("./pages/before-exam/ccentres"));
const QpIndent = React.lazy(() => import("./pages/before-exam/qpindent"));
const HTCount = React.lazy(() => import("./pages/before-exam/htdwonload"));
const College = React.lazy(() => import("./pages/masters/college"));

const DateMaster = React.lazy(() =>
  import("./pages/before-exam/timetable/dateMaster")
);

const HolidayMaster = React.lazy(() =>
  import("./pages/before-exam/timetable/holidayMaster")
);

const HolidayList = React.lazy(() => import("./pages/masters/holiday-list"));

const TimeTable = React.lazy(() => import("./pages/before-exam/timetable"));
const GenTimeTable = React.lazy(() =>
  import("./pages/before-exam/timetable/gentimetable")
);
// const Utils = React.lazy(() => import('./pages/utils'));
const Grievances = React.lazy(() => import("./pages/utils/grv"));
const BatchDetails = React.lazy(() =>
  import("./pages/practicals/batchdetails")
);
const ExamCntr = React.lazy(() => import("./pages/duringexam/examcenter"));
const BundleRecv = React.lazy(() => import("./pages/duringexam/bundleRecv"));
const ViewTimeTable = React.lazy(() =>
  import("./pages/duringexam/viewTimeTable")
);
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const FeeReport = React.lazy(() => import("./pages/finance/feeReport/"));
const LastDateUpdate = React.lazy(() =>
  import("./pages/utils/lastDateUpdate/")
);
const CreateFeeHead = React.lazy(() => import("./pages/masters/feeheads"));
const FeeUpdation = React.lazy(() =>
  import("./pages/before-exam/fee-updation")
);
const FeeDatesUpdate = React.lazy(() =>
  import("./pages/before-exam/fee-updation/DateUpdate")
);
const QPUplad = React.lazy(() => import("./pages/utils/qpupload"));
const ValStats = React.lazy(() =>
  import("./pages/after-exam/Valuation/Statistics")
);
const ValInvi = React.lazy(() =>
  import("./pages/after-exam/Valuation/valuationInvitation")
);
const DegreeReports = React.lazy(() =>
  import("./pages/masters/Degree/degreeReports")
);

const Degree = React.lazy(() => import("./pages/masters/Degree/entryScreen"));

const SubjectReports = React.lazy(() =>
  import("./pages/masters/subject/SubjectReports")
);

const StudentReports = React.lazy(() =>
  import("./pages/masters/student/StudentReports")
);
const INeedHelp = React.lazy(() => import("./pages/utils/INeedHelp"));

const ValuationReports = React.lazy(() =>
  import("./pages/after-exam/Valuation/ValuationReports")
);

const ValuationSummary = React.lazy(() =>
  import("./pages/after-exam/Valuation/ValuationSummary")
);

const PgetReports = React.lazy(() => import("./pages/pget/PgetReports"));

const PGETApp = React.lazy(() => import("./pages/pget"));

// kunal updatess
const CollegeForm = React.lazy(() =>
  import("./pages/masters/collegeform/index")
);
const StudentPhoto = React.lazy(() =>
  import("./pages/utils/studentPhotoUpload/studentphoto")
);
const Chart = React.lazy(() => import("./pages/testchat/testchart"));
const Collegewiseintake = React.lazy(() =>
  import("./pages/admission/college-wise-intake/collegewiseintake")
);

const ExmAppStats = React.lazy(() =>
  import("./pages/before-exam/examAppStats")
);
const DetExamStats = React.lazy(() =>
  import("./pages/before-exam/examAppStats/DetExmStats")
);

const RVRTFeeUpdate = React.lazy(() => import("./pages/utils/RVRTFeeUpdate"));
const AdmStats = React.lazy(() => import("./pages/admission/statistics"));

const Phtocrop = React.lazy(() => import("./pages/utils/PhotoCrop/photocrop"));
// ValuationSummary

const CandidateList = React.lazy(() =>
  import("./pages/before-exam/exam-application/CandidateList")
);

const CreateUser = React.lazy(() => import("./pages/utils/CreateUser"));
const AssignMenus = React.lazy(() => import("./pages/utils/assignMenus"));
const SubjectEntry = React.lazy(() =>
  import("./pages/masters/subject/subjectEntry/")
);

const ReasonMaster = React.lazy(() => import("./pages/masters/reasonMaster/"));
const BoardMaster = React.lazy(() => import("./pages/masters/boardMaster/"));
const MasQP = React.lazy(() => import("./pages/masters/masQP"));
const HostNotification = React.lazy(() =>
  import("./pages/utils/hostNotification")
);
const EditNotification = React.lazy(() =>
  import("./pages/utils/hostNotification/editNotification")
);
const SubjectWiseList = React.lazy(() =>
  import("./pages/masters/subject/subwiseList/")
);
const RefundApp = React.lazy(() => import("./pages/finance/refundApp/"));

const SMSNotification = React.lazy(() =>
  import("./pages/utils/sms-notification")
);

const ReminderTak = React.lazy(() =>
  import("./pages/utils/taskreminder/taskreminder")
);
const WorkDoneReport = React.lazy(() =>
  import("./pages/after-exam/workdoneReport")
);
const WorkDoneReportSummry = React.lazy(() =>
  import("./pages/after-exam/workdonesummry")
);
const NewControlModal = React.lazy(() =>
  import("./containers/DefaultLayout/newcontrolModal")
);

const DailyValuation = React.lazy(() =>
  import("./pages/after-exam/dailyValuation/DailyValuation")
);
const RvPcDailyReport = React.lazy(() =>
  import("./pages/after-exam/RVPCDailyReport/RvPcDailyReport")
);
const UpdateRvRtCheckList = React.lazy(() =>
  import("./pages/after-exam/UpdateRvRtCheckList/updateRvRtCheckList_old")
);
const ScanCodeList = React.lazy(() =>
  import("./pages/after-exam/UpdateRvRtCheckList/scanCodeList")
);

const GenerateCodeList = React.lazy(() => import("./pages/after-exam/GenerateCodeList/generateCodeList"))

const ResultStatistics = React.lazy(() => import("./pages/after-exam/resultStatistics"))
const ExamAppFeeReport = React.lazy(() => import("./pages/finance/feeReport/examApplicationFeeReport"));

const IaPendingReport = React.lazy(() => import("./pages/before-exam/IAReports/iaPendingReport"));
const PrPendingReport = React.lazy(() => import("./pages/before-exam/PRReports/index"));

// const ReminderTak = React.lazy(() =>
//   import("./pages/utils/taskreminder/taskreminder")
// );
// const WorkDoneReport = React.lazy(() =>
//   import("./pages/after-exam/workdoneReport")
// );
// const WorkDoneReportSummry = React.lazy(() =>
//   import("./pages/after-exam/workdonesummry")
// );

const ValuationBill = React.lazy(() =>
  import("./pages/after-exam/valuationBill")
);
const NotValueReport = React.lazy(() =>
  import("./pages/after-exam/notvalue/notvalue")
);

const UploadPhotoCopy = React.lazy(() =>
  import("./pages/after-exam/uploadPhotoCopy")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: DefaultLayout
  },
  // {
  // path: "/utils/photoCrop",
  // exact: true,
  // name: "Home",
  // component: StudentPhoto
  // },
  {
    path: "/masters/college",
    exact: true,
    name: "Home",
    component: CollegeForm
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/utils/PhotoCrop",
    component: Phtocrop
  },
  {
    path: "/masters/degreegroup",
    name: "Degree Group",
    component: DegreeGroup
  },
  {
    path: "/masters/chart",
    name: "Chart",
    component: Chart
  },
  {
    path: "/masters/combination",
    name: "Combination",
    component: Combination
  },
  {
    path: "/masters/student",
    name: "Student",
    component: Student
  },
  {
    path: "/masters/centres",
    name: "Centres",
    component: Centres
  },
  {
    path: "/masters/ccentres",
    name: "CCentres",
    component: CCentres
  },
  {
    path: "/masters/qpindent",
    name: "QP Indent",
    component: QpIndent
  },
  {
    path: "/before-exam/htdwonload",
    name: "HT Download Status",
    component: HTCount
  },
  {
    path: "/masters/college-reports",
    name: "College",
    component: College
  },
  {
    path: "/timetable/dateMaster",
    name: "DateMaster",
    component: DateMaster
  },
  {
    path: "/timetable/holidayMaster",
    name: "HolidayMaster",
    component: HolidayMaster
  },
  {
    path: "/timetable/timetable",
    name: "Time Table",
    component: TimeTable
  },
  {
    // GenTimeTable
    path: "/timetable/gentimetable",
    name: "Time Table",
    component: GenTimeTable
  },
  // { path: '/pages/utils', name: 'Utils', component: Utils },
  {
    path: "/utils/grv",
    name: "Grievances",
    component: Grievances
  },
  {
    path: "/duringexam/examcenter",
    name: "ExamCntr",
    component: ExamCntr
  },
  {
    path: "/duringexam/bundleRecv",
    name: "BundleRecv",
    component: BundleRecv
  },
  {
    path: "/duringexam/viewTimeTable",
    name: "ViewTimeTable",
    component: ViewTimeTable
  },
  {
    path: "/timetable/gentimetable",
    name: "Time Table",
    component: GenTimeTable
  },
  {
    // BatchDetails
    path: "/practicals/batchdetails",
    name: "Batch Details",
    component: BatchDetails
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/finance/feeReport/",
    name: "Fee Report",
    component: FeeReport
  },
  {
    path: "/utils/lastDateUpdate/",
    name: "Last Date Update",
    component: LastDateUpdate
  },
  {
    path: "/master/feehead",
    name: "Create Fee Head",
    component: CreateFeeHead
  },
  {
    path: "/before-exam/update-fee-str",
    name: "Fee Updation",
    component: FeeUpdation
  },
  {
    path: "/utils/update-fee-dates",
    name: "Update Fee Dates",
    component: FeeDatesUpdate
  },
  {
    path: "/utils/qp-upload",
    name: "QP Upload",
    component: QPUplad
  },
  {
    path: "/after-exam/val-stats",
    name: "Valuation Statistics",
    component: ValStats
  },
  {
    path: "/after-exam/val-invitation",
    name: "Valuator Invitation",
    component: ValInvi
  },
  {
    path: "/masters/degree-reports",
    name: "Degree Reports",
    component: DegreeReports
  },
  {
    path: "/masters/subject-reports",
    name: "Subject Reports",
    component: SubjectReports
  },
  {
    path: "/masters/student-reports",
    name: "Student Reports",
    component: StudentReports
  },
  {
    path: "/utilities/i-need-help",
    name: "I Need Help",
    component: INeedHelp
  },
  {
    path: "/after-exam/valuation-report",
    name: "Valuation Report",
    component: ValuationReports
  },
  {
    path: "/after-exam/val-sum",
    name: "Valuation Summary",
    component: ValuationSummary
  },
  {
    path: "/pget/reports",
    name: "PGET Reports",
    component: PgetReports
  },
  {
    path: "/pget/edit",
    name: "Edit Application",
    component: PGETApp
  },
  {
    path: "/admission/intake",
    name: "admission intake",
    component: Collegewiseintake
  },
  {
    path: "/before-exam/examAppStats",
    name: "Exam Application Statistics",
    component: ExmAppStats
  },
  {
    path: "/pages/before-exam/examAppStats/DetExmStats",
    name: "Exam Application Pay Statistics",
    component: DetExamStats
  },
  {
    path: "/utils/RVRTFeeUpdate",
    name: "Exam Application Pay Statistics",
    component: RVRTFeeUpdate
  },
  {
    path: "/admission/statistics",
    name: "Admission Statistics",
    component: AdmStats
  },
  {
    path: "/masters/entryScreen",
    name: "Degree",
    component: Degree
  },
  {
    path: "/before-exam/candidate-list",
    name: "Candidate List",
    component: CandidateList
  },
  {
    path: "/utils/createUser",
    name: "Create New User",
    component: CreateUser
  },
  {
    path: "/utils/assignMenus",
    name: "Assign Menus User",
    component: AssignMenus
  },
  {
    path: "/masters/subject",
    name: "Subject Entry",
    component: SubjectEntry
  },
  {
    path: "/masters/reasonMaster",
    name: "Reason Master",
    component: ReasonMaster
  },
  {
    path: "/masters/boardMaster",
    name: "Board Master",
    component: BoardMaster
  },
  {
    path: "/masters/masQP",
    name: "masQP",
    component: MasQP
  },
  {
    path: "/utils/reminders",
    name: "reminder",
    component: ReminderTak
  },
  {
    path: "/after-exam/work-done-report",
    name: "work done report",
    component: WorkDoneReport
  },
  {
    path: "/masters/holiday-list",
    name: "holiday-list",
    component: HolidayList
  },
  {
    path: "/utils/hostNotification",
    name: "Post Notification",
    component: HostNotification
  },
  {
    path: "/editNotification/:postno",
    name: "Notification Details",
    component: EditNotification
  },
  {
    path: "/masters/subjectWise",
    name: "Subject wise Lists",
    component: SubjectWiseList
  },
  {
    path: "/finance/refundApp",
    name: "Refund Applications",
    component: RefundApp
  },
  {
    path: "/utils/sms-notification",
    name: "SMSNotification",
    component: SMSNotification
  },
  {
    path: "/after-exam/work-done-report-summary",
    name: "WorkDoneReportSummry",
    component: WorkDoneReportSummry
  },
  {
    path: "/change-degree-grp",
    name: "ChangeDegreeGroup",
    component: NewControlModal
  },
  {
    path: "/after-exam/valuation-bill",
    name: "ValuationBill",
    component: ValuationBill
  },
  {
    path: "/after-exam/daily-valuation",
    name: "DailyValuation",
    component: DailyValuation
  },
  {
    path: "/after-exam/rvpcdailyreport",
    name: "RvPcDailyReport",
    component: RvPcDailyReport
  },
  {
    path: "/after-exam/rvrtCheckList",
    name: "UpdateRvRtCheckList",
    component: UpdateRvRtCheckList
  },
  {
    path: "/after-exam/codelist-scan",
    name: "ScanCodeList",
    component: ScanCodeList
  },
  {
    path: "/after-exam/valuators-Details",
    name: "NotValueReport",
    component: NotValueReport
  },
  {
    path: "/arter-exam/upload-photo-copy",
    name: "UploadPhotoCopy",
    component: UploadPhotoCopy
  },
  {
    path: "/after-exam/codelist-report",
    name: "GenerateCodeList",
    component: GenerateCodeList
  },
  {
    path: "/after-exam/result-statistics",
    name: "ResultStatistics",
    component: ResultStatistics
  },
  {
    path: "/finance/exam-app-fee-report",
    name: "ExamAppFeeReport",
    component: ExamAppFeeReport
  },
  {
    path: "/before-exam/ia-pendind-report",
    name: "IaPendingReport",
    component: IaPendingReport
  },
  {
    path: "/before-exam/pr-pending-report",
    name: "PrPendingReport",
    component: PrPendingReport
  },

];

export default routes;
