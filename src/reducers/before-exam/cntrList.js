export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_EXAM_CENTRES':
            return action.payload.data;
        case 'FETCH_EXAM_CENTRES':
            const { e, el, i } = action.payload;
            console.log(e, el, i);
            let arra = state.map((item, j) => {
                let data = item;
                if (j === i) {
                    data = { ...el, [e.target.name]: e.target.value }
                }
                return data;
            })
            return arra;
        default:
            return state;
    }
}