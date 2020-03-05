export default (state = [], action) => {

  switch (action.type) {
    case 'FETCH_HOLIDAY':
      if (action.payload.data.length === 0) {
        const item = { fremarks: '', fdate: '', fdeleted: false };
        return [item];
      }
      else {
        return action.payload.data;
      }
    case 'CHANGE_HOLIDAY':
      let { el, i } = action.payload;
      return state.map((item, j) => {
        console.log("j", j)
        let data = item;
        if (j === i) {
          data = { ...el }
        }
        return data;
      });
    case 'ADD_HOLIDAY':
      return [...state, action.payload.el];
    case 'DELETE_HOLIDAY':
      return [];
    default:
      return state;
  }
}