const TodoStats = ({ stats }: { stats: { total: number, completed: number, pending: number, highPriority: number } }) => {
  const { total, completed, pending, highPriority } = stats;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600">Total Tasks</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-orange-600">{pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-red-600">{highPriority}</div>
        <div className="text-sm text-gray-600">High Priority</div>
      </div>
    </div>
  );
};

export default TodoStats;