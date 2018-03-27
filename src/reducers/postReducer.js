
const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST':
            let index = state.findIndex(post => post.id == action.data.id)
            if (index == -1) {
                return [...state, action.data]
            }
            return state;
        case 'DELETE':
            return state.filter((post) => post.id !== action.id)
        case 'EDIT':
            return state.map((post) => post.id === action.id ? { ...post, editing: !post.editing } : post)

        case 'ADD_EDIT_POST':
            return state.map((post) => {
                if (post.id === action.data.id) {
                    post.title = action.data.title
                    post.message = action.data.message
                    post.editing = !action.data.editing
                    return post;
                }

                return post;
            })
        case 'ADDING_POST':
            return state;
        case 'POST_EDIT_ERROR':
            return state.map((post) => {
                if (post.id === action.id) {
                    post.errorMessage = action.message;
                    return post;
                }
                return post;
            })
        case 'CLEAR_ERROR':
            return state.map((post) => {
                if (post.id === action.id) {
                    post.errorMessage = '';
                    return post;
                }
                return post;
            })
        default:
            return state
    }
}

export default postReducer;