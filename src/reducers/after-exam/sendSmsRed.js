export const sendSmsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_VIEW_TIME_TABLE':
            return action.payload.data;
        case 'DEL_VIEW_TIME_TABLE':
            return [];
        default:
            return state;
    }
}