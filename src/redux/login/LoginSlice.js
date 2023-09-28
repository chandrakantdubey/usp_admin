import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import LoginService from './LoginService';

const initialState = {
  loginData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: '',
  },
};

export const loginWithCread = createAsyncThunk(
  'login/detail',
  async (creadPayload, thunkAPI) => {
    try {
      const response = await LoginService.loginWithCred(creadPayload);
      return response?.data;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.loginData.isLoading = false;
      state.loginData.isError = false;
      state.loginData.isSuccess = false;
      state.loginData.data = null;
      state.loginData.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithCread.pending, (state) => {
        state.loginData.isLoading = true;
        state.loginData.isError = false;
        state.loginData.isSuccess = false;
        state.loginData.data = null;
        state.loginData.message = '';
      })
      .addCase(loginWithCread.rejected, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = true;
        state.loginData.isSuccess = false;
        state.loginData.data = null;
        state.loginData.message = action.payload;
      })
      .addCase(loginWithCread.fulfilled, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = false;
        state.loginData.isSuccess = true;
        state.loginData.data = action.payload?.data;
        state.loginData.message = action.payload?.message;
      });
  },
});

export const { resetDetail } = loginSlice.actions;
export default loginSlice.reducer;
