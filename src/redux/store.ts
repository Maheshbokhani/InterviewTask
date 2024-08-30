import {configureStore} from '@reduxjs/toolkit';

// Reducer
import userInfo from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    userInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
