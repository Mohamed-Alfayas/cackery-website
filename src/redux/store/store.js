import { configureStore } from "@reduxjs/toolkit";
import { MainReducer } from "../reducers/ParentReducer/MainReducer";

const store = configureStore({
    reducer : MainReducer
});

export default store;