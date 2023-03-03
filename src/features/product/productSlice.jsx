import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customFetch from "../../utils/axios";


const initialState = {
    isLoading:false,
    isSidebarOpen:true,
    featured_products:[],
    products:[],
    product_error:false,
    single_product_loading:false,
    single_product_error:false,
    single_product:[],

}

export const fetchProducts = createAsyncThunk(
    'get/products',
    async(_,thunkAPI) =>{
      try {
         const resp  = await customFetch.get('/react-store-products',{
          })
          return resp.data
      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );

   export const fetchSingleProduct = createAsyncThunk('get/single/product',
   async(id,thunkAPI) =>{
    try {
    
      const resp = await customFetch.get(`/react-store-single-product?id=${id}`)
    console.log(resp.data)
    return resp.data
    } catch (error) {
      console.log(error);
        const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
    
   }
   
   )








const productSlice  = createSlice({
    name:'product',
    initialState,
    reducers:{
        openSidebar:(state) =>{
           
            state.isSidebarOpen = true;
        },

        closeSidebar:(state) =>{
           
            state.isSidebarOpen = false;
        }
    },
    
    extraReducers:{
      [fetchProducts.pending]:(state)=>{
        state.isLoading = true
      },
      [fetchProducts.fulfilled]:(state,{payload})=>{
        state.isLoading = false;
        state.product_error = false;
        state.products = payload;
        state.featured_products = payload.filter((product)=> product.featured === true
        )

      },

      [fetchProducts.rejected]:(state,{payload})=>{
        state.isLoading = false
        state.product_error = true
        console.log(payload.error)
      },


      [fetchSingleProduct.pending]:(state)=>{
      
        state.isLoading = true
      },

      [fetchSingleProduct.fulfilled]:(state,{payload})=>{
        state.single_product_loading = false;
        state.single_product = payload;
      },

      [fetchSingleProduct.rejected]:(state,{payload})=>{
        state.single_product_loading = false;
        state.single_product_error =true;
        console.log(payload.error)
      },
    }
    
})

export const {openSidebar,closeSidebar} = productSlice.actions

export default productSlice.reducer;