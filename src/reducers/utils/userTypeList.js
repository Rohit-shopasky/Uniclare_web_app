const initstate = { FUSERTYPE: "", FTYPEDESC: "", FTYPESHORT: "", FDELETED: "F", FEDIT: "T" };

export const userTypeList = (state = [initstate], action) => {
    switch (action.type) {
        case "USER_TYPE_LIST":
            return action.payload.data;
        case "ADD_USER_TYPES":
            return [...state, initstate];
        case "USER_TYPE_LIST_EDIT":
            let { el, i } = action.payload;
            return state.map((item, j) => {
                let data = item;
                if (j === i) data = { ...el };
                return data;
            });
        default:
            return state;
    }
};