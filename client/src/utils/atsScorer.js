/**
 * Real-time ATS Resume Scorer & Analyzer
 * Computes an aggregate score out of 100 with actionable feedback.
 */
export function calculateAtsScore(resume) {
  let score = 0;
  const breakdown = [];
  const suggestions = [];

  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];

  // 1. Contact Information Completeness (Max 20 pts)
  let contactScore = 0;
  if (p.fullName && p.fullName.trim().length > 2) contactScore += 4;
  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) contactScore += 4;
  if (p.phone && p.phone.trim().length >= 7) contactScore += 4;
  if (p.location && p.location.trim().length > 2) contactScore += 3;
  if (p.linkedin && p.linkedin.includes('linkedin.com')) contactScore += 3;
  if (p.github || p.website) contactScore += 2;

  score += Math.min(20, contactScore);
  breakdown.push({
    category: 'Contact & Links',
    score: Math.min(20, contactScore),
    max: 20,
    status: contactScore >= 16 ? 'pass' : 'warn'
  });

  if (!p.linkedin) {
    suggestions.push('Add a valid LinkedIn profile URL with clickable format.');
  }
  if (!p.github && !p.website) {
    suggestions.push('Include a GitHub or portfolio URL to showcase your live work.');
  }

  // 2. Summary & Impact Statement (Max 15 pts)
  let summaryScore = 0;
  if (p.summary && p.summary.trim().length >= 50) {
    summaryScore += 10;
    if (p.summary.length >= 120 && p.summary.length <= 400) {
      summaryScore += 5; // Ideal length
    } else {
      summaryScore += 2;
    }
  }
  score += Math.min(15, summaryScore);
  breakdown.push({
    category: 'Professional Summary',
    score: Math.min(15, summaryScore),
    max: 15,
    status: summaryScore >= 12 ? 'pass' : 'warn'
  });

  if (!p.summary || p.summary.length < 50) {
    suggestions.push('Write a concise 2-4 sentence professional summary highlighting your core expertise.');
  }

  // 3. Work Experience & Action Verbs (Max 25 pts)
  let expScore = 0;
  let totalBullets = 0;
  let hasMetrics = false;
  let hasActionVerbs = false;

  const actionVerbPatterns = /^(Spearheaded|Architected|Engineered|Developed|Led|Managed|Designed|Implemented|Built|Optimized|Increased|Reduced|Scaled|Pioneered|Orchestrated|Automated)/i;
  const metricPattern = /(\d+[%kM$+]|\b\d+\s*(percent|users|ms|seconds|hours|teams|times)\b)/i;

  if (exp.length > 0) {
    expScore += 10; // has experience section
    exp.forEach(e => {
      (e.bullets || []).forEach(b => {
        totalBullets++;
        if (actionVerbPatterns.test(b.trim())) hasActionVerbs = true;
        if (metricPattern.test(b)) hasMetrics = true;
      });
    });

    if (totalBullets >= 4) expScore += 5;
    if (hasActionVerbs) expScore += 5;
    if (hasMetrics) expScore += 5;
  }
  score += Math.min(25, expScore);
  breakdown.push({
    category: 'Work History & Bullet Points',
    score: Math.min(25, expScore),
    max: 25,
    status: expScore >= 20 ? 'pass' : 'warn'
  });

  if (!hasMetrics) {
    suggestions.push('Quantify your experience bullets with measurable metrics (e.g., "improved speed by 30%", "managed 5 developers").');
  }
  if (!hasActionVerbs) {
    suggestions.push('Begin your bullet points with strong action verbs (e.g. Architected, Spearheaded, Engineered).');
  }

  // 4. Skills & Keywords Coverage (Max 20 pts)
  let totalSkillCount = 0;
  skills.forEach(s => {
    totalSkillCount += (s.items || []).length;
  });

  let skillScore = 0;
  if (totalSkillCount >= 5) skillScore += 10;
  if (totalSkillCount >= 10) skillScore += 5;
  if (skills.length >= 2) skillScore += 5; // Categorized skills

  score += Math.min(20, skillScore);
  breakdown.push({
    category: 'Skills & Keyword Density',
    score: Math.min(20, skillScore),
    max: 20,
    status: skillScore >= 15 ? 'pass' : 'warn'
  });

  if (totalSkillCount < 8) {
    suggestions.push('Add at least 8-12 industry-relevant technical and soft skill keywords.');
  }

  // 5. Education, Projects & Certifications (Max 20 pts)
  let extraScore = 0;
  if (edu.length > 0 && edu[0].school && edu[0].degree) extraScore += 8;
  if (projects.length > 0) extraScore += 6;
  if (certs.length > 0) extraScore += 6;

  score += Math.min(20, extraScore);
  breakdown.push({
    category: 'Education, Projects & Credentials',
    score: Math.min(20, extraScore),
    max: 20,
    status: extraScore >= 14 ? 'pass' : 'warn'
  });

  if (projects.length === 0) {
    suggestions.push('Add 1-2 notable projects with links and tech stacks.');
  }

  // Final Grade
  let grade = 'Needs Work';
  let badgeColor = '#ef4444';
  if (score >= 90) {
    grade = 'ATS Master / Excellent';
    badgeColor = '#10b981';
  } else if (score >= 75) {
    grade = 'Competitive & Strong';
    badgeColor = '#0071e3';
  } else if (score >= 60) {
    grade = 'Good / Needs Optimization';
    badgeColor = '#f59e0b';
  }

  return {
    score: Math.min(100, score),
    grade,
    badgeColor,
    breakdown,
    suggestions
  };
}
