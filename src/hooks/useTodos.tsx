import { useState, useEffect } from 'react';
import { todoAPI } from '../services/api';
import { useApi } from './useApi';

export const useTodos = () => {
  const [todos, setTodos] = useState<any[]>     ([]);
  const { isLoading, error, callApi, clearError } = useApi();

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const data = await callApi(todoAPI.getAll);
      setTodos(data || []);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  // Add new todo
  const addTodo = async (todoData: any) => {
    try {
      const newTodo = await callApi(todoAPI.create, todoData);
      setTodos(prev => [newTodo, ...prev as any]);
      return newTodo;
    } catch (err) {
      console.error('Failed to add todo:', err);
      throw err;
    }
  };

  // Update existing todo
  const updateTodo = async (id: string | number, todoData: any) => {
    try {
      const updatedTodo = await callApi(todoAPI.update, id, todoData);
      setTodos(prev => prev.map((todo: any) => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      console.error('Failed to update todo:', err);
      throw err;
    }
  };

  // Delete todo
  const deleteTodo = async (id: string | number) => {
    try {
      await callApi(todoAPI.delete, id);
      setTodos(prev => prev.filter((todo: any) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      throw err;
    }
  };

  // Toggle completion
  const toggleComplete = async (id: string | number) => {
    const todo = todos.find((t: any) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await callApi(todoAPI.toggleComplete, id, !todo.completed);
      setTodos(prev => prev.map((t: any) => 
        t.id === id ? updatedTodo : t
      ));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      throw err;
    }
  };

  // Calculate statistics
  const stats = {
    total: todos.length,
    completed: todos.filter((todo: any) => todo.completed).length,
    pending: todos.filter((todo: any) => !todo.completed).length,
    highPriority: todos.filter((todo: any) => todo.priority === 'high' && !todo.completed).length,
  };

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    stats,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refreshTodos: fetchTodos,
    clearError,
  };
};