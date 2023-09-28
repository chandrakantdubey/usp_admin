import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uspAdminApi } from "src/api/axiosApi";
import {
  CB_ADDONS_LIST,
  CB_FAMILY_LIST,
  CB_PRODUCTS_LIST,
  CB_SERVICES_LIST,
  CB_FAMILY,
  CB_SERVICES,
  CB_PRODUCT,
  CB_ADDONS,
} from "src/constants/apiEndpoints";

const initialState = {
  family: {
    data: [],
    loading: false,
    error: null,
  },
  singleFamily: {
    data: null,
    loading: false,
    error: null,
  },
  products: {
    data: [],
    loading: false,
    error: null,
  },
  product: {
    data: [],
    loading: false,
    error: null,
  },
  services: {
    data: [],
    loading: false,
    error: null,
  },
  service: {
    data: [],
    loading: false,
    error: null,
  },
  addons: {
    data: [],
    loading: false,
    error: null,
  },
  addon: {
    data: [],
    loading: false,
    error: null,
  },
};

export const fetchFamily = createAsyncThunk(
  "uspAdminApi/fetchFamily",
  async () => {
    try {
      const response = await uspAdminApi.get(CB_FAMILY_LIST);
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchSingleFamily = createAsyncThunk(
  "uspAdminApi/fetchSingleFamily",
  async (id) => {
    try {
      const response = await uspAdminApi.get(CB_FAMILY + "/", {
        params: {
          id: id,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "uspAdminApi/fetchProducts",
  async () => {
    try {
      const response = await uspAdminApi.post(CB_PRODUCTS_LIST, {
        id: "Products-2",
        status: "active",
      });
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "uspAdminApi/fetchProduct",
  async (id) => {
    try {
      const response = await uspAdminApi.get(CB_PRODUCT, {
        params: {
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchServices = createAsyncThunk(
  "uspAdminApi/fetchServices",
  async () => {
    try {
      const response = await uspAdminApi.post(CB_SERVICES_LIST, {
        id: "services-family",
        status: "active",
      });
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const fetchService = createAsyncThunk(
  "uspAdminApi/fetchService",
  async (id) => {
    try {
      const response = await uspAdminApi.get(CB_SERVICES, {
        params: {
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchAddons = createAsyncThunk(
  "uspAdminApi/fetchAddons",
  async () => {
    try {
      const response = await uspAdminApi.post(CB_ADDONS_LIST, {
        status: "active",
      });
      return response.data.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const fetchAddon = createAsyncThunk(
  "uspAdminApi/fetchAddon",
  async (id) => {
    try {
      const response = await uspAdminApi.get(CB_ADDONS, {
        params: {
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

const chargeBeeSlice = createSlice({
  name: "chargeBee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamily.pending, (state) => {
        state.family.loading = true;
        state.family.error = null;
      })
      .addCase(fetchFamily.fulfilled, (state, action) => {
        state.family.loading = false;
        state.family.data = action.payload;
      })
      .addCase(fetchFamily.rejected, (state, action) => {
        state.family.loading = false;
        state.family.error = action.error.message;
      })
      .addCase(fetchSingleFamily.pending, (state) => {
        state.family.loading = true;
        state.family.error = null;
      })
      .addCase(fetchSingleFamily.fulfilled, (state, action) => {
        state.family.loading = false;
        state.family.data = action.payload;
      })
      .addCase(fetchSingleFamily.rejected, (state, action) => {
        state.family.loading = false;
        state.family.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.products.loading = true;
        state.products.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.loading = false;
        state.products.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products.loading = false;
        state.products.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.product.loading = true;
        state.product.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product.loading = false;
        state.product.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.product.loading = false;
        state.product.error = action.error.message;
      })
      .addCase(fetchServices.pending, (state) => {
        state.services.loading = true;
        state.services.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services.loading = false;
        state.services.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.services.loading = false;
        state.services.error = action.error.message;
      })
      .addCase(fetchService.pending, (state) => {
        state.service.loading = true;
        state.service.error = null;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.service.loading = false;
        state.service.data = action.payload;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.service.loading = false;
        state.service.error = action.error.message;
      })
      .addCase(fetchAddons.pending, (state) => {
        state.addons.loading = true;
        state.addons.error = null;
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.addons.loading = false;
        state.addons.data = action.payload;
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.addons.loading = false;
        state.addons.error = action.error.message;
      })
      .addCase(fetchAddon.pending, (state) => {
        state.addon.loading = true;
        state.addon.error = null;
      })
      .addCase(fetchAddon.fulfilled, (state, action) => {
        state.addon.loading = false;
        state.addon.data = action.payload;
      })
      .addCase(fetchAddon.rejected, (state, action) => {
        state.addon.loading = false;
        state.addon.error = action.error.message;
      });
  },
});

export default chargeBeeSlice.reducer;
