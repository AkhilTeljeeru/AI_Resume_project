/**
 * Job Templates - Predefined job positions with skills requirements
 * These templates help recruiters quickly add job positions and match candidates
 */

export const JOB_TEMPLATES = [
  {
    title: "Software Engineer",
    category: "Development",
    description: "Design, develop, and maintain software applications across multiple platforms. Collaborate with teams to deliver scalable solutions.",
    requirements: "Bachelor's degree in Computer Science or related field, 2+ years of professional development experience.",
    required_skills: ["Problem Solving", "Software Development", "Code Review", "Git", "Debugging"],
    preferred_skills: ["System Design", "Agile", "Testing", "CI/CD"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Full Stack Developer",
    category: "Development",
    description: "Develop and maintain both frontend and backend components. Create responsive, scalable web applications.",
    requirements: "3+ years of experience with full stack development, strong portfolio required.",
    required_skills: ["React", "Node.js", "JavaScript", "HTML/CSS", "Database Design", "REST APIs"],
    preferred_skills: ["TypeScript", "Docker", "AWS", "Python"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Backend Developer",
    category: "Development",
    description: "Build robust server-side applications, manage databases, and create APIs for frontend consumption.",
    requirements: "2+ years backend development experience, expertise in at least one backend language.",
    required_skills: ["Backend Development", "Database Management", "API Design", "Server Architecture", "Security"],
    preferred_skills: ["Microservices", "Message Queues", "Cache Systems", "Docker"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Mobile App Developer",
    category: "Development",
    description: "Create innovative mobile applications for iOS and/or Android platforms.",
    requirements: "2+ years mobile development experience, published apps in app stores.",
    required_skills: ["Mobile Development", "React Native or Flutter", "JavaScript", "UI/UX Principles", "API Integration"],
    preferred_skills: ["Native Development", "Performance Optimization", "Testing", "Firebase"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "DevOps Engineer",
    category: "Infrastructure",
    description: "Manage and optimize cloud infrastructure, automate deployments, and ensure system reliability.",
    requirements: "3+ years DevOps experience, hands-on experience with cloud platforms.",
    required_skills: ["CI/CD", "Infrastructure as Code", "Docker", "Kubernetes", "Cloud Platforms", "Linux"],
    preferred_skills: ["Terraform", "Ansible", "Monitoring Tools", "Bash Scripting"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Cybersecurity Analyst",
    category: "Security",
    description: "Protect organizational assets by analyzing security incidents and implementing protective measures.",
    requirements: "3+ years cybersecurity experience, relevant certifications (CISSP, CEH) preferred.",
    required_skills: ["Security Analysis", "Vulnerability Assessment", "Incident Response", "Network Security", "Cryptography"],
    preferred_skills: ["Penetration Testing", "SIEM Tools", "Malware Analysis", "Compliance"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "SOC Analyst",
    category: "Security",
    description: "Monitor security systems, detect threats, and respond to security incidents in real-time.",
    requirements: "2+ years SOC experience, ability to work shifts including nights/weekends.",
    required_skills: ["Threat Detection", "Log Analysis", "Incident Response", "SIEM Tools", "Security Monitoring"],
    preferred_skills: ["Scripting", "Malware Analysis", "Threat Intelligence", "IDS/IPS"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Ethical Hacker / Penetration Tester",
    category: "Security",
    description: "Conduct authorized security testing to identify vulnerabilities before malicious actors can.",
    requirements: "3+ years penetration testing experience, certifications like CEH, OSCP, or GPEN.",
    required_skills: ["Penetration Testing", "Vulnerability Analysis", "Exploit Development", "Network Security", "Hacking Tools"],
    preferred_skills: ["Web Application Testing", "Social Engineering", "Report Writing", "Metasploit"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Security Engineer",
    category: "Security",
    description: "Design and implement security solutions to protect systems, networks, and data.",
    requirements: "4+ years security engineering experience, strong knowledge of security architecture.",
    required_skills: ["Security Architecture", "Threat Modeling", "Encryption", "Access Control", "Security Policy"],
    preferred_skills: ["Cloud Security", "Application Security", "Compliance Frameworks", "Security Tools"],
    min_experience: 4,
    type: "full-time",
  },
  {
    title: "Data Scientist",
    category: "Data & Analytics",
    description: "Analyze complex datasets, develop predictive models, and drive data-driven decision making.",
    requirements: "3+ years data science experience, strong statistics and programming background.",
    required_skills: ["Python", "Data Analysis", "Machine Learning", "SQL", "Statistical Analysis", "Data Visualization"],
    preferred_skills: ["TensorFlow", "Deep Learning", "Big Data", "Spark"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Machine Learning Engineer",
    category: "Data & Analytics",
    description: "Develop machine learning models and pipelines for production systems.",
    requirements: "3+ years ML experience, track record of deploying ML models in production.",
    required_skills: ["Machine Learning", "Python", "TensorFlow/PyTorch", "Model Training", "Data Engineering"],
    preferred_skills: ["Deep Learning", "NLP", "Computer Vision", "MLOps"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Data Engineer",
    category: "Data & Analytics",
    description: "Build and maintain data pipelines and infrastructure for data analytics and ML.",
    requirements: "3+ years data engineering experience, expertise in distributed systems.",
    required_skills: ["Data Pipeline", "SQL", "ETL", "Big Data Tools", "Python/Scala", "Data Modeling"],
    preferred_skills: ["Spark", "Kafka", "Airflow", "Data Warehouse", "Cloud Platforms"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Cloud Engineer",
    category: "Infrastructure",
    description: "Design, implement, and manage cloud infrastructure and solutions.",
    requirements: "3+ years cloud platform experience, relevant cloud certification.",
    required_skills: ["Cloud Platforms", "Infrastructure as Code", "Networking", "Storage Solutions", "Virtualization"],
    preferred_skills: ["Kubernetes", "Docker", "Automation", "Database Services"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Cloud Architect",
    category: "Infrastructure",
    description: "Design enterprise cloud solutions and define cloud strategy.",
    requirements: "5+ years cloud architecture experience, proven track record with large-scale deployments.",
    required_skills: ["Cloud Architecture", "System Design", "Security", "Cost Optimization", "Compliance"],
    preferred_skills: ["Multi-cloud Strategy", "Disaster Recovery", "Performance Tuning", "Governance"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Network Engineer",
    category: "Infrastructure",
    description: "Design, implement, and manage network infrastructure.",
    requirements: "3+ years network engineering experience, CCNA or equivalent certification.",
    required_skills: ["Network Design", "Routing/Switching", "TCP/IP", "Firewalls", "Troubleshooting"],
    preferred_skills: ["Network Security", "SDN", "Cloud Networking", "Load Balancing"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "System Administrator",
    category: "Infrastructure",
    description: "Manage and maintain IT infrastructure, servers, and systems.",
    requirements: "3+ years system administration experience, Windows and/or Linux expertise.",
    required_skills: ["System Administration", "Server Management", "Active Directory", "Scripting", "Troubleshooting"],
    preferred_skills: ["Cloud Platforms", "Virtualization", "Monitoring", "Security"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "QA Engineer (Automation)",
    category: "Quality Assurance",
    description: "Develop and execute automated tests to ensure software quality.",
    requirements: "2+ years QA automation experience, proficiency in test automation frameworks.",
    required_skills: ["Test Automation", "Selenium/Cypress", "Python/JavaScript", "Testing Frameworks", "API Testing"],
    preferred_skills: ["CI/CD Integration", "Performance Testing", "Mobile Testing", "Test Strategy"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    description: "Create intuitive and engaging user interfaces and user experiences.",
    requirements: "3+ years UI/UX design experience, strong portfolio required.",
    required_skills: ["UI Design", "UX Research", "Figma/Sketch", "Prototyping", "Design Systems"],
    preferred_skills: ["User Testing", "Interaction Design", "Front-end Knowledge", "Accessibility"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Product Manager",
    category: "Management",
    description: "Lead product vision, strategy, and execution. Coordinate with engineering and design teams.",
    requirements: "4+ years product management experience, proven ability to ship products.",
    required_skills: ["Product Strategy", "Analytics", "Communication", "Project Management", "Market Analysis"],
    preferred_skills: ["Technical Background", "Data-driven Decision Making", "User Research", "Agile"],
    min_experience: 4,
    type: "full-time",
  },
];

/**
 * Get job template by title
 */
export const getJobTemplate = (title) => {
  return JOB_TEMPLATES.find((t) => t.title === title);
};

/**
 * Get all unique categories from templates
 */
export const getJobCategories = () => {
  return [...new Set(JOB_TEMPLATES.map((t) => t.category))];
};

/**
 * Get templates by category
 */
export const getJobsByCategory = (category) => {
  return JOB_TEMPLATES.filter((t) => t.category === category);
};

/**
 * Calculate skill match score between candidate skills and job requirements
 */
export const calculateSkillMatch = (candidateSkills = [], jobRequiredSkills = [], jobPreferredSkills = []) => {
  const candidateSkillsLower = candidateSkills.map((s) => s.toLowerCase());
  const requiredSkillsLower = jobRequiredSkills.map((s) => s.toLowerCase());
  const preferredSkillsLower = jobPreferredSkills.map((s) => s.toLowerCase());

  // Match required skills
  const matchedRequired = requiredSkillsLower.filter((skill) =>
    candidateSkillsLower.some((cs) => cs.includes(skill) || skill.includes(cs))
  );
  
  // Match preferred skills
  const matchedPreferred = preferredSkillsLower.filter((skill) =>
    candidateSkillsLower.some((cs) => cs.includes(skill) || skill.includes(cs))
  );

  // Calculate score: 70% weight on required, 30% on preferred
  const requiredScore = requiredSkillsLower.length > 0 
    ? (matchedRequired.length / requiredSkillsLower.length) * 70 
    : 0;
  
  const preferredScore = preferredSkillsLower.length > 0 
    ? (matchedPreferred.length / preferredSkillsLower.length) * 30 
    : 0;

  const totalScore = Math.round(requiredScore + preferredScore);

  return {
    score: totalScore,
    matchedRequired,
    matchedPreferred,
    missingRequired: requiredSkillsLower.filter((skill) => !matchedRequired.includes(skill)),
    missingPreferred: preferredSkillsLower.filter((skill) => !matchedPreferred.includes(skill)),
  };
};
