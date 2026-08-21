export const sampleProfiles = {
  softwareEngineer: {
    name: 'Software Engineer',
    badge: 'Tech & Cloud',
    data: {
      personalInfo: {
        fullName: 'Alexander Vance',
        jobTitle: 'Senior Full Stack Software Engineer',
        email: 'alexander.vance@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://alexandervance.dev',
        linkedin: 'https://linkedin.com/in/alexander-vance',
        github: 'https://github.com/alexvance',
        summary: 'High-performing Software Engineer with 6+ years of experience architecting distributed cloud systems, modern React frontends, and scalable Node.js microservices. Proven record of slashing latency by 40% and leading engineering squads.',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        showPhoto: true,
        photoShape: 'circle'
      },
      education: [
        {
          id: 'edu_1',
          school: 'University of California, Berkeley',
          degree: 'B.S. in Computer Science',
          location: 'Berkeley, CA',
          startDate: '2016',
          endDate: '2020',
          score: '3.88 / 4.0 GPA',
          description: 'Dean’s Honor List. Lead Organizer for CalHacks (1,500+ participants).'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'Apex Cloud Solutions',
          role: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: 'Mar 2022',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected a multi-tenant SaaS platform handling 4.2M daily requests with 99.99% availability.',
            'Engineered responsive real-time dashboards utilizing React 18, TypeScript, and WebSockets, boosting retention by 28%.',
            'Spearheaded migration to event-driven microservices on AWS (ECS, Lambda, SQS), reducing annual cloud spend by $45K.',
            'Mentored 6 junior engineers through structured code reviews and system design workshops.'
          ]
        },
        {
          id: 'exp_2',
          company: 'Starlight Interactive',
          role: 'Full Stack Developer',
          location: 'Palo Alto, CA',
          startDate: 'Aug 2020',
          endDate: 'Feb 2022',
          current: false,
          bullets: [
            'Developed RESTful & GraphQL backend APIs in Node.js/Express, cutting payload latency by 35%.',
            'Implemented OAuth2 and JWT authentication protocols with role-based access control.',
            'Collaborated with design team to build an accessible component system in React & Tailwind.'
          ]
        }
      ],
      skills: [
        { category: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL'] },
        { category: 'Frameworks', items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Redux/Zustand'] },
        { category: 'Cloud & DevOps', items: ['AWS (ECS, S3, RDS)', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'PostgreSQL', 'Redis'] }
      ],
      projects: [
        {
          id: 'proj_1',
          name: 'OmniStream — Real-Time Collaborative Canvas',
          techStack: 'React, WebSockets, Node.js, Redis',
          link: 'https://github.com/alexvance/omnistream',
          bullets: [
            'Constructed a low-latency infinite canvas for 100+ concurrent editors with CRDTs.',
            'Surpassed 15,000+ GitHub stars and featured on Hacker News.'
          ]
        }
      ],
      certifications: [
        { id: 'cert_1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023', link: 'https://aws.amazon.com/verification' }
      ],
      achievements: [
        { id: 'ach_1', title: '1st Place Silicon Valley Hackathon', issuer: 'SV Tech Summit', date: '2023', description: 'Awarded grand prize among 200+ teams for AI accessibility platform.' }
      ],
      languages: [
        { id: 'lang_1', language: 'English', proficiency: 'Native' },
        { id: 'lang_2', language: 'Spanish', proficiency: 'Professional' }
      ]
    }
  },

  productManager: {
    name: 'Product Manager',
    badge: 'Product & Strategy',
    data: {
      personalInfo: {
        fullName: 'Elena Rostova',
        jobTitle: 'Senior Product Manager — Growth & Mobile',
        email: 'elena.rostova@productgrowth.io',
        phone: '+1 (555) 891-3421',
        location: 'New York, NY',
        website: 'https://elenarostova.co',
        linkedin: 'https://linkedin.com/in/elena-rostova-pm',
        github: 'https://github.com/elenarostova',
        summary: 'Strategic Product Leader with 7+ years directing cross-functional squads across SaaS and consumer mobile apps. Generated $18M+ ARR by spearheading user activation funnels, running data-backed A/B experiments, and delivering customer-obsessed feature roadmaps.',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        showPhoto: true,
        photoShape: 'rounded'
      },
      education: [
        {
          id: 'edu_1',
          school: 'Columbia University',
          degree: 'MBA in Product Strategy & Innovation',
          location: 'New York, NY',
          startDate: '2017',
          endDate: '2019',
          score: '3.92 GPA',
          description: 'President of Tech & Product Society. Finalist at Columbia Venture Competition.'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'Nexus FinTech Labs',
          role: 'Lead Product Manager (Onboarding & Activation)',
          location: 'New York, NY',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Owned the global user onboarding lifecycle, lifting Day-30 user retention from 22% to 37% across 1.2M downloads.',
            'Managed quarterly product roadmaps across 14 engineers, 3 product designers, and 2 data scientists.',
            'Conducted 60+ customer discovery interviews and synthesized telemetry metrics into actionable sprint epics.'
          ]
        },
        {
          id: 'exp_2',
          company: 'HyperScale Media',
          role: 'Product Manager',
          location: 'Boston, MA',
          startDate: '2019',
          endDate: '2021',
          current: false,
          bullets: [
            'Pioneered self-serve subscription tier resulting in $3.4M net-new ARR within 8 months of launch.',
            'Redesigned checkout funnel, reducing cart abandonment rate by 19.4% through iterative multivariate testing.'
          ]
        }
      ],
      skills: [
        { category: 'Product Strategy', items: ['Roadmapping', 'User Journey Mapping', 'A/B Testing', 'OKRs & KPIs', 'Competitive Analysis'] },
        { category: 'Analytics & Tools', items: ['Mixpanel', 'Amplitude', 'SQL', 'Tableau', 'Jira', 'Figma', 'Postman'] },
        { category: 'Methodologies', items: ['Agile / Scrum', 'Design Thinking', 'Growth Hacking', 'Continuous Discovery'] }
      ],
      projects: [
        {
          id: 'proj_1',
          name: 'Frictionless KYC Verification Engine',
          techStack: 'Biometrics API, React Native, Node.js',
          link: 'https://nexusfin.com/kyc-flow',
          bullets: [
            'Reduced identity verification drop-off time from 8 minutes to 45 seconds.'
          ]
        }
      ],
      certifications: [
        { id: 'cert_1', name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', date: '2020', link: 'https://scrumalliance.org' }
      ],
      achievements: [
        { id: 'ach_1', title: 'Top 50 Women in Product Honoree', issuer: 'Product School', date: '2023', description: 'Recognized for innovation in frictionless mobile user experiences.' }
      ],
      languages: [
        { id: 'lang_1', language: 'English', proficiency: 'Native' },
        { id: 'lang_2', language: 'French', proficiency: 'Fluent' }
      ]
    }
  },

  dataScientist: {
    name: 'Data Scientist & AI',
    badge: 'AI & Analytics',
    data: {
      personalInfo: {
        fullName: 'Dr. Marcus Thorne',
        jobTitle: 'Lead AI & Machine Learning Scientist',
        email: 'marcus.thorne@ai-research.org',
        phone: '+1 (555) 742-9901',
        location: 'Seattle, WA',
        website: 'https://marcusthorne.ai',
        linkedin: 'https://linkedin.com/in/dr-marcus-thorne',
        github: 'https://github.com/mthorne-ai',
        summary: 'Applied ML Researcher and Lead Data Scientist with Ph.D. in Computer Science. Specialized in Large Language Models, PyTorch, computer vision, and high-throughput vector search pipelines. Published 8 peer-reviewed papers in NeurIPS & ICML.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        showPhoto: true,
        photoShape: 'circle'
      },
      education: [
        {
          id: 'edu_1',
          school: 'University of Washington',
          degree: 'Ph.D. in Artificial Intelligence & Robotics',
          location: 'Seattle, WA',
          startDate: '2016',
          endDate: '2020',
          score: '3.96 GPA',
          description: 'Thesis: "Self-Supervised Representation Learning for High-Dimensional Sparse Graphs".'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'Veridian AI Systems',
          role: 'Principal Machine Learning Scientist',
          location: 'Seattle, WA',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Engineered custom RAG architecture and quantized LLM inference service serving 50,000 queries per second at sub-80ms latency.',
            'Trained multimodal computer vision models utilizing PyTorch and DistributedDataParallel across 128 NVIDIA H100 GPUs.',
            'Improved recommendation precision by 32% over legacy collaborative filtering algorithms.'
          ]
        }
      ],
      skills: [
        { category: 'AI & Machine Learning', items: ['PyTorch', 'TensorFlow', 'LLMs / Transformers', 'Hugging Face', 'LangChain', 'Scikit-Learn'] },
        { category: 'Data Engineering', items: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Pandas/NumPy', 'Milvus / Pinecone Vector DB'] },
        { category: 'Infrastructure', items: ['Kubernetes (Kubeflow)', 'Docker', 'AWS SageMaker', 'MLflow', 'Triton Inference Server'] }
      ],
      projects: [
        {
          id: 'proj_1',
          name: 'FastEmbed — Ultra-Compact Vector Embeddings',
          techStack: 'Python, Rust, ONNX Runtime',
          link: 'https://github.com/mthorne-ai/fast-embed',
          bullets: [
            'Created a blazing-fast embedding inference pipeline with 4x memory compression and zero CPU overhead.'
          ]
        }
      ],
      certifications: [
        { id: 'cert_1', name: 'Google Cloud Certified Professional ML Engineer', issuer: 'Google Cloud', date: '2022', link: 'https://cloud.google.com/certification' }
      ],
      achievements: [
        { id: 'ach_1', title: 'Best Paper Award — NeurIPS Workshop', issuer: 'NeurIPS', date: '2022', description: 'Awarded for novel work in sparse transformer attention layers.' }
      ],
      languages: [
        { id: 'lang_1', language: 'English', proficiency: 'Native' },
        { id: 'lang_2', language: 'German', proficiency: 'Professional' }
      ]
    }
  },

  studentFresher: {
    name: 'Student & Graduate',
    badge: 'Academic & Entry Level',
    data: {
      personalInfo: {
        fullName: 'Sophia Chen',
        jobTitle: 'Junior Software Engineer & CS Graduate',
        email: 'sophia.chen@university.edu',
        phone: '+1 (555) 432-8765',
        location: 'Austin, TX',
        website: 'https://sophiachen.me',
        linkedin: 'https://linkedin.com/in/sophia-chen-cs',
        github: 'https://github.com/sophiachen-code',
        summary: 'Motivated Computer Science graduate from UT Austin with top honors (3.91 GPA). Strong fundamentals in Data Structures, Algorithms, and Full-Stack Web Development. Passionate about building modern, user-friendly digital experiences.',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
        showPhoto: true,
        photoShape: 'circle'
      },
      education: [
        {
          id: 'edu_1',
          school: 'The University of Texas at Austin',
          degree: 'B.S. in Computer Science (Minor in Business Foundations)',
          location: 'Austin, TX',
          startDate: '2020',
          endDate: '2024',
          score: '3.91 / 4.0 GPA',
          description: 'Graduated Summa Cum Laude. Undergraduate Teaching Assistant for Data Structures. President of Women in CS (WiCS).'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'Dell Technologies',
          role: 'Software Engineering Intern',
          location: 'Round Rock, TX',
          startDate: 'May 2023',
          endDate: 'Aug 2023',
          current: false,
          bullets: [
            'Developed internal diagnostics dashboard in React and Node.js, reducing server triage duration by 30%.',
            'Implemented automated unit testing with Jest achieving 92% code coverage on core telemetry services.',
            'Presented end-of-internship capstone project to company VP of Cloud Infrastructure.'
          ]
        }
      ],
      skills: [
        { category: 'Programming Languages', items: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
        { category: 'Web Technologies', items: ['React.js', 'HTML5', 'CSS3', 'Node.js', 'Express.js', 'Tailwind CSS'] },
        { category: 'Developer Tools', items: ['Git', 'GitHub', 'VS Code', 'Docker Basics', 'Linux Command Line', 'Postman'] }
      ],
      projects: [
        {
          id: 'proj_1',
          name: 'StudyBuddy — Peer Tutoring Marketplace',
          techStack: 'React, Express.js, MongoDB, Socket.io',
          link: 'https://github.com/sophiachen-code/studybuddy',
          bullets: [
            'Built real-time messaging and appointment scheduling platform adopted by 800+ university students.'
          ]
        },
        {
          id: 'proj_2',
          name: 'Algorithmic Visualizer',
          techStack: 'React, Canvas, TypeScript',
          link: 'https://sophiachen.me/algo-viz',
          bullets: [
            'Interactive step-by-step animator for Dijkstra, A* search, and sorting algorithms.'
          ]
        }
      ],
      certifications: [
        { id: 'cert_1', name: 'Meta Front-End Developer Specialization', issuer: 'Coursera / Meta', date: '2023', link: 'https://coursera.org' }
      ],
      achievements: [
        { id: 'ach_1', title: '1st Place — HackTX 2023', issuer: 'HackTX', date: '2023', description: 'Built an AI speech-to-text note assistant for students with hearing impairments.' }
      ],
      languages: [
        { id: 'lang_1', language: 'English', proficiency: 'Native' },
        { id: 'lang_2', language: 'Mandarin Chinese', proficiency: 'Fluent' }
      ]
    }
  }
};
