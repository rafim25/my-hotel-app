import axios from 'axios';
import { mockBookings, mockPreferences, mockNotificationSettings, mockRooms } from './mockData';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Handle unauthorized - redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('Server error:', error.response.data);
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error');
      return Promise.reject(new Error('Network error. Please try again.'));
    } else {
      // Request setup error
      console.error('Request error:', error.message);
      return Promise.reject(error);
    }
  }
);

const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

export const bookingService = {
  getUserBookings: async () => {
    return retryRequest(async () => {
      // For now, return mock data
      return Promise.resolve({ data: mockBookings });
      // When API is ready:
      // return api.get('/user/bookings');
    });
  },

  downloadInvoice: async (bookingId) => {
    // Mock download for now
    return Promise.resolve(new Blob(['Mock Invoice'], { type: 'application/pdf' }));
    // When API is ready:
    // return api.get(`/bookings/${bookingId}/invoice`, { responseType: 'blob' });
  }
};

export const preferenceService = {
  getUserPreferences: async () => {
    return retryRequest(async () => {
      return Promise.resolve({ data: mockPreferences });
      // return api.get('/user/preferences');
    });
  },

  updatePreferences: async (preferences) => {
    return Promise.resolve({ data: preferences });
    // return api.put('/user/preferences', preferences);
  }
};

export const notificationService = {
  getSettings: async () => {
    return Promise.resolve({ data: mockNotificationSettings });
    // return api.get('/user/notifications');
  },

  updateSettings: async (settings) => {
    return Promise.resolve({ data: settings });
    // return api.put('/user/notifications', settings);
  }
};

export const roomService = {
  getRooms: async () => {
    return Promise.resolve({ data: mockRooms });
    // return api.get('/rooms');
  }
}; 