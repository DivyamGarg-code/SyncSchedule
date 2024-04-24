import { configureStore } from '@reduxjs/toolkit'
import timetableFilterReducer from "./slices/timetableFilterSlice"
import popupSliceReducer from './slices/popupSlice';

const appStore = configureStore({
    reducer: {
        timetableFilter: timetableFilterReducer,
        popup: popupSliceReducer
    }
})

export default appStore;