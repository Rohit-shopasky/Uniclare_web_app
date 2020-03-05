const fetchPrSubReduces = (state = [], action) => {
  switch (action.type) {
    case "FETCH_PRSUB":
      return action.payload.data;
    default:
      return state;
  }
};

const fetchBoardReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BOARDS":
      return action.payload.data;
    default:
      return state;
  }
};

const fetchPrBatchReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_PRBATCHDET":
      return action.payload.data;
    default:
      return state;
  }
};

export { fetchPrSubReduces, fetchBoardReducer, fetchPrBatchReducer };
