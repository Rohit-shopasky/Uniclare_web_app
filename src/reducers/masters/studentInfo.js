const init_state = {
  masuser: {
    fmobileno: "",
    fregno: "",
    femail: "",
    fdob: "",
    fparentmob: "",
    ffolder: ""
  },
  student: {
    fname: "",
    ffatname: "",
    fmotname: "",
    fdegree: "",
    fcollcode: "",
    degree: "",
    fexamname: "",
    fexamdate: "",
    college: "",
    fphotopath: "",
    category: "",
    feetype: "",
    examblk: ""
  },
  subject: [],
  examApp: [],
  iamarks: []
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "FETCH_STUD_INFO":
      return { ...state, ...action.payload.data };
    case "FETCH_CUR_SUB":
      return { ...state, ...action.payload.data };
    case "FETCH_EXAM_APPS":
      return { ...state, ...action.payload.data };
    case "FETCH_IAMARKS":
      return { ...state, ...action.payload.data };
    case "DELETE_STUD_INFO":
      return init_state;
    default:
      return state;
  }
};
