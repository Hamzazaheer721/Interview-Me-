import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
    isVisible: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin
            }
        case ACTIONS.MAKE_VISIBLE:
                return {
                    ...state,
                    isVisible: true
            }
        case ACTIONS.MAKE_INVISIBLE:
                return {
                    ...state,
                    isVisible: false
            }
        case ACTIONS.TOGGLE_VISIBLE:
            return {
                ...state,
                isVisible: !state.isVisible
        }
        default:
            return state
    }
}

export default authReducer