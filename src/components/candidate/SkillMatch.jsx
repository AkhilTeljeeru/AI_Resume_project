import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function SkillMatch({ candidateSkills, requiredSkills, preferredSkills }) {
  const normalizeSkill = (skill) => skill?.toLowerCase().trim();
  
  const candidateSkillsNormalized = (candidateSkills || []).map(normalizeSkill);
  
  const matchedRequired = (requiredSkills || []).filter(skill => 
    candidateSkillsNormalized.some(cs => 
      cs?.includes(normalizeSkill(skill)) || normalizeSkill(skill)?.includes(cs)
    )
  );
  
  const missingRequired = (requiredSkills || []).filter(skill => 
    !candidateSkillsNormalized.some(cs => 
      cs?.includes(normalizeSkill(skill)) || normalizeSkill(skill)?.includes(cs)
    )
  );
  
  const matchedPreferred = (preferredSkills || []).filter(skill => 
    candidateSkillsNormalized.some(cs => 
      cs?.includes(normalizeSkill(skill)) || normalizeSkill(skill)?.includes(cs)
    )
  );

  const requiredMatchPercent = requiredSkills?.length 
    ? Math.round((matchedRequired.length / requiredSkills.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Skills Analysis</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-cyan-400">{requiredMatchPercent}%</p>
          <p className="text-xs text-slate-400">Required skills match</p>
        </div>
      </div>

      {requiredSkills?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Required Skills ({matchedRequired.length}/{requiredSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedRequired.map((skill, idx) => (
              <motion.span
                key={`matched-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {skill}
              </motion.span>
            ))}
            {missingRequired.map((skill, idx) => (
              <motion.span
                key={`missing-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (matchedRequired.length + idx) * 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-sm border border-rose-500/30"
              >
                <XCircle className="w-3.5 h-3.5" />
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {preferredSkills?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Preferred Skills ({matchedPreferred.length}/{preferredSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedPreferred.map((skill, idx) => (
              <motion.span
                key={`pref-matched-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {skill}
              </motion.span>
            ))}
            {(preferredSkills || []).filter(s => !matchedPreferred.includes(s)).map((skill, idx) => (
              <span
                key={`pref-missing-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 text-slate-400 rounded-full text-sm border border-slate-600"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {candidateSkills?.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-700">
          <h4 className="text-sm font-medium text-slate-300">All Candidate Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidateSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}