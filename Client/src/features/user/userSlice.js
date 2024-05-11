import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        setUser(state, action){
            state.user = action.payload;
        },
        clearUser(state){
            initialState; //updated
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export const selectUser = (state) => state.user.user; //no idea
export default userSlice.reducer;