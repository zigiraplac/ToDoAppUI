import { API_BASE_URL } from '../utils/constants';

// Base API configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${apiConfig.baseURL}${endpoint}`;
  const config: RequestInit = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Handle empty responses (like DELETE)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// API service functions
export const todoAPI = {
  // Get all todos
  getAll: () => apiCall('/todos'),
  
  // Get single todo by ID
  getById: (id: string | number) => apiCall(`/todos/${id}`),
  
  // Create new todo
  create: (todoData: any) => apiCall('/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  }),
  
  // Update entire todo
  update: (id: string | number, todoData: any) => apiCall(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoData),
  }),
  
  // Partially update todo
  patch: (id: string | number, updates: any) => apiCall(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  }),
  
  // Delete todo
  delete: (id: string | number) => apiCall(`/todos/${id}`, {
    method: 'DELETE',
  }),
  
  // Toggle completion status
  toggleComplete: (id: string | number, completed: boolean) => apiCall(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  }),
};