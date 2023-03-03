import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import customFetch from "../../utils/axios";
import { getLocalStorage } from "../../utils/helpers";

const initialState = {
  cart:getLocalStorage(),
   total_items:0,
   total_amount:0,
   shipping_fee:534
  };
  

  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
  
    reducers:{
        addCart:(state,{payload})=>{
            const {id,mainColor,amount,single_product} = payload;
            const tempItem = state.cart.find((i) => i.id === id + mainColor)
            if(tempItem){
                 const tempCart = state.cart.map((cartItem)=>{
                    if(tempItem.id === id + mainColor){
                         let newAmount = cartItem.amount + amount;
                         //check for stock
                         if(newAmount > cartItem.max){
                           newAmount = cartItem.max
                         }

                        return {...cartItem, amount:newAmount} 
                    }else{
                       return cartItem
                    }
                 })
                 state.cart = tempCart
            }else{
                const newItem = {
                  id:id + mainColor,
                  name:single_product.name,
                  mainColor,
                  amount,
                  image:single_product.images[0].url,
                  price:single_product.price,
                  max:single_product.stock,
                }

                return {...state,cart:[...state.cart,newItem]}
            }
        },

        //remove item from cart 
        //payload is id
        removeItem:(state,{payload})=>{
          const  {id} = payload
          const tempCart = state.cart.filter((item)=>item.id !== id)
          state.cart = tempCart
        },
        
        //toggle amount
        //id and value is payload
        toggleAmount:(state,{payload})=>{
          console.log(payload);
          const {id,value} = payload;
          const tempCart = state.cart.map((item)=>{
            if(item.id === id){
              if(value === 'inc'){
                
                let newAmount = item.amount + 1
                if(newAmount > item.max){
                  newAmount = item.max
                }
                return {...item, amount:newAmount}
              }
              if(value === 'dec'){
                let newAmount = item.amount - 1
                if(newAmount < 1){
                  newAmount =  1
                }
                return {...item, amount:newAmount}
              }
            }else{
              return item
            }
          })
          state.cart = tempCart
        },

        //clear cart
        clearCart:(state,{payload})=>{
           state.cart = [];
           state.total_items=0;
           state.total_amount=0
        },

        countCartTotals:(state)=>{
          const {total_items,total_amount} = state.cart.reduce((total,cartItem)=>{
          const {amount,price} = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total
          },{
            total_items:0,total_amount:0
          })
          return {...state,total_items,total_amount}
        }
        
    }
  });

 

  export const {
    addCart,
    removeItem,
    toggleAmount,
    clearCart,
    countCartTotals,
  } = cartSlice.actions;
  export default cartSlice.reducer;