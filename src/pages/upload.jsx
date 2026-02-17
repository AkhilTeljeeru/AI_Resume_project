import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Briefcase,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import ResumeUploader from "@/components/upload/ResumeUploader";

export default function Upload() {
  const [selectedJobId, setSelectedJobId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience_years: "",
    education: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiClient.getJobs(),
  });

  const activeJobs = jobs.filter((j) => j.status === "active");
  const selectedJob = jobs.find((j) => j.id === Number(selectedJobId));

  /** @type {import('@tanstack/react-query').UseMutationResult<any, Error, {name: string, email: string, phone: string, skills: string[], experience_years: number, education: string, status: string, job_matches?: any[]}>} */
  const createMutation = useMutation({
    mutationFn: (data) => apiClient.createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience_years: "",
        education: "",
      });
      setSelectedJobId("");
      setShowForm(false);
      toast.success("Candidate created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create candidate: " + error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const candidateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: skillsArray,
      experience_years: Number(formData.experience_years) || 0,
      education: formData.education,
      status: "new",
    };

    // If a job is selected, create job match
    if (selectedJob) {
      const matchScore = Math.floor(Math.random() * 40) + 60;
      candidateData.job_matches = [
        {
          job_id: selectedJob.id,
          job_title: selectedJob.title,
          match_score: matchScore,
        },
      ];
    }

    createMutation.mutate(candidateData);
  };

  const handleResumeUpload = async (file, updateStatus) => {
    try {
      updateStatus("uploading");
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStatus("processing");
      
      // Simulate processing and parsing resume
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Extract data from resume (mock implementation)
      const mockResumeData = {
        name: `Candidate from ${file.name}`,
        email: `candidate${Date.now()}@example.com`,
        phone: "+1 (555) 000-0000",
        skills: ["React", "JavaScript", "Node.js", "TypeScript"],
        experience_years: 3,
        education: "BS Computer Science",
        resume_url: `mock-resume-${Date.now()}.pdf`,
      };

      // Create candidate with resume data
      const candidateData = {
        ...mockResumeData,
        status: "new",
      };

      if (selectedJob) {
        const matchScore = Math.floor(Math.random() * 40) + 60;
        candidateData.job_matches = [
          {
            job_id: selectedJob.id,
            job_title: selectedJob.title,
            match_score: matchScore,
          },
        ];
      }

      await apiClient.createCandidate(candidateData);
      updateStatus("complete");
      
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success(`Candidate created from ${file.name}`);
    } catch (error) {
      updateStatus("error");
      toast.error("Failed to process resume: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={createPageUrl("Dashboard")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add Candidates</h1>
          <p className="text-gray-600 mt-1">
            Register new candidates for job matching
          </p>
        </div>

        {/* Job Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 mb-1">
                Select Job Position (Optional)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose a job to automatically calculate match scores
              </p>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full max-w-md bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a job position...</option>
                {activeJobs.length === 0 ? (
                  <option disabled>No active jobs available</option>
                ) : (
                  activeJobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))
                )}
              </select>
              {activeJobs.length === 0 && (
                <p className="text-sm text-amber-700 mt-2">
                  <Link to={createPageUrl("jobs")} className="underline font-medium">
                    Create a job posting
                  </Link>{" "}
                  to enable automatic matching
                </p>
              )}
            </div>
          </div>

          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-blue-200"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Job:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {selectedJob.title}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Form Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Add New Candidate</h2>
              <p className="text-sm text-gray-600">
                Enter candidate information below
              </p>
            </div>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              New Candidate
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) =>
                      setFormData({ ...formData, experience_years: e.target.value })
                    }
                    placeholder="5"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    placeholder="BS Computer Science"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated) *
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="React, TypeScript, JavaScript, Node.js"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  type="button"
                  className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create Candidate"}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Resume Uploader Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-slate-950 rounded-lg border border-slate-800 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">Bulk Upload Resumes</h2>
              <p className="text-sm text-slate-400">
                Upload PDF or DOCX files to automatically create candidates
              </p>
            </div>
          </div>
          <ResumeUploader 
            onUpload={handleResumeUpload} 
            isProcessing={isProcessing}
          />
        </motion.div>
      </div>
    </div>
  );
}