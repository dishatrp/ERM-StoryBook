import config from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://192.168.0.109:8888/api/v1/user/";

interface initialState {
  file: File | undefined;
  response: any[];
  isLoading: boolean;
}
const initialState: initialState = {
  file: undefined,
  // response: [],
  response: [
    {
      ID: "1",
      USER_EMAIL: "abc123@gmail.com",
      USER_FIRST_NAME: "jhon",
      USER_LAST_NAME: "Doe",
      USER_CONTACT_NUMBER: "1234567890",
      DEPARTMENT_NAME: "Investments",
      RISK_CATEGORY: "Operational",
      OWNER: "Jhon Doe",
      RISK: "Covid",
    },
    {
      ID: "2",
      USER_EMAIL: "abc@gmail.com",
      USER_FIRST_NAME: "jhon",
      USER_LAST_NAME: "Doe",
      USER_CONTACT_NUMBER: "1234567890",
      DEPARTMENT_NAME: "Corporate Development and Strategy",
      RISK_CATEGORY: "Operational",
      OWNER: "Jhon Doe",
      RISK: "Covid",
    },
    {
      ID: "3",
      USER_EMAIL: "abc@gmail.com",
      USER_FIRST_NAME: "jhon",
      USER_LAST_NAME: "Doe",
      USER_CONTACT_NUMBER: "1234567890",
      DEPARTMENT_NAME: "Accounting",
      RISK_CATEGORY: "Compliance",
      OWNER: "Jhon Doe",
      RISK: " Geopolitical",
    },
    {
      ID: "4",
      USER_EMAIL: "abc@gmail.com",
      USER_FIRST_NAME: "jhon",
      USER_LAST_NAME: "Doe",
      USER_CONTACT_NUMBER: "1234567890",
      DEPARTMENT_NAME: "Gas and Petrochem Commercial",
      RISK_CATEGORY: "Operational",
      OWNER: "Jhon Doe",
      RISK: " Geopolitical",
    },
    {
      ID: "5",
      USER_EMAIL: "abc@gmail.com",
      USER_FIRST_NAME: "jhon",
      USER_LAST_NAME: "Doe",
      USER_CONTACT_NUMBER: "1234567890",
      DEPARTMENT_NAME: "Marine and Industrial Products",
      RISK_CATEGORY: "Compliance",
      OWNER: "Jhon Doe",
      RISK: "Covid",
    },
  ],
  isLoading: false,
};

export const viewExcelFile = createAsyncThunk(
  "viewExcelFile",
  async ({ data, onClose }: any, { dispatch }) => {
    dispatch(setIsLoading(true));

    const res = await axios.post(URL + "upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-source-token": `${config.AUTH_TOKEN}`,
      },
    });

    if (res?.data?.status) {
      toast.success(res?.data?.message, {
        onClose,
        autoClose: 500,
      });
    } else {
      toast.success(res?.data?.message);
    }

    dispatch(setIsLoading(false));
  }
);

export const fetchResponse = createAsyncThunk(
  "fetchResponse",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));

    const res = await axios.get(URL + "all-user", {
      headers: {
        "Content-Type": "application/json",
        "x-source-token": `${config.AUTH_TOKEN}`,
      },
    });

    if (res?.data?.status) {
      dispatch(setResponse(res?.data?.data?.users));
    } else {
      toast.success(res?.data?.message);
    }

    dispatch(setIsLoading(false));
  }
);

const ermSlice = createSlice({
  name: "ermSlice",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setFile, setResponse, setIsLoading } = ermSlice.actions;
export const ermSliceReducer = ermSlice.reducer;
