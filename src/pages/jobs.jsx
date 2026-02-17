import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Briefcase, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const queryClient = useQueryClient();

  // ✅ FETCH JOBS
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiClient.getJobs(),
  });

  // ✅ FETCH CANDIDATES
  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => apiClient.getCandidates(),
  });

  // ✅ CREATE JOB
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {title: string, description: string}>} */
  const createMutation = useMutation({
    mutationFn: (data) => apiClient.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsFormOpen(false);
      setFormData({ title: "", description: "" });
      toast.success("Job created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ UPDATE JOB
  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {id: number, formData: {title: string, description: string}}>} */
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      return apiClient.updateJob(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsFormOpen(false);
      setEditingJob(null);
      setFormData({ title: "", description: "" });
      toast.success("Job updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ DELETE JOB
  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // ✅ HANDLERS
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingJob) {
      await updateMutation.mutateAsync({
        id: editingJob.id,
        formData: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({ title: job.title, description: job.description });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await deleteMutation.mutateAsync(id);
  };

  const handleOpenForm = () => {
    setEditingJob(null);
    setFormData({ title: "", description: "" });
    setIsFormOpen(true);
  };

  const getCandidateCount = (jobId) => {
    return candidates.filter((c) =>
      c?.job_matches?.some((m) => Number(m?.job_id) === Number(jobId))
    ).length;
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      !searchTerm ||
      job?.title?.toLowerCase().includes(searchLower) ||
      job?.description?.toLowerCase().includes(searchLower)
    );
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
          Error loading jobs: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Positions</h1>
          <p className="text-slate-600 mt-2">Manage and view active job listings</p>
        </div>
        <button
          onClick={handleOpenForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Create Job
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search jobs by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* JOB GRID */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-500 mb-4">
            {jobs.length === 0 ? "No jobs created yet. Create your first job!" : "No jobs match your search."}
          </p>
          {jobs.length === 0 && (
            <button
              onClick={handleOpenForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Create Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-lg border p-6 hover:shadow-lg transition"
              >
                {/* Job Title & Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {job.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Stats */}
                <div className="mb-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-slate-600">Matched Candidates:</span>
                    <span className="ml-2 font-semibold text-blue-600">
                      {getCandidateCount(job.id)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="flex-1 flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 px-3 py-2 rounded text-sm transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleteMutation.isPending ? "..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div className="bg-white w-full max-w-md h-screen overflow-y-auto p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">
              {editingJob ? "Edit Job" : "Create New Job"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Senior React Developer"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Job description and requirements..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setIsFormOpen(false)}
                  type="button"
                  className="flex-1 border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
