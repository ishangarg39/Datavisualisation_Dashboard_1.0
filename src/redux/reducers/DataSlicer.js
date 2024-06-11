import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const DataSlicer = createSlice({
    name: 'data',
    initialState,
    reducers: {
        dataFilter: (state, action) => {
            state.value = action.payload;
            // console.log("Data value=", state.value)
        }
    },
})

// Action creators are generated for each case reducer function
export const { dataFilter } = DataSlicer.actions

export default DataSlicer.reducer