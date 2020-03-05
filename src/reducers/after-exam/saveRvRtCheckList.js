export const saveRvRtCheckList = (state = [], action) => {
    switch (action.type) {
        case "SAVE_RV_RT_CHECKLIST":
            return action.payload.data;

        default:
            return state;
    }
};