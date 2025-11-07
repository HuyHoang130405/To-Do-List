export const ActivityWidget = () => {
  const activities = [
    { month: "Tháng 1", progress: 66, color: "bg-blue-500" },
    { month: "Tháng 2", progress: 33, color: "bg-purple-500" },
    { month: "Tháng 3", progress: 83, color: "bg-pink-500" },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
      <h3 className="font-semibold text-white mb-4 text-lg flex items-center gap-2">
        Hoạt động gần đây
      </h3>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">{item.month}</span>
              <span className="text-gray-300 font-medium">{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mini summary - chỉ hiện trên tablet+ */}
      <div className="hidden sm:block mt-5 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400">
          Trung bình hoàn thành: <span className="text-green-400 font-medium">61%</span>
        </p>
      </div>
    </div>
  );
};