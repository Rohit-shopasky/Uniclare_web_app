export const dailyRvPcReport = (state = [], action) => {

    switch (action.type) {
        case "GET_RV_PC_REPORT":
            return action.payload.data;

        case "CLEAR_RVPC_REPORT":
            return [];
        case "GET_CHK_LIST":

            return action.payload.data;
        case "EMPTY":
            return [];
        default:
            return state;
    }
};
