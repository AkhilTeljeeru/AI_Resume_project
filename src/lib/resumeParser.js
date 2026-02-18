/**
 * Resume Parser Utility
 * Extracts text from PDF and DOCX files, and extracts skills from the text
 */

import * as pdfjsLib from 'pdfjs-dist';
import * as mammoth from 'mammoth';

// Set up PDF.js worker - point to the build files within pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

/**
 * Comprehensive list of technical skills to match against resumes
 */
const SKILL_KEYWORDS = {
  // Programming Languages
  'JavaScript': ['javascript', 'js', 'node.js', 'nodejs', 'js/es6'],
  'TypeScript': ['typescript', 'ts'],
  'Python': ['python', 'py'],
  'Java': ['java', 'j2ee'],
  'C++': ['c++', 'c\\+\\+', 'cpp'],
  'C#': ['c#', 'csharp', 'c\\#'],
  'Go': ['golang', 'go lang'],
  'Rust': ['rust'],
  'Ruby': ['ruby', 'rails', 'ruby on rails'],
  'PHP': ['php'],
  'Swift': ['swift'],
  'Kotlin': ['kotlin'],
  'SQL': ['sql', 'tsql', 't-sql'],
  
  // Frontend Frameworks
  'React': ['react', 'react.js', 'reactjs'],
  'Vue': ['vue', 'vue.js', 'vuejs'],
  'Angular': ['angular', 'angular.js', 'angularjs'],
  'Svelte': ['svelte'],
  'Next.js': ['next.js', 'nextjs', 'next'],
  'Nuxt': ['nuxt', 'nuxt.js'],
  
  // Backend Frameworks
  'Node.js': ['node.js', 'nodejs', 'node'],
  'Express': ['express', 'express.js'],
  'Django': ['django'],
  'FastAPI': ['fastapi', 'fast api'],
  'Spring Boot': ['spring boot', 'springboot'],
  'Spring': ['spring', 'spring framework'],
  'Flask': ['flask'],
  'NestJS': ['nestjs', 'nest.js'],
  'Laravel': ['laravel'],
  'ASP.NET': ['asp.net', 'aspnet', '.net'],
  
  // Databases
  'MongoDB': ['mongodb', 'mongo'],
  'PostgreSQL': ['postgresql', 'postgres', 'psql'],
  'MySQL': ['mysql'],
  'Redis': ['redis'],
  'DynamoDB': ['dynamodb'],
  'Cassandra': ['cassandra'],
  'Oracle': ['oracle database', 'oracle'],
  'SQL Server': ['sql server', 'mssql'],
  'Firebase': ['firebase'],
  
  // Cloud & DevOps
  'AWS': ['aws', 'amazon web services', 'amazon aws'],
  'Azure': ['azure', 'microsoft azure'],
  'Google Cloud': ['google cloud', 'gcp', 'cloud google'],
  'Docker': ['docker'],
  'Kubernetes': ['kubernetes', 'k8s'],
  'Jenkins': ['jenkins'],
  'CI/CD': ['ci/cd', 'cicd', 'continuous integration'],
  'Terraform': ['terraform'],
  'CloudFormation': ['cloudformation'],
  'Ansible': ['ansible'],
  
  // Web Technologies
  'HTML': ['html', 'html5', 'html 5'],
  'CSS': ['css', 'css3', 'scss', 'sass', 'less'],
  'REST APIs': ['rest', 'rest api', 'restful'],
  'GraphQL': ['graphql'],
  'WebSocket': ['websocket', 'web socket'],
  'AJAX': ['ajax'],
  
  // Mobile
  'React Native': ['react native', 'react-native'],
  'Flutter': ['flutter'],
  'iOS': ['ios', 'iphone', 'objective-c'],
  'Android': ['android', 'java android'],
  'Xamarin': ['xamarin'],
  
  // Data & ML
  'Machine Learning': ['machine learning', 'ml'],
  'Deep Learning': ['deep learning'],
  'TensorFlow': ['tensorflow', 'tensor flow'],
  'PyTorch': ['pytorch', 'torch'],
  'Scikit-learn': ['scikit-learn', 'sklearn'],
  'Pandas': ['pandas'],
  'NumPy': ['numpy'],
  'Data Science': ['data science'],
  'NLP': ['nlp', 'natural language processing'],
  'Computer Vision': ['computer vision', 'cv'],
  
  // Tools & Platforms
  'Git': ['git', 'github', 'gitlab', 'bitbucket', 'version control'],
  'Jira': ['jira'],
  'Agile': ['agile', 'scrum', 'kanban'],
  'Linux': ['linux', 'ubuntu', 'centos', 'debian'],
  'Windows': ['windows'],
  'MacOS': ['macos', 'mac os', 'osx'],
  
  // Soft Skills (for matching)
  'Problem Solving': ['problem solving', 'problem-solving', 'troubleshooting'],
  'Communication': ['communication', 'interpersonal'],
  'Leadership': ['leadership', 'team lead', 'manager'],
  'Project Management': ['project management', 'project manager'],
  'Teamwork': ['teamwork', 'team work', 'collaboration'],
  'Documentation': ['documentation'],
  'Code Review': ['code review', 'peer review'],
  'Testing': ['testing', 'unit test', 'integration test', 'qa'],
  'Debugging': ['debugging', 'troubleshooting'],
  'Software Development': ['software development', 'software engineer'],
  'Backend Development': ['backend development', 'back-end'],
  'Frontend Development': ['frontend development', 'front-end'],
  'Full Stack': ['full stack', 'full-stack'],
  'UI/UX': ['ui/ux', 'ui design', 'ux design', 'user experience'],
  
  // Additional Tech
  'Microservices': ['microservices', 'micro-services'],
  'API Design': ['api design'],
  'System Design': ['system design'],
  'Security': ['security', 'cybersecurity'],
  'Performance Optimization': ['performance', 'optimization'],
  'Scalability': ['scalable', 'scalability'],
  'OOP': ['object oriented', 'oop', 'oop design'],
  'Functional Programming': ['functional programming'],
};

/**
 * Extract text from a PDF file
 */
async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(' ');
    text += pageText + ' ';
  }
  
  return text;
}

/**
 * Extract text from a DOCX file
 */
async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Extract text from resume file (PDF or DOCX)
 */
export async function extractResumeText(file) {
  try {
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await extractTextFromDOCX(file);
    } else if (file.type === 'application/msword') {
      throw new Error('Legacy .doc files are not supported. Please upload a .docx or .pdf file.');
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text from resume:', error);
    throw error;
  }
}

/**
 * Extract skills from resume text
 * Returns an array of detected skills
 */
export function extractSkillsFromText(resumeText) {
  if (!resumeText) return [];
  
  const detectedSkills = new Set();
  const lowerText = resumeText.toLowerCase();
  
  // Sort skills by keyword length (longest first) to match multi-word terms first
  const sortedSkills = Object.entries(SKILL_KEYWORDS).sort((a, b) => {
    const aMaxLen = Math.max(...a[1].map(k => k.length));
    const bMaxLen = Math.max(...b[1].map(k => k.length));
    return bMaxLen - aMaxLen;
  });
  
  // Match each skill keyword or its aliases
  for (const [skillName, keywords] of sortedSkills) {
    for (const keyword of keywords) {
      // Create a pattern that handles word boundaries for both single and multi-word terms
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
      
      if (pattern.test(lowerText)) {
        detectedSkills.add(skillName);
        break; // Found this skill, move to next skill
      }
    }
  }
  
  return Array.from(detectedSkills).sort();
}

/**
 * Extract candidate information from resume text
 * Attempts to extract name, email, phone, and education
 */
export function extractCandidateInfo(resumeText, fileName) {
  const info = {
    name: extractName(resumeText, fileName),
    email: extractEmail(resumeText),
    phone: extractPhone(resumeText),
    education: extractEducation(resumeText),
    skills: extractSkillsFromText(resumeText),
    experience_years: extractExperienceYears(resumeText),
  };
  
  return info;
}

/**
 * Extract name from resume text
 */
function extractName(text, fileName) {
  // Try to extract from common patterns
  const namePattern = /^([a-z\s]+?)(?:\n|$)/im;
  const match = text.match(namePattern);
  if (match && match[1]?.trim().length > 2) {
    return match[1].trim();
  }
  
  // Fallback to filename
  return `Candidate from ${fileName.replace(/\.[^/.]+$/, '')}`;
}

/**
 * Extract email from resume text
 */
function extractEmail(text) {
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = text.match(emailPattern);
  return match ? match[1] : `candidate${Date.now()}@example.com`;
}

/**
 * Extract phone from resume text
 */
function extractPhone(text) {
  const phonePattern = /(\+?1?\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}/;
  const match = text.match(phonePattern);
  return match ? match[0] : '+1 (555) 000-0000';
}

/**
 * Extract education from resume text
 */
function extractEducation(text) {
  const educationPatterns = [
    /(?:bachelor|master|phd|associate|degree)['s]*\s+(?:of|in)?\s+([a-z\s&]+)/i,
    /(?:b\.s\.|b\.a\.|m\.s\.|m\.a\.|m\.b\.a\.|ph\.d\.)\s+(?:in)?\s+([a-z\s&]+)/i,
    /([a-z\s&]+)\s+(?:degree|program|major)/i,
  ];
  
  for (const pattern of educationPatterns) {
    const match = text.match(pattern);
    if (match) {
      return `${match[0]}`.trim();
    }
  }
  
  return 'Education not specified';
}

/**
 * Extract years of experience from resume text
 */
function extractExperienceYears(text) {
  // Look for patterns like "5 years", "5+ years", "5+ yrs"
  const pattern = /(\d+)\+?\s*(?:years|yrs)\s+(?:of\s+)?(?:experience|exp)/i;
  const match = text.match(pattern);
  if (match) {
    return parseInt(match[1]);
  }
  
  // Look for years in date ranges
  const datePattern = /(\d{4})\s*[-–]\s*(?:present|current|now|\d{4})/gi;
  const matches = text.matchAll(datePattern);
  let maxYears = 0;
  for (const match of matches) {
    const year = parseInt(match[1]);
    const years = new Date().getFullYear() - year;
    if (years > maxYears) maxYears = years;
  }
  
  return maxYears > 0 ? maxYears : 0;
}
