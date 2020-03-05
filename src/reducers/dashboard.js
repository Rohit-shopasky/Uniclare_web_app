const init_state = {
  studinfo: [],
  pget: [
    {
      fregcnt: "0",
      fappcnt: "0",
      finalsubcnt: "0",
      fpaidcnt: "0"
    }
  ],
  subpget: []
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "GET_DASHBOARD":
      return action.payload.data;
    default:
      return state;
  }
};
