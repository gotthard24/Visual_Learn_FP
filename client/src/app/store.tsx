import { configureStore } from "@reduxjs/toolkit";
import levelReducer from "../features/levelSlice/levelSlice";

export default configureStore({
    reducer: levelReducer
})