import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    userName: '',
    userId: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
            state.isAdmin = action.payload.isAdmin;
        },
    },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;