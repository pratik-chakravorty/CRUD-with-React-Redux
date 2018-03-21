const errorReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVED':
            return {
                ...state,
                message: action.message
            }
        case 'NO_ERROR_RECEIVED':
            return {
                ...state,
                message: ''
            }
        case 'POST_ERROR':
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}

export default errorReducer;