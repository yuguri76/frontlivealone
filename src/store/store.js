import { configureStore, createSlice } from '@reduxjs/toolkit';

// 로컬 스토리지에서 상태를 불러오는 함수
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return { id: -1, username: '', nickName: 'anonymous', email: '' };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Failed to load state:', err);
        return { id: -1, username: '', nickName: 'anonymous', email: '' };
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
        },
        setUsername(state, action) {
            state.username = action.payload;
        },
        setId(state, action) {
            state.id = action.payload;
        },
        setEmail(state, action) {
            state.email= action.payload;
        },
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductId(state, action) {
            state.id = action.payload;
        },
        setProductName(state, action) {
            state.name = action.payload;
        },
        setProductPrice(state, action) {
            state.price = action.payload;
        },
        setProductQuantity(state, action) {
            state.quantity = action.payload;
        },
    }
});

const broadcastSlice = createSlice({
    name: 'broadcast',
    initialState,
    reducers: {
        setBroadcastId(state, action) {
            state.id = action.payload;
        },
    }
});

const orderSlice= createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderId(state, action) {
            state.id = action.payload;
        },
    }
});

export const { setNickname, setUsername, setId, setEmail} = userSlice.actions;
export const { setProductId, setProductName, setProductPrice, setProductQuantity } = productSlice.actions;
export const { setBroadcastId } = broadcastSlice.actions;
export const { setOrderId } = orderSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        broadcast: broadcastSlice.reducer,
        order: orderSlice.reducer,
    },
});

export default store;
