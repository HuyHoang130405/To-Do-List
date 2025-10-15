export const ActivityWidget = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-md border border-white/10">
      <h3 className="font-semibold mb-4 text-white">📊 Hoạt động</h3>
      <p className="text-sm text-gray-400">Tháng 1</p>
      <div className="w-full h-2 bg-gray-700 rounded mb-2">
        <div className="w-2/3 h-2 bg-blue-500 rounded"></div>
      </div>
      <p className="text-sm text-gray-400">Tháng 2</p>
      <div className="w-full h-2 bg-gray-700 rounded mb-2">
        <div className="w-1/3 h-2 bg-purple-500 rounded"></div>
      </div>
      <p className="text-sm text-gray-400">Tháng 3</p>
      <div className="w-full h-2 bg-gray-700 rounded">
        <div className="w-5/6 h-2 bg-pink-500 rounded"></div>
      </div>
    </div>
  );
};