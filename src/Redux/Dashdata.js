import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
    dashboardData:{
    userId : "",
    useraddress : ""
    },
    tokenData:{

    }
}

export const dashdataSlice = createSlice({
  name: 'dashdata',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        state.dashboardData.userId = action.payload.userDetails?.userId
      },
    
  },
})

export const {  setUserDetails } = dashdataSlice.actions

export default dashdataSlice.reducer