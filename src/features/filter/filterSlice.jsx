import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import customFetch from "../../utils/axios";
import Filters from "./../../components/Filters";

const initialState = {
  filtered_products: [],
  all_products: [],
  filter_isLoading: false,
  filter_error: false,
  grid_view: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping:false,
  },
};

export const fetch_Filter_Products = createAsyncThunk(
  "filter/products",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/react-store-products", {});
      return resp.data;
    } catch (error) {
      console.log(error);
      const message =
        error.response.data ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setGridView: (state) => {
      state.grid_view = true;
    },

    setListView: (state) => {
      state.grid_view = false;
    },

    //   handleChange:(state, action) =>{
    //     const {payload:{name,value}} = action
    //     // console.log(value)
    //     state[name]=value;
    // },



    handleChange: (state, action) => {
      const {
        payload: { name, value },
      } = action;
      // console.log(name,value);
      state[name] = value;
    },

    handleFilter: (state, action) => {
      const {
        payload: { name, value },
      } = action;
      return { ...state, filters: { ...state.filters, [name]: value } };
    },

filterProducts:(state,action) =>{
  let tempProducts = [...state.all_products]
  const {text,category,company,color,price,shipping} = state.filters
  //filtering 
  //
  if(text){
    tempProducts = tempProducts.filter((product)=>{
       return product.name.toLowerCase().startsWith(text)
    })
  }

  //category
  if(category !=='all'){
    tempProducts = tempProducts.filter((product)=>product.category === category)
  }

  // company
  if(company !=='all'){
    tempProducts = tempProducts.filter((product)=>product.company === company)
  }

  //colors
  if(color !=='all'){
     tempProducts = tempProducts.filter((product)=>{
      return product.colors.find((c) => c === color)
     })
  }

  //price

  
tempProducts = tempProducts.filter((product)=> product.price <= price)
  //shipping 
  if(shipping){
    tempProducts = tempProducts.filter((product) => product.shipping === true)
  }

  // return {...state, filterProducts: tempProducts}
   state.filtered_products = tempProducts
  
},

    sortProduct: (state, action) => {
      let tempProducts = state.filtered_products;
      if (state.sort == "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        state.filtered_products = tempProducts;
      }

      if (state.sort == "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        state.filtered_products = tempProducts;
      }

      if (state.sort == "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        state.filtered_products = tempProducts;
      }

      if (state.sort == "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        state.filtered_products = tempProducts;
      }
    },

    // updateFilters:(state,action)=>{

    // },

    clearFilters:(state,action)=>{
       return{
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price:state.filters.max_price,
          shipping:false,
        },
       }
    }
  },

  extraReducers: {
    [fetch_Filter_Products.pending]: (state) => {
      state.isLoading = true;
    },
    [fetch_Filter_Products.fulfilled]: (state, { payload }) => {
      let maxPrice = payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      // console.log(maxPrice)
      state.filter_isLoading = false;
      state.filter_error = false;
      state.all_products = payload;
      state.filtered_products = payload;
      state.filters = {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      };
    },

    [fetch_Filter_Products.rejected]: (state, { payload }) => {
      state.filter_isLoading = false;
      state.filter_error = true;
     
    },
  },
});
export const {
  setGridView,
  setListView,
  handleChange,
  sortProduct,
  updateFilters,
  clearFilters,
  handleFilter,
  filterProducts
} = filterSlice.actions;
export default filterSlice.reducer;
