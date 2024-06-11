import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const CitySlicer = createSlice({
  name: 'city',
  initialState,
  reducers: {
    cityFilter: (state, action) => {
      state.value = action.payload;
      //console.log("value=" + state.value)
    }
  },
})

// Action creators are generated for each case reducer function
export const { cityFilter } = CitySlicer.actions

export default CitySlicer.reducer