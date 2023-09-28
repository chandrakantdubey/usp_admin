import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotifications: (state, action) => {
      state.notifications.pop(action.payload);
    },
  },
});

export const { addNotifications, removeNotifications } =
  NotificationsSlice.actions;
export default NotificationsSlice.reducer;
