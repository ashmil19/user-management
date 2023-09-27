import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'admin',
    initialState: {users: null},
    reducers: {
        setUsers: (state, action)=>{
            const {users} = action.payload
            state.users = users
        }
    }
})

export const { setUsers } = adminSlice.actions

export default adminSlice.reducer