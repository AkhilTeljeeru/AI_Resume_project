import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "@/api/apiClient";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Zap, FileText } from "lucide-react";
import { toast } from "sonner";

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [recalculatingJobId, setRecalculatingJobId] = useState(null);

  // ✅ Fetch candidate
  const { data: candidate, isLoading, error } = useQuery({
    queryKey: ["candidate", id],
    enabled: !!id,
    queryFn: () => apiClient.getCandidateById(Number(id)),
  });

  // ✅ Fetch jobs
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiClient.getJobs(),
  });

  // ✅ Update mutation
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {job_matches: any[]}>} */
  const updateMutation = useMutation({
    mutationFn: async (data) => apiClient.updateCandidate(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate", id] });
      toast.success("Candidate updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => apiClient.deleteCandidate(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate deleted");
      navigate("/candidates");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ Recalculate match score
  const recalculateMatch = (job) => {
    setRecalculatingJobId(job.id);

    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 100);
      const updatedMatches = candidate.job_matches.map((m) =>
        m.job_id === job.id ? { ...m, match_score: randomScore } : m
      );

      // If job not in matches yet, add it
      if (!updatedMatches.some((m) => m.job_id === job.id)) {
        updatedMatches.push({
          job_id: job.id,
          job_title: job.title,
          match_score: randomScore,
        });
      }

      updateMutation.mutateAsync({ job_matches: updatedMatches });
      setRecalculatingJobId(null);
    }, 1000);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/candidates")}
          className="mb-6 bg-transparent hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Candidates
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
          Error: {error.message || "Candidate not found"}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-slate-500">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/candidates")}
          className="mb-6 bg-transparent hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Candidates
        </button>
        <p className="text-slate-500">Candidate not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <button
        onClick={() => navigate("/candidates")}
        className="mb-6 bg-transparent hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded transition flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Candidates
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border p-8 mb-6"
      >
        {/* Candidate Info */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{candidate.name}</h1>
            <p className="text-slate-600 mt-2">{candidate.email}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${
            candidate.status === "shortlisted"
              ? "bg-green-100 text-green-800"
              : candidate.status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}>
            {candidate.status || "new"}
          </span>
        </div>

        {/* Skills */}
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Resume */}
        {candidate.resume_url && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3">Resume</h2>
            <a
              href={candidate.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 rounded-lg transition font-medium"
            >
              <FileText className="w-4 h-4" />
              Download/View Resume
            </a>
          </div>
        )}

        {/* Job Matches */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Job Matches</h2>
          <div className="space-y-3">
            {jobs.length === 0 ? (
              <p className="text-slate-500">No jobs available</p>
            ) : (
              jobs.map((job) => {
                const match = candidate.job_matches?.find(
                  (m) => m.job_id === job.id
                );
                const score = match?.match_score || 0;

                return (
                  <motion.div
                    key={job.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-slate-600">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {score}%
                        </div>
                        <div className="text-xs text-slate-500">
                          Match Score
                        </div>
                      </div>
                      <button
                        onClick={() => recalculateMatch(job)}
                        disabled={recalculatingJobId === job.id}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition disabled:opacity-50"
                      >
                        <Zap className="w-4 h-4" />
                        {recalculatingJobId === job.id
                          ? "Calculating..."
                          : "Recalculate"}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>

      {/* Delete Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this candidate? This action cannot be undone."
              )
            ) {
              deleteMutation.mutate();
            }
          }}
          disabled={deleteMutation.isPending}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {deleteMutation.isPending ? "Deleting..." : "Delete Candidate"}
        </button>
      </div>
    </div>
  );
}
