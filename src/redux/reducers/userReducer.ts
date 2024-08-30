import {createSlice} from '@reduxjs/toolkit';

// Type
import type {PayloadAction} from '@reduxjs/toolkit';

type IntialStateProps = {
  user: any;
  loading: boolean;
  error: any;
};

const initialState: IntialStateProps = {
  user: null,
  loading: false,
  error: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    fetchingUser: state => {
      state.loading = true;
    },
    fetchedUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.user = null;
      state.loading = false;
    },
  },
});

export const {fetchingUser, fetchedUserInfo, fetchError} =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
