import { fromJS } from 'immutable';

const timetableReduces = (state = [], action) => {
  switch (action.type) {
    case 'GENERATE_TIMETABLE':
      return fromJS(action.payload.data.timetable);
    case 'UPDATE_TIMETABLE':
      const newstate = state.set(action.payload.id, fromJS(action.payload.el));
      return state.set(action.payload.id, fromJS(action.payload.el));
    case 'CANCEL_TIMETABLE':
      return [];
    default:
      return state;
  }
}

const reasonReduces = (state = [], action) => {
  switch (action.type) {
    case 'GENERATE_TIMETABLE':
      return action.payload.data.reason;
    default:
      return state;
  }
}

const masdateReduces = (state = [], action) => {
  switch (action.type) {
    case 'GENERATE_TIMETABLE':
      return action.payload.data.masdate;
    default:
      return state;
  }
}

const saveTimeTableReducer = (state = { error_code: 2, message: "", status: "" }, action) => {
  switch (action.type) {
    case 'SAVE_TIMETABLE':
      return action.payload;
    default:
      return state;
  }
}

export { timetableReduces, reasonReduces, masdateReduces, saveTimeTableReducer };