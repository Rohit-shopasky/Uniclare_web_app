const upload_initstate = {
  fqpfilenm: ""
};

export const uploadReducer = (state = upload_initstate, action) => {
  switch (action.type) {
    case "SET_QPNAME":
      return { ...state, fqpfilenm: action.payload };
    default:
      return state;
  }
};
