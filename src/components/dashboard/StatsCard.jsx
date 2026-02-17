import { motion } from "framer-motion";

export default function StatsCard({ title, value, subtitle, icon: Icon, color, delay = 0 }) {
  const colorClasses = {
    indigo: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    rose: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    violet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 shadow-sm hover:shadow-lg hover:shadow-cyan-500/5 transition-all backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl border ${colorClasses[color] || colorClasses.indigo}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}