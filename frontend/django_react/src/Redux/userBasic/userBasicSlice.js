import {createSlice} from '@reduxjs/toolkit'


export const userBasicSlice = createSlice(
   {
    name: 'userStatus',
    initialState: {
      name: null,
      isAuthenticated: false
    },
    reducers: {
      set_User: (state, action) => {
        state.name = action.payload.name;
        state.isAuthenticated = action.payload.isAuthenticated;
      }
    }


})

export const {set_User} =  userBasicSlice.actions

export default userBasicSlice.reducer