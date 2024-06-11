import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const SourceSlicer = createSlice({
    name: 'source',
    initialState,
    reducers: {
        sourceFilter: (state, action) => {
            state.value = action.payload;
            //  console.log("value=" + state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { sourceFilter } = SourceSlicer.actions

export default SourceSlicer.reducer