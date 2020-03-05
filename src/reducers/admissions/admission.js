const initstate = {
  data: [],
  particular_college_data: [],
  degrees: []
};

export const studentDegreeCombintaion = (state = initstate, action) => {
  switch (action.type) {
    case "STUDENT_DEGREE_COMBINATION":
      if (action.payload.particular_college_data.length > 0) {
        return {
          ...action.payload
        };
      }
      if (action.payload.particular_college_data.length == 0) {
        let new_row = {
          fcombcode: "",
          fdegree: "",
          fexamno: "A",
          fintake: "",
          fdeleted: "F",
          editFlage: true
        };

        return {
          ...action.payload,
          particular_college_data: [...state.particular_college_data, new_row]
        };
      }
      break;
    case "STUDENT_DEGREE_COMBINATION_CHANGE":
      let new_row = {
        fcombcode: "",
        fdegree: "",
        fexamno: "A",
        fintake: "",
        fdeleted: "F",
        editFlage: true
      };
      return {
        ...state,
        particular_college_data: [...state.particular_college_data, new_row]
      };
    case "CHANGE_ADMISSION_DATA":
      let { el, i } = action.payload;
      var data;
      var data1 = state.particular_college_data.map((item, j) => {
        data = item;
        if (j === i) {
          data = { ...el };
        }
        return data;
      });
      return {
        ...state,
        particular_college_data: data1
      };
    case "FILTER_FCOMBCODE_DATA":
      let FcobmCode = action.payload;
      return {
        ...state,
        filtered_option_wise: FcobmCode
      };
    case "CANCEL_COLLEGECOMB":
      return initstate;
    default:
      return state;
  }
};
