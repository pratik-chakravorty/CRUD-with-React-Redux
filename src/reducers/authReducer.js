function authReducer(state = false, action) {
    switch (action.type) {
        case 'AUTHED_TRUE':
            return true;
        case 'AUTHED_FALSE':
            return false;
        default:
            return state;
    }
}

export default authReducer;