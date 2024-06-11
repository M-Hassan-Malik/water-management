import type { Action, Store, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // Add more reducers for other modules
});

const store: Store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
