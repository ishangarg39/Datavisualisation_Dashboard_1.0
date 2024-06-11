import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const SectorSlicer = createSlice({
    name: 'sector',
    initialState,
    reducers: {
        sectorFilter: (state, action) => {
            state.value = action.payload;
            //  console.log("value=" + state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { sectorFilter } = SectorSlicer.actions

export default SectorSlicer.reducer