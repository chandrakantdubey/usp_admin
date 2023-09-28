import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DashboardService from "./DashboardService";

const initialState = {
	dashboardData: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {
			analyticsData: null,
		},
		message: "",
	},
};

export const getAnalyticsData = createAsyncThunk(
	"dashboard/analytics",
	async (creadPayload, thunkAPI) => {
		try {
			const response = await DashboardService.getAnayticsData(creadPayload);
			return response?.data;
		} catch (error) {
			const message = JSON.parse(error?.message)?.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		resetDetail: (state) => {
			state.dashboardData.isLoading = false;
			state.dashboardData.isError = false;
			state.dashboardData.isSuccess = false;
			state.dashboardData.data = initialState.dashboardData.data;
			state.dashboardData.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAnalyticsData.pending, (state) => {
				state.dashboardData.isLoading = true;
				state.dashboardData.isError = false;
				state.dashboardData.isSuccess = false;
				state.dashboardData.data.analyticsData = null;
				state.dashboardData.message = "";
			})
			.addCase(getAnalyticsData.rejected, (state, action) => {
				state.dashboardData.isLoading = false;
				state.dashboardData.isError = true;
				state.dashboardData.isSuccess = false;
				state.dashboardData.data.analyticsData = null;
				state.dashboardData.message = action.payload;
			})
			.addCase(getAnalyticsData.fulfilled, (state, action) => {
				state.dashboardData.isLoading = false;
				state.dashboardData.isError = false;
				state.dashboardData.isSuccess = true;
				state.dashboardData.data.analyticsData = action.payload?.data;
				state.dashboardData.message = action.payload?.message;
			});
	},
});

export const { resetDetail } = dashboardSlice.actions;
export default dashboardSlice.reducer;
