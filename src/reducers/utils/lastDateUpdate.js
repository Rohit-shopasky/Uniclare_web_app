export const lstDateUpdateRedu = (state = [], action) => {
  switch (action.type) {
    case 'LASTDATE_UPDATE': {
      // console.log('reducers', action.payload);
      return action.payload;
    }

    default:
      return state;
  }
}