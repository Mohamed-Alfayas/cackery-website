import { combineReducers } from "redux";
import ProductReducer from "../ChildReducer/ProductReducer";

export const MainReducer = combineReducers({
    ProductReducer : ProductReducer
})