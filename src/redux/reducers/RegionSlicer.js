import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const RegionSlicer = createSlice({
    name: 'region',
    initialState,
    reducers: {
        regionFilter: (state, action) => {
            state.value = action.payload;
            //  console.log("value=", state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { regionFilter } = RegionSlicer.actions

export default RegionSlicer.reducer