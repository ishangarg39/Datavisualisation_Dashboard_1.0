import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const EndYearSlicer = createSlice({
    name: 'endYear',
    initialState,
    reducers: {
        endYearFilter: (state, action) => {
            state.value = action.payload;
            // console.log("value=", state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { endYearFilter } = EndYearSlicer.actions

export default EndYearSlicer.reducer