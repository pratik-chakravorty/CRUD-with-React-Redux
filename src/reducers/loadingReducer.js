const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOADING_TRUE':
            return true
        case 'LOADING_FALSE':
            return false
        default:
            return state;
    }
}

export default loadingReducer;