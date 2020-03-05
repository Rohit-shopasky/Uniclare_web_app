export default (state = [], action) => {
    switch(action.type)
    {
        case 'FETCH_UNIVS':
            return action.payload.data.univs;
        default :
            return state; 
    }
}