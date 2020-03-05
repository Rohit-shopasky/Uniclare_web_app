export default (state = { error_code: 2, data: { msg: "" }, status: "" }, action) => {
    switch (action.type) {
        case 'SAVE_DEGREEGROUP':
            return action.payload;
        default:
            return state;
    }
}