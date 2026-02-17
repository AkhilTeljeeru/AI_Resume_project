import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Briefcase,
  Clock,
  Users,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

/* ---------------- COLOR MAPS ---------------- */

const statusColors = {
  draft: "bg-slate-700 text-slate-300 border-slate-600",
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  paused: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  closed: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const typeColors = {
  "full-time": "bg-blue-500/20 text-blue-400",
  "part-time": "bg-purple-500/20 text-purple-400",
  contract: "bg-orange-500/20 text-orange-400",
  internship: "bg-teal-500/20 text-teal-400",
};

/* ---------------- COMPONENT ---------------- */

export default function JobCard({
  job,
  candidateCount,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={() => onSelect?.(job)}
      className={`
        bg-slate-800/50 rounded-2xl p-6 border transition-all cursor-pointer backdrop-blur-sm
        ${
          isSelected
            ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
            : "border-slate-700/50 hover:border-slate-600 hover:shadow-lg hover:shadow-cyan-500/5"
        }
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {job?.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
            {job?.department && (
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
            )}

            {job?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
            )}
          </div>
        </div>

        {/* ACTION MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(job);
              }}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(job?.id);
              }}
              className="text-rose-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= BADGES ================= */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.status && (
          <Badge
            variant="outline"
            className={statusColors?.[job.status] || ""}
          >
            {job.status}
          </Badge>
        )}

        {job?.type && (
          <Badge className={typeColors?.[job.type] || ""}>
            {job.type.replace("-", " ")}
          </Badge>
        )}

        {job?.min_experience && (
          <Badge
            variant="outline"
            className="bg-slate-700 text-slate-300 border-slate-600"
          >
            <Clock className="w-3 h-3 mr-1" />
            {job.min_experience}+ years
          </Badge>
        )}
      </div>

      {/* ================= SKILLS ================= */}
      {job?.required_skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.required_skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full"
            >
              {skill}
            </span>
          ))}

          {job.required_skills.length > 5 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-400 rounded-full">
              +{job.required_skills.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <Users className="w-4 h-4" />
          <span>{candidateCount || 0} candidates</span>
        </div>

        {job?.salary_range && (
          <span className="text-sm font-medium text-cyan-400">
            {job.salary_range}
          </span>
        )}
      </div>
    </motion.div>
  );
}
