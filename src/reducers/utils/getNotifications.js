const NotificationList = (state = [], action) => {
    console.log("qwertyqwerty", action)
    switch (action.type) {
        case "NOTIF_LIST":
            return action.payload.data;
        default:
            return state;
    }
}
export { NotificationList };