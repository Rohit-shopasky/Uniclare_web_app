export default (state = {funivcode: "", funivname: "", 
ffolder: "", fegov: ""}, action) => {
    switch(action.type)
    {
        case 'SET_UNIV':
            return action.payload;
        default :
            return state; 
    }
}