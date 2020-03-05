export const allClgList = (state = [], action) => {
  // console.log("action", action)
  switch (action.type) {
    case "ALL_COLLEGE_LIST":
      return action.payload.data;
    default:
      return state;
  }
};

export const GetSpecificCollege = (state = [], action) => {
  // console.log("action", action)
  switch (action.type) {
    case "GET_SPECIFIC_COLLEGE":
      return action.payload.data;
    default:
      return state;
  }
};
