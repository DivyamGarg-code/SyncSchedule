import { createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        isOpen: false
    },
    reducers: {
        togglePopUp: (state, action) => {
            state.isOpen = action.payload;
        },
    }
})

export const { togglePopUp } = popupSlice.actions;
export default popupSlice.reducer;