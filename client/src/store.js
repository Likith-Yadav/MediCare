import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import appointmentReducer from './features/appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
  },
});

export default store; 