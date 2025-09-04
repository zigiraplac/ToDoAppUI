import { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar } from 'lucide-react';
import { getPriorityColor, formatDate } from '../utils/helpers';

const TodoItem = ({ todo, onToggleComplete, onUpdate, onDelete }: { todo: any, onToggleComplete: (id: string | number) => void, onUpdate: (id: string | number, todoData: any) => void, onDelete: (id: string | number) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    });
  };

  const handleSave = () => {
    if (!editValue.title.trim()) return;
    
    onUpdate(todo.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    });
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start gap-4">
        
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-colors duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-3">
              <input
                type="text"
                value={editValue.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
              />
              <textarea
                value={editValue.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditValue(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                placeholder="Description (optional)"
              />
              <select
                value={editValue.priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditValue(prev => ({ ...prev, priority: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          ) : (
            // View Mode
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}>
                  {todo.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </span>
              </div>
              
              {todo.description && (
                <p className={`text-sm mb-2 ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
              
              {todo.dueDate && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>Due: {formatDate(todo.dueDate)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                title="Save changes"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Cancel editing"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Edit task"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;