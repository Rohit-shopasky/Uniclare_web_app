export const getExmCntrRedu = (state = [], action) => {
  switch (action.type) {
    case 'GET_EXM_CNTR':
      return action.payload.data;
    default:
      return state;
  }
}