import { combineReducers } from "redux";

const initialUser = {
    email: '',
    password: '',
    displayName: 'Name not added'
}

const User = (state = initialUser, action) => {
    if (action.type == 'USER') {
        return {
            ...state,
            [action.inputType]: action.inputValue
        }
    }
    if (action.type == 'LOGOUT') {
        return {
            // ...state,
            email: '',
            password: '',
            displayName: 'Name not added'
        }
    }
    return state
}

const reducer = combineReducers({
    User,
})

export default reducer;