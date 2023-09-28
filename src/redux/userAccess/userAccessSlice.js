import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uspAdminApi } from "src/api/axiosApi";
import {
  UA_ROLES,
  UA_PERMISSIONS,
  UA_SECTION,
} from "src/constants/apiEndpoints";

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
  sections: {
    data: [],
    loading: false,
    error: null,
  },
  section: {
    data: [],
    loading: false,
    error: null,
  },
  permissions: {
    data: [],
    loading: false,
    error: null,
  },
  permission: {
    data: [],
    loading: false,
    error: null,
  },
};

export const fetchRoles = createAsyncThunk(
  "uspAdminApi/fetchRoles",
  async () => {
    try {
      const response = await uspAdminApi.get(UA_ROLES + "/");
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const fetchRole = createAsyncThunk(
  "uspAdminApi/fetchRole",
  async (id) => {
    try {
      const response = await uspAdminApi.get(UA_ROLES + "/", {
        params: { id: id },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchSections = createAsyncThunk(
  "uspAdminApi/fetchSections",
  async () => {
    try {
      const response = await uspAdminApi.get(UA_SECTION + "/");
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const fetchSection = createAsyncThunk(
  "uspAdminApi/fetchSection",
  async (id) => {
    try {
      const response = await uspAdminApi.get(UA_SECTION + "/", {
        params: { id: id },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const fetchPermissions = createAsyncThunk(
  "uspAdminApi/fetchPermissions",
  async () => {
    try {
      const response = await uspAdminApi.get(UA_PERMISSIONS + "/");
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);
export const fetchPermission = createAsyncThunk(
  "uspAdminApi/fetchPermission",
  async (id) => {
    try {
      const response = await uspAdminApi.get(UA_PERMISSIONS + "/", {
        params: { id: id },
      });
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

const userAccessSlice = createSlice({
  name: "userAccess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.roles.loading = true;
        state.roles.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles.loading = false;
        state.roles.data = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.roles.loading = false;
        state.roles.error = action.error.message;
      })
      .addCase(fetchRole.pending, (state) => {
        state.role.loading = true;
        state.role.error = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role.loading = false;
        state.role.data = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.role.loading = false;
        state.role.error = action.error.message;
      })
      .addCase(fetchSections.pending, (state) => {
        state.sections.loading = true;
        state.sections.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sections.loading = false;
        state.sections.data = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.sections.loading = false;
        state.sections.error = action.error.message;
      })
      .addCase(fetchSection.pending, (state) => {
        state.sections.loading = true;
        state.sections.error = null;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.sections.loading = false;
        state.sections.data = action.payload;
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.sections.loading = false;
        state.sections.error = action.error.message;
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.permissions.loading = true;
        state.permissions.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions.loading = false;
        state.permissions.data = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.permissions.loading = false;
        state.permissions.error = action.error.message;
      })
      .addCase(fetchPermission.pending, (state) => {
        state.permission.loading = true;
        state.permission.error = null;
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.permission.loading = false;
        state.permission.data = action.payload;
      })
      .addCase(fetchPermission.rejected, (state, action) => {
        state.permission.loading = false;
        state.permission.error = action.error.message;
      });
  },
});

export default userAccessSlice.reducer;
