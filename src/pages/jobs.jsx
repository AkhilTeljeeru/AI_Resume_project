import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Briefcase, Edit2, Trash2, Zap, X } from "lucide-react";
import { toast } from "sonner";
import { JOB_TEMPLATES, getJobCategories, getJobsByCategory } from "@/lib/job-templates";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Development");
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", required_skills: [], preferred_skills: [], min_experience: 0, requirements: "", type: "full-time" });
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);

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
      setFormData({ title: "", description: "", required_skills: [], preferred_skills: [], min_experience: 0, requirements: "", type: "full-time" });
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
      setFormData({ title: "", description: "", required_skills: [], preferred_skills: [], min_experience: 0, requirements: "", type: "full-time" });
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

  const handleAddTemplate = async (template) => {
    setIsAddingTemplate(true);
    try {
      // Only pass title and description which are required by the API
      // Other properties will be added through the edit form if needed
      await createMutation.mutateAsync({
        title: template.title,
        description: template.description,
      });
      setShowTemplates(false);
    } catch (error) {
      console.error("Error adding template:", error);
    } finally {
      setIsAddingTemplate(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({ 
      title: job.title, 
      description: job.description,
      required_skills: job.required_skills || [],
      preferred_skills: job.preferred_skills || [],
      min_experience: job.min_experience || 0,
      requirements: job.requirements || "",
      type: job.type || "full-time",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await deleteMutation.mutateAsync(id);
  };

  const handleOpenForm = () => {
    setEditingJob(null);
    setFormData({ title: "", description: "", required_skills: [], preferred_skills: [], min_experience: 0, requirements: "", type: "full-time" });
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
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Zap className="w-4 h-4" />
            Quick Add
          </button>
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Create Job
          </button>
        </div>
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
                  placeholder="Job description..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  placeholder="Job requirements and qualifications..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Required Skills (comma-separated)</label>
                <textarea
                  value={formData.required_skills?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, required_skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })
                  }
                  placeholder="React, JavaScript, TypeScript..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Skills (comma-separated)</label>
                <textarea
                  value={formData.preferred_skills?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, preferred_skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })
                  }
                  placeholder="Docker, CI/CD, AWS..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Minimum Experience (years)</label>
                <input
                  type="number"
                  value={formData.min_experience || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, min_experience: Number(e.target.value) })
                  }
                  placeholder="2"
                  min="0"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <select
                  value={formData.type || "full-time"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
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

      {/* TEMPLATES MODAL */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-screen overflow-y-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Job Templates Library</h2>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-1 hover:bg-slate-100 rounded transition"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {getJobCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {getJobsByCategory(selectedCategory).map((template) => (
                <motion.div
                  key={template.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-slate-300 rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg mb-2 text-blue-700">{template.title}</h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  <div className="mb-3 space-y-1">
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Min. Experience:</span> {template.min_experience} years
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Type:</span> {template.type}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-medium text-slate-700 mb-1">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.required_skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {template.required_skills.length > 3 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          +{template.required_skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddTemplate(template)}
                    disabled={isAddingTemplate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition disabled:opacity-50"
                  >
                    {isAddingTemplate ? "Adding..." : "Add Job"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}    </div>
  );
}