import { configureStore } from '@reduxjs/toolkit'
import timetableFilterReducer from "./slices/timetableFilterSlice"
import timeTableDataReducer from './slices/timeTableDataSlice';
import popupSliceReducer from './slices/popupSlice';

const appStore = configureStore({
    reducer: {
        timetableFilter: timetableFilterReducer,
        timetableData: timeTableDataReducer,
        popup: popupSliceReducer
    }
})

export default appStore;