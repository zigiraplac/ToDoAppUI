import { PRIORITY_COLORS } from './constants';

// Get priority color classes
export const getPriorityColor = (priority: string | number) => {
  return PRIORITY_COLORS[priority] || 'text-gray-600 bg-gray-100';
};

// Format date for display
export const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

// Validate todo data
export const validateTodo = (todo: { title: string; description: string | any[]; }) => {
  const errors: { title?: string; description?: string } = {};
  
  if (!todo.title || !todo.title.trim()) {
    errors.title = 'Title is required';
  }
  
  if (todo.title && todo.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  if (todo.description && todo.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generate unique ID (fallback for client-side)
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};