import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eye, FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const statusColors = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  screening: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  interviewed: "bg-violet-50 text-violet-700 border-violet-200",
  hired: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-slate-50 text-slate-500 border-slate-200",
};

export default function CandidateRow({ candidate, jobTitle, onStatusChange, delay = 0 }) {
  const matchScore = candidate.job_matches?.[0]?.match_score || 0;
  
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50";
    if (score >= 60) return "text-amber-600 bg-amber-50";
    return "text-rose-600 bg-rose-50";
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="group hover:bg-slate-700/30 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-cyan-500/20">
            {candidate.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-medium text-white">{candidate.name}</p>
            <p className="text-sm text-slate-400">{candidate.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {candidate.skills?.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-300 rounded-full"
            >
              {skill}
            </span>
          ))}
          {candidate.skills?.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-500 rounded-full">
              +{candidate.skills.length - 4}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg font-semibold text-sm ${getScoreColor(matchScore)}`}>
          {matchScore}%
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant="outline" className={`${statusColors[candidate.status]} border`}>
          {candidate.status?.replace("_", " ")}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm text-slate-400">
        {candidate.experience_years ? `${candidate.experience_years} years` : "-"}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={createPageUrl("CandidateDetail") + `?id=${candidate.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          {candidate.resume_url && (
            <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <FileText className="w-4 h-4" />
              </Button>
            </a>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(candidate.id, "shortlisted")}>
                Shortlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(candidate.id, "interviewed")}>
                Mark Interviewed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(candidate.id, "hired")}>
                Mark Hired
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(candidate.id, "rejected")} className="text-rose-600">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </motion.tr>
  );
}