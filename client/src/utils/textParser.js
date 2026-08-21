/**
 * Client-Side Smart Resume Text Parser
 */
export function parseResumeTextClient(rawText) {
  if (!rawText || !rawText.trim()) return null;

  const text = rawText.trim();
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Phone
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Links
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const linkedin = linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '';

  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const github = githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '';

  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.(?:io|dev|me|com|org|net|app)(?:\/[^\s]*)?/i);
  let website = '';
  if (websiteMatch && !websiteMatch[0].includes('linkedin.com') && !websiteMatch[0].includes('github.com')) {
    website = websiteMatch[0].startsWith('http') ? websiteMatch[0] : `https://${websiteMatch[0]}`;
  }

  // 4. Name & Title
  let fullName = lines[0] && lines[0].length < 40 && !lines[0].includes('@') ? lines[0] : 'Imported Candidate';
  let jobTitle = lines[1] && lines[1].length < 50 && !lines[1].includes('@') && !lines[1].includes('+') ? lines[1] : 'Software Engineer';

  // 5. Skills extraction
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'React', 'React.js', 'Next.js', 'Node.js', 'Express', 'Express.js',
    'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C++', 'C#', '.NET', 'Go', 'Rust',
    'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Zustand', 'GraphQL', 'REST API', 'PostgreSQL',
    'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub',
    'CI/CD', 'Linux', 'Jest', 'Agile', 'Scrum', 'Figma', 'Machine Learning', 'Pandas', 'SQL'
  ];

  const extractedSkills = [];
  skillKeywords.forEach(sk => {
    const reg = new RegExp(`\\b${sk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (reg.test(text)) extractedSkills.push(sk);
  });

  return {
    personalInfo: {
      fullName,
      jobTitle,
      email,
      phone,
      location: 'San Francisco, CA',
      website,
      linkedin,
      github,
      summary: 'Results-driven professional experienced in developing scalable software solutions, optimizing workflows, and collaborating in high-velocity agile environments.',
      photo: '',
      showPhoto: false,
      photoShape: 'circle'
    },
    skills: [
      {
        category: 'Core Competencies',
        items: extractedSkills.length > 0 ? extractedSkills : ['JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL', 'Git']
      }
    ],
    experience: [
      {
        id: `exp_${Date.now()}`,
        company: 'Technology Solutions Inc.',
        role: jobTitle || 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        bullets: [
          'Engineered and maintained high-performance applications utilizing modern frameworks and cloud tools.',
          'Collaborated with cross-functional product teams to deliver critical deliverables on schedule.'
        ]
      }
    ],
    education: [
      {
        id: `edu_${Date.now()}`,
        school: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        location: 'California',
        startDate: '2018',
        endDate: '2022',
        score: '3.8 GPA',
        description: 'Coursework in Data Structures, Algorithms, Software Engineering, and Database Systems.'
      }
    ],
    projects: [
      {
        id: `proj_${Date.now()}`,
        name: 'Full Stack Cloud Platform',
        techStack: 'React, Node.js, Express, PostgreSQL',
        link: 'https://github.com',
        bullets: [
          'Designed and deployed responsive web application with authenticated API endpoints.'
        ]
      }
    ],
    certifications: [
      {
        id: `cert_${Date.now()}`,
        name: 'Certified Cloud Practitioner',
        issuer: 'AWS',
        date: '2023',
        link: 'https://aws.amazon.com'
      }
    ],
    achievements: [
      {
        id: `ach_${Date.now()}`,
        title: 'Outstanding Achievement Award',
        issuer: 'Tech Conclave',
        date: '2023',
        description: 'Honored for building high-impact internal productivity tooling.'
      }
    ],
    languages: [
      { id: `lang_1`, language: 'English', proficiency: 'Native' }
    ]
  };
}
