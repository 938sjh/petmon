import {configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지를 사용할 경우

import {usersApi} from "./api/user";
import { productApi } from "./api/product";
import userReducer from './modules/user';
import productReducer from './modules/product';

const persistConfig = {
    key: "root", // 저장되는 키 이름
    storage, // 사용할 스토리지, 여기서는 로컬 스토리지를 사용합니다.
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
        product: productReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(usersApi.middleware, productApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export default store;