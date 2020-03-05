export default (state = [], action) => {
  switch (action.type) {
    case "CROP_IMAGE":
      return action.payload.data;
    default:
      return state;
  }
};

export const collegeWiseDegreeList = (state = [], action) => {
  switch (action.type) {
    case "COLLEGE_WISE_DEGREE_GROUP":
      return action.payload.data;
    default:
      return state;
  }
};

export const getStudentPhotosDegreeWise = (state = [], action) => {
  switch (action.type) {
    case "GET_STUDENT_PHOTO_LIST":
      return action.payload.data;
    default:
      return state;
  }
};
