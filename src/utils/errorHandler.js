export class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export const errorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
};

export const handleError = (error, showToast) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    switch (error.code) {
      case errorCodes.UNAUTHORIZED:
        showToast('Please log in to continue', 'error');
        // Redirect to login
        window.location.href = '/login';
        break;
      case errorCodes.FORBIDDEN:
        showToast('You do not have permission to perform this action', 'error');
        break;
      case errorCodes.NOT_FOUND:
        showToast('The requested resource was not found', 'error');
        break;
      case errorCodes.VALIDATION_ERROR:
        showToast(error.message || 'Please check your input', 'error');
        break;
      default:
        showToast('An unexpected error occurred', 'error');
    }
  } else if (error.name === 'NetworkError') {
    showToast('Network error. Please check your connection', 'error');
  } else {
    showToast('An unexpected error occurred', 'error');
  }

  return error;
}; 