const express = require('express');
const router = express.Router();

const ACTION_VERBS = {
  leadership: [
    'Spearheaded', 'Directed', 'Championed', 'Orchestrated', 'Guided', 'Mentored',
    'Mobilized', 'Delegated', 'Empowered', 'Cultivated', 'Facilitated', 'Pioneered'
  ],
  development: [
    'Architected', 'Engineered', 'Programmed', 'Constructed', 'Refactored', 'Optimized',
    'Implemented', 'Deployed', 'Automated', 'Standardized', 'Modularized', 'Integrated'
  ],
  analysis: [
    'Benchmarked', 'Synthesized', 'Audited', 'Diagnosed', 'Evaluated', 'Forecasted',
    'Quantified', 'Dissected', 'Surveyed', 'Streamlined', 'Identified', 'Investigated'
  ],
  collaboration: [
    'Partnered', 'Coordinated', 'Negotiated', 'Liaised', 'Aligned', 'Co-authored',
    'Interfaced', 'Fostered', 'Synchronized', 'Consensus-built'
  ],
  results: [
    'Accelerated', 'Amplified', 'Boosted', 'Elevated', 'Maximized', 'Outperformed',
    'Surpassed', 'Generated', 'Saved', 'Transformed', 'Yielded'
  ]
};

const ROLE_BULLETS = {
  'Software Engineer': [
    'Designed and implemented microservices using Node.js/Express and React, improving system scalability by 40%.',
    'Refactored legacy codebase into modular TypeScript components, cutting developer onboarding time by 50%.',
    'Integrated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycles from days to minutes.',
    'Optimized SQL query performance and database indexing, decreasing average page response time by 300ms.',
    'Collaborated with cross-functional product and design teams to deliver 12+ customer-facing features ahead of deadline.'
  ],
  'Frontend Developer': [
    'Built dynamic, accessible, and responsive user interfaces with React, Tailwind CSS, and Redux/Zustand.',
    'Achieved a 95+ Google Lighthouse score across core web vitals through code-splitting and asset optimization.',
    'Implemented robust unit and end-to-end test suites using Jest and Playwright with 88% code coverage.',
    'Created a comprehensive design system of 40+ reusable UI components used by 5 engineering squads.'
  ],
  'Backend Developer': [
    'Engineered high-throughput RESTful & GraphQL APIs serving 2M+ requests daily with 99.98% uptime.',
    'Secured application infrastructure with OAuth 2.0, JWT authentication, and role-based access control (RBAC).',
    'Migrated on-premise relational database to cloud AWS PostgreSQL with zero downtime data migration.',
    'Implemented distributed caching with Redis, reducing database read latency by 65%.'
  ],
  'Product Manager': [
    'Defined product roadmap and led sprint ceremonies for a squad of 8 engineers and 2 UX designers.',
    'Conducted 45+ user research interviews and synthesized feedback to prioritize high-value feature backlog.',
    'Spearheaded the launch of MVP feature that acquired 50,000+ active users in the first quarter.',
    'Monitored key product metrics (CAC, LTV, Retention) using Mixpanel, driving a 15% increase in monthly active users.'
  ],
  'Data Scientist': [
    'Trained and evaluated machine learning models (XGBoost, Random Forest, PyTorch) yielding 92% predictive accuracy.',
    'Built automated ETL data pipelines processing 500GB+ daily data using Python, Pandas, and Apache Spark.',
    'Delivered interactive executive dashboards in Tableau/PowerBI translating complex data into actionable business strategies.',
    'Conducted rigorous A/B testing frameworks that optimized conversion funnel efficiency by 18%.'
  ],
  'Student / Intern': [
    'Developed a full-stack web application as capstone project utilizing React, Express.js, and MongoDB.',
    'Maintained a 3.8/4.0 GPA while serving as Teaching Assistant for Data Structures & Algorithms course.',
    'Won 1st place out of 60 teams at University Hackathon by developing an AI-driven accessibility tool.',
    'Contributed active open-source pull requests to popular JavaScript utility libraries.'
  ]
};

// GET /api/ai/action-verbs - Get categorized action verbs
router.get('/action-verbs', (req, res) => {
  res.json({ success: true, actionVerbs: ACTION_VERBS });
});

// GET /api/ai/suggestions - Get bullet point recommendations by role
router.get('/suggestions', (req, res) => {
  const role = req.query.role || 'Software Engineer';
  const bullets = ROLE_BULLETS[role] || ROLE_BULLETS['Software Engineer'];
  res.json({ success: true, role, suggestions: bullets });
});

// POST /api/ai/improve-bullet - Enhance user bullet point with action verbs and metrics
router.post('/improve-bullet', (req, res) => {
  const { bulletText, role } = req.body;
  if (!bulletText) {
    return res.status(400).json({ success: false, message: 'Bullet text is required' });
  }

  // Smart heuristic rule-based bullet enhancer
  let enhanced = bulletText.trim();
  
  // If starts with weak word, replace with strong verb
  const weakReplacements = [
    { from: /^worked on/i, to: 'Engineered and delivered' },
    { from: /^responsible for/i, to: 'Spearheaded the development and maintenance of' },
    { from: /^helped with/i, to: 'Collaborated across teams to streamline' },
    { from: /^made/i, to: 'Architected and implemented' },
    { from: /^handled/i, to: 'Orchestrated end-to-end execution of' },
    { from: /^did/i, to: 'Executed high-impact deliverables for' },
    { from: /^assisted in/i, to: 'Facilitated and accelerated' }
  ];

  for (const rule of weakReplacements) {
    if (rule.from.test(enhanced)) {
      enhanced = enhanced.replace(rule.from, rule.to);
      break;
    }
  }

  // Ensure ends with period
  if (!enhanced.endsWith('.')) {
    enhanced += '.';
  }

  // Generate 2 variations with metrics
  const variations = [
    enhanced,
    `${enhanced.replace(/\.$/, '')}, resulting in a 25% increase in operational efficiency.`,
    `${enhanced.replace(/\.$/, '')}, driving measurable improvements in reliability and system performance.`
  ];

  res.json({
    success: true,
    original: bulletText,
    suggestions: variations
  });
});

// POST /api/ai/generate-summary - Generate professional summary from role and top skills
router.post('/generate-summary', (req, res) => {
  const { jobTitle, yearsOfExp, topSkills = [] } = req.body;
  const title = jobTitle || 'Professional';
  const expText = yearsOfExp ? `${yearsOfExp}+ years of experience in` : 'proven track record in';
  const skillsText = topSkills.length > 0 ? topSkills.slice(0, 4).join(', ') : 'modern industry best practices';

  const summaries = [
    `Results-driven ${title} with ${expText} building high-impact solutions. Proficient in ${skillsText} with a strong commitment to clean code, scalable architecture, and user-centric problem solving.`,
    `Passionate and forward-thinking ${title} specializing in ${skillsText}. Adept at collaborating with cross-functional teams to translate complex business requirements into elegant, high-performance deliverables.`,
    `Detail-oriented ${title} with a solid foundation in ${skillsText}. Demonstrated success in optimizing workflows, driving product quality, and delivering mission-critical initiatives on schedule.`
  ];

  res.json({ success: true, summaries });
});

module.exports = router;
