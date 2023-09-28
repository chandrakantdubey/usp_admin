import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { idApi } from "src/api/axiosApi";

const initialState = {
  subscriptions: {
    data: [],
    loading: false,
    error: null,
  },
  subscription: {
    data: null,
    loading: false,
    error: null,
  },
  invoices: {
    data: [],
    loading: false,
    error: null,
  },
  invoice: {
    data: [],
    loading: false,
    error: null,
  },
  customers: {
    data: [],
    loading: false,
    error: null,
  },
  customer: {
    data: [],
    loading: false,
    error: null,
  },
  loginData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: "",
  },
};

export const idLogin = createAsyncThunk(
  "idApi/idLogin",
  async (creadPayload, thunkAPI) => {
    try {
      const response = await idApi.post("auth/login", creadPayload);
      const user_token = response?.data?.data?.user_token;
      localStorage.setItem("authKey", user_token);
      return response?.data;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  "idApi/fetchCustomer",
  async ({ skip, limit, keyword }) => {
    try {
      const key = localStorage.getItem("authKey");
      // console.log(skip, limit);
      const response = await idApi.post(
        "api/users_list",
        {
          skip: skip,
          limit: limit,
          keyword: keyword,
        },
        {
          headers: {
            Authorization: key,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchCustomer = createAsyncThunk(
  "idApi/FetchCustomer",
  async (id) => {
    try {
      const response = await idApi.get("api/user_details", {
        // "azureId": "2a554815-f56a-44d0-bcb1-63ec0975a6ba"
        azureId: id.toString(),
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);

const chargeBeeBillingSlice = createSlice({
  name: "chargeBeeBilling",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.customers.loading = true;
        state.customers.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers.loading = false;
        state.customers.data = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.customers.loading = false;
        state.customers.error = action.error.message;
      })
      .addCase(fetchCustomer.pending, (state) => {
        state.customer.loading = true;
        state.customer.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.customer.loading = false;
        state.customer.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.customer.loading = false;
        state.customer.error = action.error.message;
      })
      .addCase(idLogin.pending, (state) => {
        state.loginData.isLoading = true;
        state.loginData.isError = false;
        state.loginData.isSuccess = false;
        state.loginData.data = null;
        state.loginData.message = "";
      })
      .addCase(idLogin.rejected, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = true;
        state.loginData.isSuccess = false;
        state.loginData.data = null;
        state.loginData.message = action.payload;
      })
      .addCase(idLogin.fulfilled, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = false;
        state.loginData.isSuccess = true;
        state.loginData.data = action.payload?.data;
        state.loginData.message = action.payload?.message;
      });
  },
});

export default chargeBeeBillingSlice.reducer;
