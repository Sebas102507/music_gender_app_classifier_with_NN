import { configureStore } from "@reduxjs/toolkit";

import resultsReducer from "./reducers/resultsReducer";

export default configureStore({
  reducer: {
    results: resultsReducer,
  },
});
