import  { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoStats from './TodoStats';
import TodoList from './TodoList';
import AddTodoModal from './AddTodoModel';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const TodoApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    todos,
    stats,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearError,
  } = useTodos();

  const handleAddTodo = async (todoData: any) => {
    await addTodo(todoData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Advanced Todo App</h1>
          <p className="text-gray-600">Organize your tasks with priorities and descriptions</p>
        </div>

        {/* Error Display */}
        <ErrorMessage message={error} onClose={clearError} />

        {/* Statistics */}
        <TodoStats stats={stats} />

        {/* Add Task Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-sm">
          {isLoading ? (
            <LoadingSpinner message="Loading your tasks..." />
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={toggleComplete}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}
        </div>

        {/* Add Task Modal */}
        <AddTodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTodo}
          isSubmitting={isLoading}
        />
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Built with React, Tailwind CSS & Backend API Integration
        </div>
      </div>
    </div>
  );
};

export default TodoApp;