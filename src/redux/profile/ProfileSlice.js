import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ProfileService from "./ProfileService";

const initialState = {
	profileData: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {
			first_name: null,
			last_name: null,
			user_name: null,
			user_role: null,
			role : null
		},
		message: "",
	},
};

export const getProfile = createAsyncThunk(
	"profile/detail",
	async (id, thunkAPI) => {
		try {
			const response = await ProfileService.getProfile();
			return response?.data;
		} catch (error) {
			const message = JSON.parse(error?.message)?.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		resetDetail: (state) => {
			state.profileData.isLoading = false;
			state.profileData.isError = false;
			state.profileData.isSuccess = false;
			state.profileData.data = initialState.profileData.data;
			state.profileData.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProfile.pending, (state) => {
				state.profileData.isLoading = true;
				state.profileData.isError = false;
				state.profileData.isSuccess = false;
				state.profileData.data =  initialState.profileData.data;
				state.profileData.message = "";
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.profileData.isLoading = false;
				state.profileData.isError = true;
				state.profileData.isSuccess = false;
				state.profileData.data =  initialState.profileData.data;
				state.profileData.message = action.payload;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.profileData.isLoading = false;
				state.profileData.isError = false;
				state.profileData.isSuccess = true;
				state.profileData.data = action.payload?.data;
				state.profileData.message = action.payload?.message;
			});
	},
});

export const { resetDetail } = profileSlice.actions;
export default profileSlice.reducer;
