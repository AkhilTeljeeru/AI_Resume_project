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
  {
    title: "Senior Software Engineer",
    category: "Development",
    description: "Lead technical initiatives, mentor junior developers, and drive architectural decisions.",
    requirements: "5+ years software development experience, proven leadership skills.",
    required_skills: ["Software Architecture", "Leadership", "Problem Solving", "Code Review", "Mentoring"],
    preferred_skills: ["System Design", "Performance Optimization", "Technical Strategy", "Team Leadership"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Frontend Developer",
    category: "Development",
    description: "Build responsive, user-friendly web interfaces using modern frontend frameworks.",
    requirements: "2+ years frontend development experience.",
    required_skills: ["React", "JavaScript", "CSS", "HTML", "UI Implementation"],
    preferred_skills: ["TypeScript", "Jest", "Redux", "Responsive Design"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Python Developer",
    category: "Development",
    description: "Develop scalable applications using Python. Work with data processing and backend systems.",
    requirements: "2+ years Python development experience.",
    required_skills: ["Python", "OOP", "Database Design", "Problem Solving", "Testing"],
    preferred_skills: ["Django", "FastAPI", "Data Science", "Machine Learning"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Java Developer",
    category: "Development",
    description: "Build enterprise applications and microservices using Java ecosystem.",
    requirements: "2+ years Java development experience.",
    required_skills: ["Java", "Spring Boot", "OOP", "Database Management", "REST APIs"],
    preferred_skills: ["Kubernetes", "Docker", "Microservices", "AWS"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "React Developer",
    category: "Development",
    description: "Specialize in building modern React applications with focus on performance.",
    requirements: "2+ years React development experience.",
    required_skills: ["React", "JavaScript", "JSX", "React Hooks", "State Management"],
    preferred_skills: ["Next.js", "TypeScript", "Testing", "Web Performance"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Junior Developer",
    category: "Development",
    description: "Start your career as a developer. Learn best practices and contribute to projects.",
    requirements: "Computer Science degree or bootcamp certification, passion for coding.",
    required_skills: ["Programming Fundamentals", "Problem Solving", "Git", "Web Basics"],
    preferred_skills: ["JavaScript", "Python", "Testing", "Version Control"],
    min_experience: 0,
    type: "full-time",
  },
  {
    title: "Senior DevOps Engineer",
    category: "Infrastructure",
    description: "Lead infrastructure strategy, optimization, and automation at scale.",
    requirements: "5+ years DevOps experience, proven track record with large deployments.",
    required_skills: ["DevOps Strategy", "Infrastructure as Code", "Kubernetes", "Cloud Architecture", "Team Leadership"],
    preferred_skills: ["Multi-cloud", "Disaster Recovery", "Cost Optimization", "Automation"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Infrastructure Engineer",
    category: "Infrastructure",
    description: "Design and manage robust IT infrastructure and systems.",
    requirements: "3+ years infrastructure engineering experience.",
    required_skills: ["Infrastructure Design", "Networking", "Server Management", "Virtualization", "Linux"],
    preferred_skills: ["AWS", "Azure", "Terraform", "Monitoring Tools"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Data Analyst",
    category: "Data & Analytics",
    description: "Analyze data to drive business insights and improvements.",
    requirements: "2+ years data analysis experience.",
    required_skills: ["SQL", "Data Analysis", "Excel", "Data Visualization", "Statistical Analysis"],
    preferred_skills: ["Tableau", "Power BI", "Python", "Business Intelligence"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Senior Data Scientist",
    category: "Data & Analytics",
    description: "Lead advanced analytics initiatives and model development strategy.",
    requirements: "5+ years data science experience with proven track record.",
    required_skills: ["Machine Learning", "Python", "Statistical Modeling", "Data Strategy", "Leadership"],
    preferred_skills: ["Deep Learning", "Big Data", "MLOps", "Research Publications"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Analytics Engineer",
    category: "Data & Analytics",
    description: "Build data pipelines and analytics infrastructure for the organization.",
    requirements: "2+ years analytics engineering or data engineering experience.",
    required_skills: ["SQL", "Data Modeling", "ETL", "Data Warehouse", "Python"],
    preferred_skills: ["dbt", "DBT", "Apache Airflow", "Data Quality"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Application Security Engineer",
    category: "Security",
    description: "Secure applications through code review, testing, and vulnerability assessment.",
    requirements: "3+ years application security experience.",
    required_skills: ["AppSec", "Code Review", "OWASP", "Security Testing", "Vulnerability Analysis"],
    preferred_skills: ["Penetration Testing", "SAST/DAST", "Security Architecture"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Infrastructure Security Engineer",
    category: "Security",
    description: "Protect organizational infrastructure and networks from threats.",
    requirements: "3+ years infrastructure security experience.",
    required_skills: ["Network Security", "Firewall Management", "Threat Detection", "Incident Response", "Linux/Windows"],
    preferred_skills: ["Cloud Security", "IDS/IPS", "Security Monitoring", "Compliance"],
    min_experience: 3,
    type: "full-time",
  },
  {
    title: "Engineering Manager",
    category: "Management",
    description: "Lead engineering teams, manage projects, and develop talent.",
    requirements: "5+ years software development + 2+ years management experience.",
    required_skills: ["Team Leadership", "Project Management", "Technical Knowledge", "Communication", "Mentoring"],
    preferred_skills: ["Agile", "Hiring", "Strategic Planning", "Budget Management"],
    min_experience: 7,
    type: "full-time",
  },
  {
    title: "Tech Lead",
    category: "Management",
    description: "Provide technical direction and mentorship to development teams.",
    requirements: "5+ years development experience with proven technical leadership.",
    required_skills: ["Technical Expertise", "Architecture Design", "Mentoring", "Code Quality", "Problem Solving"],
    preferred_skills: ["System Design", "Technical Documentation", "Agile", "Communication"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Scrum Master",
    category: "Management",
    description: "Facilitate agile processes and remove impediments for development teams.",
    requirements: "2+ years Scrum Master or Agile coaching experience, CSM certification.",
    required_skills: ["Agile Methodology", "Scrum Framework", "Facilitation", "Communication", "Problem Solving"],
    preferred_skills: ["Kanban", "Lean", "Team Building", "Conflict Resolution"],
    min_experience: 2,
    type: "full-time",
  },
  {
    title: "Solutions Architect",
    category: "Management",
    description: "Design comprehensive technical solutions for client requirements.",
    requirements: "5+ years solution architecture or equivalent experience.",
    required_skills: ["Solution Design", "System Architecture", "Technical Communication", "Client Engagement", "Cloud Platforms"],
    preferred_skills: ["AWS Solutions Architect", "Azure Architecture", "Business Analysis", "Presentation Skills"],
    min_experience: 5,
    type: "full-time",
  },
  {
    title: "Technical Sales Engineer",
    category: "Management",
    description: "Blend technical expertise with sales to guide customers to solutions.",
    requirements: "3+ years technical sales or solution sales experience.",
    required_skills: ["Technical Knowledge", "Sales Skills", "Communication", "Problem Solving", "Product Knowledge"],
    preferred_skills: ["SaaS", "Enterprise Sales", "Presentation", "Negotiation"],
    min_experience: 3,
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
