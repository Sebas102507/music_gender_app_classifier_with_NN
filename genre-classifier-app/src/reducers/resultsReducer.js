import { createSlice } from "@reduxjs/toolkit";

import classifierService from "../services/api/classifier";

const resultsSlice = createSlice({
  name: "results",
  initialState: [],
  reducers: {
    setResults(_state, action) {
      return action.payload;
    },
    appendResult(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setResults, appendResult } = resultsSlice.actions;

export const fetchResults = () => async (dispatch) => {
  const results = await classifierService.getResults();
  dispatch(setResults(results));
};

export const addResult = (data) => async (dispatch) => {
  return classifierService.predict(data).then((result) => {
    dispatch(appendResult(result));
    return result;
  });
};

export default resultsSlice.reducer;
