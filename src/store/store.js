import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        nickName: 'anonymous'
    },
    reducers: {
        setNickname(state, action) {
            state.nickName = action.payload;
        }
    }
});

export const { setNickname } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
});

export default store;