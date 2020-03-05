const initstate = { header: [], body: [], width: [], align: [] }
const fetchHallTicketReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'FETCH_HTCNT':
            return action.payload.data;
        default:
            return state;
    }
}

export { fetchHallTicketReducer };