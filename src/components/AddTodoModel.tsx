import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { validateTodo } from '../utils/helpers';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todoData: any) => void;
  isSubmitting?: boolean;
}

const AddTodoModal = ({ isOpen, onClose, onAdd, isSubmitting = false }: AddTodoModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string; priority?: string; dueDate?: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateTodo(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await onAdd(formData);
      handleClose();
    } catch (error) {
      // Error is handled by the parent component
      console.error('Failed to add todo:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Enter task description (optional)"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Priority Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('priority', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.priority ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('dueDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dueDate ? 'border-red-300' : 'border-gray-300'
              }`}
              min={new Date().toISOString().split('T')[0]}
              disabled={isSubmitting}
            />
            {errors.dueDate && (
              <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;