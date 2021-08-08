import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: '',
    displayName: 'Name not added',
    phoneNumber: 'phone not added'
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (user, action) => {
            user.email = action.payload.email
            user.password = action.payload.password
            user.displayName = action.payload.displayName
            user.phoneNumber = action.payload.phoneNumber
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser } = UserSlice.actions

export default UserSlice.reducer