// API Configuration
export const API_BASE_URL = 'http://localhost:8080/tasks'; // API URL
// API Configuration
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/tasks'; in case of using .env file

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Priority colors for UI
export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.HIGH]: 'text-red-600 bg-red-100',
  [PRIORITY_LEVELS.MEDIUM]: 'text-yellow-600 bg-yellow-100',
  [PRIORITY_LEVELS.LOW]: 'text-green-600 bg-green-100'
};

// Filter types
export const FILTER_TYPES = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending'
};