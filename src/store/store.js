import { configureStore, createSlice } from '@reduxjs/toolkit'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return { nickName: 'anonymous' }; // 기본 상태 반환
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { nickName: 'anonymous' };
    }

};

// 로컬 스토리지에 상태를 저장하는 함수
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (err) {
        console.error('Fail setItem: ' + state);
    }
};

// 초기 상태를 로컬 스토리지에서 불러옴
const initialState = loadState();

const userSlice = createSlice({
    name: 'user',
    initialState,
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

// 상태가 변경될 때마다 로컬 스토리지에 저장
store.subscribe(() => {
    saveState(store.getState().user);
});

export default store;