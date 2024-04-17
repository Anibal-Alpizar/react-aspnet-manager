import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../slice/theme/theme";

const rootReducer = combineReducers({
  theme: themeSlice,
});

export { rootReducer };
