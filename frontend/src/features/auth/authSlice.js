import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, accessToken: null, isAdmin: null},
    reducers: {
        setCredentials: (state, action) =>{
            const {user, accessToken, isAdmin} = action.payload
            state.user = user
            state.accessToken = accessToken
            state.isAdmin = isAdmin
        },
        updateToken: (state, action) =>{
            const { accessToken } = action.payload
            state.accessToken = accessToken
        },
        logOut: (state, action) =>{
            state.user = null
            state.accessToken = null
            state.isAdmin = null
        }
    }
})


export const { setCredentials, updateToken, logOut } = authSlice.actions

export default authSlice.reducer