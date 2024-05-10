import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';

const rootReducer = combineReducers({
  test: testReducer,
});

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
