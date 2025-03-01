import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CovidDataState } from "../interfaces/interface";

const initialState: CovidDataState = {
  selectedRegion: "Kerala***",
  loading: false,
  covidStat: {
    summary: {
      total: 0,
      confirmedCasesIndian: 0,
      confirmedCasesForeign: 0,
      discharged: 0,
      deaths: 0,
      confirmedButLocationUndefined: 0,
    },
    unofficialSummary: [],
    regional: [],
    lastRefreshed: "",
    lastOriginUpdate: "",
  },
  statHistory: [],
};

export const fetchCovidData = createAsyncThunk(
  "covid/fetchCovidData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "API error"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchCovidStatHistory = createAsyncThunk(
  "covid/fetchCovidDataHistory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(import.meta.env.VITE_STAT_API_URL);
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "API error"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const CovidDataSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    updateSelectedState(state, action) {
      state.selectedRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovidData.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        state.loading = false;
        state.covidStat = action.payload;
      })
      .addCase(fetchCovidStatHistory.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCovidStatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.statHistory = action.payload;
      });
  },
});

export const { updateSelectedState } = CovidDataSlice.actions;

export default CovidDataSlice.reducer;
