export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATE_MASTER':
      if (action.payload.data.length === 0)
        return [{ fdatecode: '', fdate: '', fdeleted: false }]
      else
        return action.payload.data;

    case 'ADD_DATE_MASTER':
      return [...state, action.payload];

    case 'DELETE_DATE_MASTER':
      return [];

    case 'CHANGE_DATE_MASTER':
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

