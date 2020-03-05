export const saveValInvi = (state = [], action) => {
    switch (action.type) {
        case 'GET_SAVE_VAL_INVI':
            return action.payload.data;
        case 'DEL_VAL_INVI':
            return [];
        default:
            return state;
    }
}