export const dailyValuation = (state = [], action) => {
    switch (action.type) {
        case "GET_DAILY_VALUATION":
            return action.payload.data;

        case "CLEAR_DAILY_VALUATION":
            return [];
        default:
            return state;
    }
};
