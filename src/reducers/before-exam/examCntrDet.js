export const examCntrDetReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CNTR_DET':
            if (action.payload.data.examcntrdet.length === 0)
                return [{ fcollcode: '', fdeleted: false }]
            else
                return [...action.payload.data.examcntrdet];

        case 'UPD_CNTR_DET':
            let { el, i } = action.payload;
            return state.map((item, j) => {
                let data = item;
                if (j === i) {
                    data = { ...el }
                }
                return data;
            });

        case 'ADD_CNTR_DET':
            return [...state, action.payload];

        default:
            return state;
    }
}

export const saveExamCenter = (state = { error_code: 2, message: "", status: "" }, action) => {
    switch (action.type) {
        case 'SAVE_EXAM_CENTER':
            return action.payload.data;
        default:
            return state;
    }
}

export const degCollReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_DEGCOLL':
            return action.payload.data.degcolldet;
        default:
            return state;
    }
}