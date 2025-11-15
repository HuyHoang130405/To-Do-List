// import { Task } from "@/types/task";

// export const ActivityWidget = ({ tasks }: { tasks: Task[] }) => {
//   // mảng 12 tháng mặc định
//   const months = Array.from({ length: 12 }, (_, i) => ({
//     month: `Tháng ${i + 1}`,
//     total: 0,
//     done: 0,
//   }));

//   // đếm theo tháng
//   tasks.forEach((task) => {
//     if (!task.createdAt) return; // nếu thiếu createdAt thì skip

//     const date = new Date(task.createdAt);
//     const m = date.getMonth(); // 0–11

//     months[m].total += 1;

//     const allSubtaskDone =
//       task.subtasks.length > 0 &&
//       task.subtasks.every((s) => s.done);

//     if (allSubtaskDone) {
//       months[m].done += 1;
//     }
//   });

//   // tính phần trăm
//   const data = months.map((m) => ({
//     month: m.month,
//     progress: m.total === 0 ? 0 : Math.round((m.done / m.total) * 100),
//     color: "bg-blue-500",
//   }));

//   // tính trung bình
//   const avg =
//     data.reduce((acc, cur) => acc + cur.progress, 0) / data.length || 0;

//   return (
//     <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
//       <h3 className="font-semibold text-white mb-4 text-lg">
//         Hoạt động gần đây
//       </h3>

//       <div className="space-y-4">
//         {data.map((item, index) => (
//           <div key={index} className="flex flex-col gap-1.5">
//             <div className="flex justify-between items-center text-xs">
//               <span className="text-gray-400">{item.month}</span>
//               <span className="text-gray-300 font-medium">
//                 {item.progress}%
//               </span>
//             </div>
//             <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
//               <div
//                 className={`h-full ${item.color} rounded-full transition-all duration-700 ease-out`}
//                 style={{ width: `${item.progress}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="hidden sm:block mt-5 pt-4 border-t border-white/10">
//         <p className="text-xs text-gray-400">
//           Trung bình hoàn thành:{" "}
//           <span className="text-green-400 font-medium">
//             {Math.round(avg)}%
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };
