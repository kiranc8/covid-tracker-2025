import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CovidDataState } from "../interfaces/interface";

const initialState: CovidDataState = {
  selectedRegion: "Kerala",
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
};

export const fetchCovidData = createAsyncThunk(
  "covid/fetchCovidData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://api.rootnet.in/covid19-in/stats/latest"
      );
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
      });
  },
});

export const { updateSelectedState } = CovidDataSlice.actions;

export default CovidDataSlice.reducer;
