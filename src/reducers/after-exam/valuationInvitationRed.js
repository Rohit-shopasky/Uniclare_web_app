const initstate = {
    data: []

}
var final2 = []
var final3 = []
export const getValInviReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_VAL_INVI':
            console.log("1st.payload", action.payload)
            console.log("ppoijp", action.payload.data.taechcntr)
            console.log('lkjodj', state.taechdet)
            return { ...state, ...action.payload.data };
        case 'CHANGE_INVITE_DATA':
            console.log("all", action.payload)

            let { el, i } = action.payload

            console.log('lkjodj', state.taechdet)

            const new_arr = state.taechdet.map((item, j) => {
                let data = item;
                if (j === i) {
                    return el
                }
                else return item

            })

            return { taechdet: [...new_arr] }

        case 'CHANGE_ALL':
            console.log("1st.payload", action.payload, action.payload.el.checked)
            const { data, finaldata } = action.payload
            if (action.payload.el.checked) {
                const new_arr2 = action.payload.i.map(async (item) => {


                    await final2.push({
                        fteachcode: item.fteachcode,
                        FTEACHNAME: item.FTEACHNAME,
                        FSCALE: item.FSCALE,
                        fmobile: item.fmobile,
                        femail: item.femail,
                        fboard: item.fboard,
                        finvited: "T",

                    }
                    )
                }
                )
                console.log("before", final2, new_arr2)

                return { taechdet: [...final2] }
            }
            if (!action.payload.el.checked) {

                const new_arr3 = action.payload.i.map(async (item) => {


                    await final3.push({
                        fteachcode: item.fteachcode,
                        FTEACHNAME: item.FTEACHNAME,
                        FSCALE: item.FSCALE,
                        fmobile: item.fmobile,
                        femail: item.femail,
                        fboard: item.fboard,
                        finvited: "F",

                    }
                    )
                }
                )
                console.log("before", final3, new_arr3)

                return { taechdet: [...final3] }
            }


        default:
            return state;
    }
}


export const saveInvitation = (state = [], action) => {
    console.log("actionaction", action.type)
    switch (action.type) {
        case "SAVE_INVITE_DATA":
            return action.payload;
        default:
            return state;
    }
}


export const saveInviteList = (state = [], action) => {
    console.log("actionaction", action.type)
    switch (action.type) {
        case "SAVE_INVITE_LIST":
            return action.payload;

        default:
            return state;
    }
}

export const sendMsg = (state = [], action) => {
    console.log("sednmsjacyion", action.payload)
    switch (action.type) {
        case "SVAE_SEND_MESSAGE":
            return action.payload;

        default:
            return state;
    }
}

export const sendMsgAll = (state = [], action) => {
    console.log("sednmsjacyion", action.type)
    switch (action.type) {
        case "SEND_ALL_MSG":
            return action.payload;

        default:
            return state;
    }
}