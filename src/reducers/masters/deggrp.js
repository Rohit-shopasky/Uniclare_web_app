export const degGrpReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DEGGRP':
      if (action.payload.data.deggrp.length !== 0)
        return action.payload.data.deggrp;
      else {
        const item = { fdeggrp: "", fdescpn: "", fyear: "", fexamtype: "", fexamdate: "", fdeleted: false }
        return [item];
      }
    default:
      return state;
  }
}

export const degGrpDegreeReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DEGGRP_DEGREE':
      return action.payload.data;

    case 'SELECT_DEGGRP_DEGREE':
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