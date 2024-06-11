import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const CountrySlicer = createSlice({
    name: 'country',
    initialState,
    reducers: {
        countryFilter: (state, action) => {
            state.value = action.payload;
            //  console.log("value=" + state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { countryFilter } = CountrySlicer.actions

export default CountrySlicer.reducer