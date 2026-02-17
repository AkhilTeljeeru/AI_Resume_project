import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

export default function MatchScoreChart({ candidates }) {
  const getScoreDistribution = () => {
    const distribution = { excellent: 0, good: 0, fair: 0, poor: 0 };
    
    candidates.forEach((c) => {
      const score = c.job_matches?.[0]?.match_score || 0;
      if (score >= 80) distribution.excellent++;
      else if (score >= 60) distribution.good++;
      else if (score >= 40) distribution.fair++;
      else distribution.poor++;
    });
    
    return [
      { name: "Excellent (80%+)", value: distribution.excellent, color: "#10b981" },
      { name: "Good (60-79%)", value: distribution.good, color: "#f59e0b" },
      { name: "Fair (40-59%)", value: distribution.fair, color: "#6366f1" },
      { name: "Poor (<40%)", value: distribution.poor, color: "#e11d48" },
    ].filter(item => item.value > 0);
  };

  const data = getScoreDistribution();

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-500">
        No candidates to display
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-400">{item.name}</span>
            <span className="font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}