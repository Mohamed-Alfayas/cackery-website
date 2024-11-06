import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    'product_data' : []
}

const ProductReducer = createSlice({
    name : 'ProductReducer',
    initialState : initialState,
    reducers : {
        setProduct : (state, action) =>{
            return {
                ...state,
                product_data : action.payload
            }
        },
        addProduct : (state, action) =>{
            return {
                ...state,
                product_data : [...state.product_data, action.payload]
            }
        },
        editProduct : (state, action) =>{
            return {
                ...state,
                product_data : [...state.product_data].map(obj => obj.id === action.payload.id ? action.payload : obj)
            }
        },
        deleteProduct : (state, action) =>{
            return {
                ...state,
                product_data : [...state.product_data].filter(obj => obj.id !== action.payload)
            }
        },
    }
});


export const { setProduct, addProduct, editProduct, deleteProduct } = ProductReducer.actions;

export default ProductReducer.reducer;