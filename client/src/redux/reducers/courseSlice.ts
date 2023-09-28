import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProgramApiResponse } from "../../types/courseType";




interface InitialState {
  course : ProgramApiResponse[] | null,
}

const initialState : InitialState = {
  course : null,
}

const courseSlice = createSlice({
  name : "course",
  initialState,
  reducers : {
    setCourse : (state,action : PayloadAction <{course:ProgramApiResponse[]}>) => {
      state.course = action.payload.course;
    },
  }
})

export const {setCourse } = courseSlice.actions;

export const selectCourse = ( state : RootState) => state.course.course

export const courseReducer = courseSlice.reducer