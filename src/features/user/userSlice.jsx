import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/helpers";



const initialState = {
     user:null,
    };
    
    const userSlice = createSlice({
        name: "user",
        initialState,

        reducers:{
          updateUser:(state,{payload})=>{
            state.user = payload
          },
        }
      
      
        });

        export const {
         updateUser
        } = userSlice.actions;

      export default  userSlice.reducer;;
    
    