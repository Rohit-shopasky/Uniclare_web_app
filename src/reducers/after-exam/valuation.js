const qpstat_initstate = [];

export const qpStatReducer = (state = qpstat_initstate, action) => {
  switch (action.type) {
    case "FETCH_QPSTATS":
      return action.payload.data;
    case "DELETE_QPSTATS":
      return qpstat_initstate;
    default:
      return state;
  }
};

export const qpStatSumReducer = (state = qpstat_initstate, action) => {
  switch (action.type) {
    case "FETCH_QPSTATS_SUM":
      return action.payload.data;
    case "DELETE_QPSTATS_SUM":
      return qpstat_initstate;
    default:
      return state;
  }
};
