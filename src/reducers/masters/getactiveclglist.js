
export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ACTIVE_COLLEGE':
            return action.payload.data;
        default:
            return state;
    }
}