export const getAdmStats = (
  state = { collDegDet: [], collDet: [] },
  action
) => {
  switch (action.type) {
    case "GET_ADM_STATS":
      return action.payload.data;
    default:
      return state;
  }
};

export const getSpecCollDet = (state = [], action) => {
  switch (action.type) {
    case "GET_PCOLL_DET":
      return action.payload.data;
    default:
      return state;
  }
};
