import { createSlice } from "@reduxjs/toolkit";

export const statistics = createSlice({
  name: "statistics",
  initialState: {
    statistics: {},
    loading: true,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setStatistics(state, action) {
      state.statistics = action.payload;
    },
  },
});

export const { setLoading, setStatistics } = statistics.actions;
