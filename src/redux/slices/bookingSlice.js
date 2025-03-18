'use client';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {  // ✅ Added `export`
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  },
  preferences: {
    roomType: 'non-smoking',
    bedSetup: 'large',
    marketingConsent: false
  },
  stayDetails: {
    checkIn: null,
    checkOut: null,
    guests: 1,
    room: null,
    nights: 0
  },
  isEditing: false,
  editingSection: null
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateGuestDetails: (state, action) => {
      state.guestDetails = { ...state.guestDetails, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateStayDetails: (state, action) => {
      state.stayDetails = { ...state.stayDetails, ...action.payload };
    },
    startEditing: (state, action) => {
      state.isEditing = true;
      state.editingSection = action.payload;
    },
    finishEditing: (state) => {
      state.isEditing = false;
      state.editingSection = null;
    },
    resetBooking: () => initialState
  }
});

export const { 
  updateGuestDetails, 
  updatePreferences, 
  updateStayDetails,
  startEditing,
  finishEditing,
  resetBooking 
} = bookingSlice.actions;

export default bookingSlice.reducer;
