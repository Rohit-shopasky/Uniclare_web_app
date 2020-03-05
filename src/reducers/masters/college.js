export default (state = [], action) => {

    switch(action.type){
        case 'FETCH_COLG_REPORT':
            // console.log("actonnn",action.payload.data);
            return action.payload.data;
        default :
            return state;
    }
}