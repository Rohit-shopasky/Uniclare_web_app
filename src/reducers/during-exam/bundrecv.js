export const bundleRecvReducer = (state = [], action) => {
  switch (action.type) {
    case 'BUND_RECV':
      // console.log('reducer', action.payload.data);
      return action.payload.data;
    case 'CHANGE_DET_BARCODE':
      let { el, i } = action.payload;
      return state.map((item, j) => {
        let data = item;
        if (j === i) {
          data = { ...el }
        }
        return data;
      });
    default:
      return state;
  }
}
