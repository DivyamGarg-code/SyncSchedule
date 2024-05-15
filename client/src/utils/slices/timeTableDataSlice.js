import { createSlice } from '@reduxjs/toolkit'

const timeTableDataSlice = createSlice({
    name: "timeTableData",
    initialState: {
        classes: [],
        rooms: [],
        teachers: [],
        courses: []

    },
    reducers: {
        addClassesData: (state, action) => {
            state.classes = action.payload;
        },
        addRoomsData: (state, action) => {
            state.rooms = action.payload;
        },
        addCoursesData: (state, action) => {
            state.courses = action.payload;
        },
        addTeachersData: (state, action) => {
            state.teachers = action.payload;
        },
    }
})

export const { addClassesData, addCoursesData, addRoomsData, addTeachersData } = timeTableDataSlice.actions;
export default timeTableDataSlice.reducer;