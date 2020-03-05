const workDoneReport = (state = { valdet: [] }, action) => {
  switch (action.type) {
    case "WORK_DONE_REPORT":
      return action.payload.data;
    case "DEL_WORK_DONE":
      return { valdet: [] };
    default:
      return state;
  }
};
export { workDoneReport };
