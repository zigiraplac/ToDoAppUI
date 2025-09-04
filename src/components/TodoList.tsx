import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete, onUpdate, onDelete }: { todos: any[], onToggleComplete: (id: string | number) => void, onUpdate: (id: string | number, todoData: any) => void, onDelete: (id: string | number) => void }) => {
  if (todos.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Click "Add New Task" to create your first task!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {todos.map((todo: any ) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;