/**
 * API Client - Handles all data operations
 * Mock implementation with in-memory storage
 */

let candidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    skills: ["React", "JavaScript", "Node.js"],
    status: "new",
    experience_years: 3,
    education: "B.Sc Computer Science",
    job_matches: [
      { job_id: 1, job_title: "Frontend Developer", match_score: 85 },
      { job_id: 2, job_title: "AI Engineer", match_score: 35 },
    ],
    created_date: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    status: "shortlisted",
    experience_years: 5,
    education: "M.Sc Data Science",
    job_matches: [
      { job_id: 1, job_title: "Frontend Developer", match_score: 40 },
      { job_id: 2, job_title: "AI Engineer", match_score: 92 },
    ],
    created_date: new Date().toISOString(),
  },
];

let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Looking for React developer with 3+ years experience",
    required_skills: ["React", "JavaScript", "CSS", "HTML"],
    preferred_skills: ["TypeScript", "Redux", "Testing"],
    min_experience: 3,
    type: "full-time",
    status: "active",
    created_date: new Date().toISOString(),
  },
  {
    id: 2,
    title: "AI Engineer",
    description: "Looking for ML/AI specialist",
    required_skills: ["Python", "Machine Learning", "Data Analysis"],
    preferred_skills: ["TensorFlow", "PyTorch", "NLP"],
    min_experience: 2,
    type: "full-time",
    status: "active",
    created_date: new Date().toISOString(),
  },
];

/**
 * Simulates API delay
 */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API Client object with candidate and job management
 */
export const apiClient = {
  // ================= CANDIDATES =================

  async getCandidates() {
    await delay();
    return [...candidates];
  },

  async getCandidateById(id) {
    await delay();
    const candidate = candidates.find((c) => c.id === Number(id));
    if (!candidate) throw new Error(`Candidate with ID ${id} not found`);
    return candidate;
  },

  async createCandidate(data) {
    await delay();
    const newCandidate = {
      id: Date.now(),
      created_date: new Date().toISOString(),
      status: data.status || "new",
      job_matches: data.job_matches || [],
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      skills: data.skills || [],
      experience_years: data.experience_years || 0,
      education: data.education || "",
      resume_url: data.resume_url || null,
    };
    candidates.push(newCandidate);
    return newCandidate;
  },

  async updateCandidate(id, data) {
    await delay();
    const index = candidates.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error(`Candidate with ID ${id} not found`);
    
    candidates[index] = { 
      ...candidates[index], 
      ...data,
      id: candidates[index].id, // Preserve original ID
      created_date: candidates[index].created_date, // Preserve creation date
    };
    return candidates[index];
  },

  async deleteCandidate(id) {
    await delay();
    const initialLength = candidates.length;
    candidates = candidates.filter((c) => c.id !== Number(id));
    if (candidates.length === initialLength) {
      throw new Error(`Candidate with ID ${id} not found`);
    }
    return { success: true };
  },

  // ================= JOBS =================

  async getJobs() {
    await delay();
    return [...jobs];
  },

  async getJobById(id) {
    await delay();
    const job = jobs.find((j) => j.id === Number(id));
    if (!job) throw new Error(`Job with ID ${id} not found`);
    return job;
  },

  async createJob(data) {
    await delay();
    if (!data.title || !data.description) {
      throw new Error("Title and description are required");
    }
    
    const newJob = {
      id: Date.now(),
      status: "active",
      created_date: new Date().toISOString(),
      ...data,
    };
    jobs.push(newJob);
    return newJob;
  },

  async updateJob(id, data) {
    await delay();
    const index = jobs.findIndex((j) => j.id === Number(id));
    if (index === -1) throw new Error(`Job with ID ${id} not found`);
    
    jobs[index] = { ...jobs[index], ...data };
    return jobs[index];
  },

  async deleteJob(id) {
    await delay();
    const initialLength = jobs.length;
    jobs = jobs.filter((j) => j.id !== Number(id));
    if (jobs.length === initialLength) {
      throw new Error(`Job with ID ${id} not found`);
    }
    return { success: true };
  },

  // ================= UPLOADS/RESUMES =================

  async uploadResume(file) {
    await delay(1000);
    return {
      success: true,
      file_url: `mock-resume-${Date.now()}.pdf`,
      message: "Resume uploaded successfully",
    };
  },
};
