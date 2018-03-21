const editErrorReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'POST_EDIT_ERROR':
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}

export default editErrorReducer;