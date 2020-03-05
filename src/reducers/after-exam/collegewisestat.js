export const resultStatCollegeWise = (state = [], action) => {
  switch (action.type) {
    case "GET_RESULT_STAT_COLLEGEWISE":
      return action.payload.data;
    default:
      return state;
  }
};
