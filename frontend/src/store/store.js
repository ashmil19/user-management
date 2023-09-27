import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import adminSlice from "../features/admin/adminSlice"

const persitConfig = {
    key: 'persist-store',
    storage
}

const persistedReducer = persistReducer(persitConfig, authSlice)

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        admin: adminSlice
    }
})


export const persistor = persistStore(store)