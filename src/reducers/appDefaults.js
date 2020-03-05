const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADER':
      return true;
    case 'UNSET_LOADER':
      return false;
    default:
      return state;
  }
}

const setErrorReducer = (state = { error_code: 2, data: { msg: "" }, status: "" }, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload;
    case 'UNSET_ERROR':
      return { error_code: 2, data: { msg: "" }, status: "" };
    default:
      return state;
  }
}

const showErrorReducer = (state = { open: false, size: "mini", header: "", content: "" }, action) => {
  switch (action.type) {
    case 'SHOW_ERROR':
      return { ...action.payload, open: true, size: "mini" };
    case 'CLOSE_ERROR':
      return { open: false, header: "", content: "" };
    default:
      return state;
  }
}

export { loadingReducer, setErrorReducer, showErrorReducer };