import { createSlice } from '@reduxjs/toolkit'

const timetableFilterSlice = createSlice({
    name: "timetableFilter",
    initialState: {
        courseCode: [],
        teacherName: [],
        department: [],
        batch: [],
        year: [],
        semester: [],
        courseType: [],
        courseName: []
    },
    reducers: {
        setCourseCode: (state, action) => {
            state.courseCode = action.payload;
        },
        setTeacherName: (state, action) => {
            state.teacherName = action.payload;
        },
        setDepartment: (state, action) => {
            state.department = action.payload;
        },
        setBatch: (state, action) => {
            state.batch = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setSemester: (state, action) => {
            state.semester = action.payload;
        },
        setCourseType: (state, action) => {
            state.courseType = action.payload;
        },
        setCourseName: (state, action) => {
            state.courseName = action.payload;
        },
        clearFilters:(state)=>{
            state.courseCode = [];
            state.teacherName = [];
            state.department = [];
            state.batch = [];
            state.year = [];
            state.semester = [];
            state.courseType = [];
            state.courseName = [];
        }
    }
});

export const { setCourseCode, setBatch, setCourseName, setCourseType, setDepartment, setSemester, setTeacherName, setYear,clearFilters } = timetableFilterSlice.actions;
export default timetableFilterSlice.reducer;