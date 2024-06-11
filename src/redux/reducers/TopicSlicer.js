import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const TopicSlicer = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        topicFilter: (state, action) => {
            state.value = action.payload;
            //  console.log("value=" + state.value)

        }
    },
})

// Action creators are generated for each case reducer function
export const { topicFilter } = TopicSlicer.actions

export default TopicSlicer.reducer