export const emptyResumeState = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    photo: '',
    showPhoto: false,
    photoShape: 'circle'
  },
  education: [
    {
      id: 'edu_1',
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      score: '',
      description: ''
    }
  ],
  experience: [
    {
      id: 'exp_1',
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    }
  ],
  skills: [
    {
      category: 'Technical Skills',
      items: []
    }
  ],
  projects: [
    {
      id: 'proj_1',
      name: '',
      techStack: '',
      link: '',
      bullets: ['']
    }
  ],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: []
};

// Default initial state starts fresh and clean
export const initialResumeState = emptyResumeState;

export const defaultSettings = {
  template: 'ats-classic', // Starts with universal ATS standard
  primaryColor: '#ff6b00',
  textColor: '#1f2937',
  fontFamily: 'Plus Jakarta Sans',
  fontSize: 'medium',
  spacing: 'normal',
  showPhoto: false,
  photoShape: 'circle',
  sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'achievements', 'languages']
};
