import { configureStore } from "@reduxjs/toolkit";
import levelReducer from "../features/levelSlice/levelSlice";

const store = configureStore({
    reducer: {
        levelReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
