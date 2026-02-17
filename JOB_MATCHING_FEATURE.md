# Job Matching & Skills-Based Recruitment Features

## Overview
This document describes the new job matching and skills-based recruitment features that enable recruiters to easily find candidates matching specific job requirements.

## ✨ New Features

### 1. **Job Templates Library** 
Quick-add pre-built job positions for 19 different roles across multiple categories:

#### Technology/Development
- Software Engineer
- Full Stack Developer
- Backend Developer
- Mobile App Developer
- QA Engineer (Automation)

#### Infrastructure
- DevOps Engineer
- Cloud Engineer
- Cloud Architect
- Network Engineer
- System Administrator

#### Security
- Cybersecurity Analyst
- SOC Analyst
- Ethical Hacker / Penetration Tester
- Security Engineer

#### Data & Analytics
- Data Scientist
- Machine Learning Engineer
- Data Engineer

#### Design & Management
- UI/UX Designer
- Product Manager

### 2. **Automatic Skill Matching**
When candidates are uploaded or registered:
- Their skills are automatically matched against all job positions
- Match scores are calculated based on required and preferred skills
- Top matching jobs are recommended to recruiters
- Candidates are automatically linked to suitable jobs (30%+ skill match)

### 3. **Smart Recommendation Engine**
- **Required Skills (70% weight)**: Skills critical for the job
- **Preferred Skills (30% weight)**: Nice-to-have skills
- Shows matched skills and missing skills for each candidate-job pair
- Displays top 3 recommended jobs during candidate registration

## 📋 How to Use

### Add Job Positions

#### Option 1: Quick Add (Recommended)
1. Go to **Job Positions** page
2. Click the **"Quick Add"** button
3. Select a job category (Development, Security, Infrastructure, etc.)
4. Browse available job templates
5. Click **"Add Job"** on any template
6. The job is instantly created with:
   - Pre-configured title and description
   - Required and preferred skills
   - Minimum experience requirement
   - Job type (full-time, part-time, contract, internship)

#### Option 2: Create Custom Job
1. Click **"Create Job"** button
2. Fill in:
   - Job Title
   - Description
   - Requirements
   - Required Skills (comma-separated)
   - Preferred Skills (comma-separated)
   - Min. Experience
   - Job Type
3. Click **"Save Job"**

### Register Candidates with Automatic Matching

#### Option 1: Manual Form
1. Go to **Add Candidates** page
2. Fill in candidate information (name, email, phone, education)
3. Enter **Skills** (comma-separated)
4. **Recommended Jobs** section automatically appears showing:
   - Best matching job positions
   - Match percentage
   - Skills matched count
5. (Optional) Select a specific job to prioritize
6. Click **"Create Candidate"**
   - System automatically calculates match scores
   - Candidate is linked to all jobs with 30%+ match

#### Option 2: Bulk Resume Upload
1. Go to **Add Candidates** page
2. Scroll to **"Bulk Upload Resumes"** section
3. Upload PDF or DOCX resume files
4. System automatically:
   - Extracts candidate information
   - Parses skills from resume
   - Calculates job matches
   - Creates candidate profile with matched jobs

### View Job Performance Metrics
On the **Job Positions** page, each job card shows:
- **Job Title** and status
- **Description** preview
- **Matched Candidates** count (automatically updated)
- Edit and Delete options

### Search & Filter
- Use the search bar to find jobs by title or description
- Filter by category using tabs in the Quick Add modal

## 🔍 Smart Matching Algorithm

The skill matching system:

```
Match Score = (Required Skills Match % × 0.7) + (Preferred Skills Match % × 0.3)
```

**Example:**
- Job requires: [React, JavaScript, Node.js] (3 skills)
- Job prefers: [TypeScript, Docker, AWS] (3 skills)
- Candidate has: [React, JavaScript, TypeScript, Python]

Calculation:
- Required match: 2 out of 3 = 66% × 0.7 = 46.2%
- Preferred match: 1 out of 3 = 33% × 0.3 = 10%
- **Total Score: 56%**

## 📊 Data Structure

### Job Templates
Each template includes:
```javascript
{
  title: "Full Stack Developer",
  category: "Development",
  description: "...",
  requirements: "...",
  required_skills: ["React", "Node.js", "JavaScript", ...],
  preferred_skills: ["TypeScript", "Docker", ...],
  min_experience: 3,
  type: "full-time"
}
```

### Job Match Result
Each candidate is linked to matched jobs:
```javascript
{
  job_id: 1,
  job_title: "Full Stack Developer",
  match_score: 75,
  matching_skills: ["React", "JavaScript"],
  missing_skills: ["Node.js", "Docker"]
}
```

## 🎯 Benefits

1. **For Recruiters:**
   - Quickly create job postings from pre-built templates
   - Automatically identify best candidate matches
   - Find candidates across multiple relevant positions
   - View comprehensive skill gaps for each candidate

2. **For Candidates:**
   - See which jobs best match their skills
   - Understand skill requirements for target positions
   - Get detailed feedback on matches

3. **For Efficiency:**
   - Eliminate manual job matching
   - Reduce time-to-hire
   - Improve hiring accuracy with skill-based matching

## 🔧 Technical Implementation

### Files Modified/Created:
- **`/src/lib/job-templates.js`** - Job templates and matching algorithm
- **`/src/pages/jobs.jsx`** - Enhanced with Quick Add templates modal
- **`/src/pages/upload.jsx`** - Enhanced candidate form with skill recommendations

### Key Functions:
- `calculateSkillMatch()` - Calculates match percentage between candidate and job
- `getJobTemplate()` - Retrieves a job template by title
- `getJobCategories()` - Returns all unique job categories
- `getJobsByCategory()` - Filters jobs by category

## 💡 Tips

1. **Customization**: Modify job templates in `/src/lib/job-templates.js` to match your organization's requirements
2. **Skill Matching**: The algorithm is flexible and handles variations (e.g., "JS" matches "JavaScript")
3. **Bulk Operations**: Upload multiple resumes to quickly build your candidate pool with auto-matching
4. **Category Organization**: Use job categories to organize positions for easier browsing

## 🚀 Future Enhancements

Potential improvements:
- Add custom job weights for specific industries
- Machine learning-based skill similarity matching
- Geographic location matching
- Salary range filtering
- Experience level matching
- Candidate ranking by match score
- Bulk candidate operations
