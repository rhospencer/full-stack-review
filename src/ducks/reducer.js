// INITIAL STATE
const initialState = {
    loggedIn: false,
    user: null,
}
// ACTION CONSTANTS
const UPDATE_USER = 'UPDATE_USER'

// ACTION BUILDERS
export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

// REDUCER FUNCTION
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, user: action.payload}
        default:
            return state
    }

}

export default reducer