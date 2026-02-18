import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Download,
  FileText,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJobId, setSelectedJobId] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  const queryClient = useQueryClient();

  // ✅ GET CANDIDATES
  const { data: candidates = [], isLoading: loadingCandidates } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => apiClient.getCandidates(),
  });

  // ✅ GET JOBS
  const { data: jobs = [], isLoading: loadingJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiClient.getJobs(),
  });

  // ✅ UPDATE STATUS
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {id: number, status: string}>} */
  const updateCandidateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      if (!id) throw new Error("Candidate id is required");
      return apiClient.updateCandidate(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });

  // ✅ FILTER + SORT
const filteredCandidates = candidates
  .filter((c) => {
    const name = c?.name?.toLowerCase() || "";
    const email = c?.email?.toLowerCase() || "";
    const skillsArray = Array.isArray(c?.skills) ? c.skills : [];

    const matchesSearch =
      !searchTerm ||
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      skillsArray.some((s) =>
        s?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || c?.status === statusFilter;

    const matchesJob =
      selectedJobId === "all" ||
      c?.job_matches?.some(
        (m) => Number(m?.job_id) === Number(selectedJobId)
      );

    return matchesSearch && matchesStatus && matchesJob;
  })
  .sort((a, b) => {
    if (sortBy === "score") {
      return (
        (b?.job_matches?.[0]?.match_score || 0) -
        (a?.job_matches?.[0]?.match_score || 0)
      );
    }

    if (sortBy === "date") {
      const timeA = a?.created_date ? Date.parse(a.created_date) : 0;
      const timeB = b?.created_date ? Date.parse(b.created_date) : 0;
      return timeB - timeA;
    }

    if (sortBy === "name") {
      return (a?.name || "").localeCompare(b?.name || "");
    }

    return 0;
  });


  // ✅ STATS
  const stats = {
    totalCandidates: candidates.length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    activeJobs: jobs.filter((j) => j.status === "active").length,
    avgScore:
      candidates.length > 0
        ? Math.round(
            candidates.reduce(
              (sum, c) => sum + (c.job_matches?.[0]?.match_score || 0),
              0
            ) / candidates.length
          )
        : 0,
  };

  // ✅ EXPORT CSV
const exportToCSV = () => {
  if (!candidates?.length) return;

  const headers = ["Name", "Email", "Skills"];

  const rows = candidates.map((c) => [
    c.name || "",
    c.email || "",
    (c.skills || []).join(", "),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "candidates.csv";
  link.click();

  URL.revokeObjectURL(url);
};

  if (loadingCandidates || loadingJobs) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-400">Candidate Management & Analytics</p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Stats Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Candidates</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalCandidates}</p>
                <p className="text-sm text-slate-500 mt-1">Total registered</p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Stats Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Shortlisted</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.shortlisted}</p>
                <p className="text-sm text-slate-500 mt-1">Moving forward</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Stats Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Active Jobs</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.activeJobs}</p>
                <p className="text-sm text-slate-500 mt-1">Open positions</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Stats Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Avg Score</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.avgScore}%</p>
                <p className="text-sm text-slate-500 mt-1">Match average</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-slate-400">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400">Job</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={String(job.id)}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="score">Match Score</option>
                <option value="date">Date Added</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          {filteredCandidates.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No candidates found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50">
                  <tr className="bg-slate-900/50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Skills</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Match Score</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Resume</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Recommended Jobs</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-slate-700/50 hover:bg-slate-900/30 transition"
                    >
                      <td className="px-6 py-4 text-sm">{candidate.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{candidate.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {candidate.skills?.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                              title={skill}
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills?.length > 3 && (
                            <span className="inline-block bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        {candidate.job_matches && candidate.job_matches.length > 0 ? (
                          <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-white ${
                            candidate.job_matches[0].match_score >= 80
                              ? "bg-green-500/20 text-green-300"
                              : candidate.job_matches[0].match_score >= 60
                              ? "bg-blue-500/20 text-blue-300"
                              : candidate.job_matches[0].match_score >= 40
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                          }`}>
                            {candidate.job_matches[0].match_score}%
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {candidate.resume_url ? (
                          <a
                            href={candidate.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded text-xs hover:bg-green-500/30 transition font-medium"
                          >
                            <FileText className="w-3 h-3" />
                            View Resume
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs">No resume</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-2 max-w-xs">
                          {candidate.job_matches?.length > 0 ? (
                            candidate.job_matches.slice(0, 3).map((job) => (
                              <motion.div
                                key={job.job_id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center justify-between bg-slate-900/50 rounded-lg px-2 py-1 border border-slate-700/50"
                              >
                                <span className="text-xs text-slate-300 truncate" title={job.job_title}>
                                  {job.job_title}
                                </span>
                                <span className={`ml-2 text-xs font-bold rounded px-2 py-0.5 whitespace-nowrap ${
                                  job.match_score >= 70
                                    ? "bg-green-500/20 text-green-400"
                                    : job.match_score >= 50
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}>
                                  {job.match_score}%
                                </span>
                              </motion.div>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500">No matches</span>
                          )}
                          {candidate.job_matches?.length > 3 && (
                            <span className="text-xs text-slate-500 px-2 py-1">
                              +{candidate.job_matches.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          candidate.status === "shortlisted"
                            ? "bg-green-500/20 text-green-300"
                            : candidate.status === "rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {candidate.status || "new"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          onChange={(e) => updateCandidateMutation.mutate({
                            id: candidate.id,
                            status: e.target.value,
                          })}
                          disabled={updateCandidateMutation.isPending}
                          value={candidate.status || "new"}
                          className="bg-slate-800 text-white border border-slate-700 rounded px-2 py-1 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}