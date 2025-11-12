import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      className="p-8 rounded-3xl bg-gradient-to-br 
      from-slate-900/80 to-indigo-900/60 shadow-2xl 
      hover:shadow-cyan-400/30 transition-all duration-300 
      border border-cyan-400/10 hover:scale-105"
      whileHover={{ scale: 1.07, rotate: 1 }}
    >
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="mbs:text-xl sm:text-2xl font-bold mb-3 text-cyan-300 drop-shadow">{title}</h3>
      <p className="text-gray-300 text-base">{desc}</p>
    </motion.div>
  );
}