const initstate = {

    data: []
};
const taskstate = {
    data: []
}
export const taskReminder = (state = initstate, action) => {
    switch (action.type) {
        case "REMINDER_MEMEBER_LIST":
            console.log("action.payload", action.payload)

            return action.payload;

        case "CHANGE_DATA":
            const { name, value } = action.payload;
            return { ...state, [name]: value };


        default:
            return state;
    }
};
export const taskReminderLIST = (state = taskstate, action) => {
    switch (action.type) {
        case "ALL_REMINDER_DATA":
            console.log("action.payload", action.payload)

            return action.payload.data;
        case "CHANGE_DATA_REMINDER":
            const { name, value } = action.payload;
            return { ...state, [name]: value };




        default:
            return state;
    }
};
