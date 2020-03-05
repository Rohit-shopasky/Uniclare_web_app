export const ExamAppStats = (state = [], action) => {
  switch (action.type) {
    case "GET_EXMAPP_STATS":
      return action.payload.data;
    default:
      return state;
  }
};

export const ExmDetStats = (state = [], action) => {
  switch (action.type) {
    case "GET_DET_EXMSTATS":
      return action.payload.data;
    default:
      return state;
  }
};
