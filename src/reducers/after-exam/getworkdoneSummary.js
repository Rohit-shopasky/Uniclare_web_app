const workDoneReportSummary = (state = { valdet: [] }, action) => {
  switch (action.type) {
    case "WORK_DONE_REPORT_SUMMARY":
      return action.payload.data;
    default:
      return state;
  }
};
export { workDoneReportSummary };
