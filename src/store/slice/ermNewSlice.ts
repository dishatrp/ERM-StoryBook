import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  parsedData: any[];
  controlData: any[];
}
const initialState: initialState = {
  parsedData: [],
  controlData: []
};

const ermNewSlice = createSlice({
  name: "ermNewSlice",
  initialState,
  reducers: {
    setParsedData: (state, action) => {
      if (action.payload.type === "RESET") {
        state.parsedData = action.payload.data;
      }
      if (action.payload.type === "APPEND") {
        state.parsedData = [...state.parsedData, ...action.payload.data];
      }
    },
    setControlData: (state, action) => {
      if (action.payload.type === "RESET") {
        state.controlData = action.payload.data;
      }
      if (action.payload.type === "APPEND") {
        state.controlData = [...state.controlData, ...action.payload.data];
      }
    },
  },
});

export const { setParsedData } = ermNewSlice.actions;
export const ermNewSliceReducer = ermNewSlice.reducer;
