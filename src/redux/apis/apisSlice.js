import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uspAdminApi } from "src/api/axiosApi";
import { API_ROLES } from "src/constants/apiEndpoints";

const initialState = {
  roles: {
    data: [],
    loading: false,
    error: null,
  },
  role: {
    data: [],
    loading: false,
    error: null,
  },
};

export const fetchApis = createAsyncThunk("uspAdminApi/fetchApis", async () => {
  try {
    const response = await uspAdminApi.get(API_ROLES);
    return response.data;
  } catch (error) {
    throw error.message;
  }
});

export const fetchApi = createAsyncThunk("uspAdminApi/fetchApi", async (id) => {
  try {
    const response = await uspAdminApi.get(API_ROLES, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
});

const apisSlice = createSlice({
  name: "apis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApis.pending, (state) => {
        state.roles.loading = true;
        state.roles.error = null;
      })
      .addCase(fetchApis.fulfilled, (state, action) => {
        state.roles.loading = false;
        state.roles.data = action.payload;
      })
      .addCase(fetchApis.rejected, (state, action) => {
        state.roles.loading = false;
        state.roles.error = action.error.message;
      })
      .addCase(fetchApi.pending, (state) => {
        state.role.loading = true;
        state.role.error = null;
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.role.loading = false;
        state.role.data = action.payload;
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.role.loading = false;
        state.role.error = action.error.message;
      });
  },
});

export default apisSlice.reducer;
