import { saveAs } from 'file-saver';

/**
 * Exports complete resume structured data to CSV file
 */
export function exportResumeToCsv(resume) {
  const p = resume.personalInfo || {};
  let rows = [];

  rows.push(['SECTION', 'FIELD_OR_ROLE', 'VALUE_OR_DETAIL', 'EXTRA_INFO', 'DATES_OR_LINK']);

  // Personal Info
  rows.push(['Personal Info', 'Full Name', `"${(p.fullName || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Job Title', `"${(p.jobTitle || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Email', `"${(p.email || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Phone', `"${(p.phone || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Location', `"${(p.location || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'LinkedIn', `"${(p.linkedin || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'GitHub', `"${(p.github || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Website', `"${(p.website || '').replace(/"/g, '""')}"`, '', '']);
  rows.push(['Personal Info', 'Summary', `"${(p.summary || '').replace(/"/g, '""')}"`, '', '']);

  // Education
  (resume.education || []).forEach(edu => {
    rows.push([
      'Education',
      `"${(edu.degree || '').replace(/"/g, '""')}"`,
      `"${(edu.school || '').replace(/"/g, '""')}"`,
      `"GPA: ${(edu.score || '').replace(/"/g, '""')} | ${(edu.description || '').replace(/"/g, '""')}"`,
      `"${edu.startDate || ''} - ${edu.endDate || ''}"`
    ]);
  });

  // Experience
  (resume.experience || []).forEach(exp => {
    rows.push([
      'Experience',
      `"${(exp.role || '').replace(/"/g, '""')}"`,
      `"${(exp.company || '').replace(/"/g, '""')} (${exp.location || ''})"`,
      `"${(exp.bullets || []).join(' ;; ').replace(/"/g, '""')}"`,
      `"${exp.startDate || ''} - ${exp.endDate || ''}"`
    ]);
  });

  // Skills
  (resume.skills || []).forEach(sk => {
    rows.push([
      'Skills',
      `"${(sk.category || 'General').replace(/"/g, '""')}"`,
      `"${(sk.items || []).join(', ').replace(/"/g, '""')}"`,
      '',
      ''
    ]);
  });

  // Projects
  (resume.projects || []).forEach(pr => {
    rows.push([
      'Projects',
      `"${(pr.name || '').replace(/"/g, '""')}"`,
      `"Tech: ${(pr.techStack || '').replace(/"/g, '""')}"`,
      `"${(pr.bullets || []).join(' ;; ').replace(/"/g, '""')}"`,
      `"${pr.link || ''}"`
    ]);
  });

  // Certifications
  (resume.certifications || []).forEach(c => {
    rows.push([
      'Certifications',
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.issuer || '').replace(/"/g, '""')}"`,
      `"Date: ${c.date || ''}"`,
      `"${c.link || ''}"`
    ]);
  });

  // Achievements
  (resume.achievements || []).forEach(a => {
    rows.push([
      'Achievements',
      `"${(a.title || '').replace(/"/g, '""')}"`,
      `"${(a.issuer || '').replace(/"/g, '""')}"`,
      `"${(a.description || '').replace(/"/g, '""')}"`,
      `"${a.date || ''}"`
    ]);
  });

  // Languages
  (resume.languages || []).forEach(l => {
    rows.push([
      'Languages',
      `"${(l.language || '').replace(/"/g, '""')}"`,
      `"${(l.proficiency || '').replace(/"/g, '""')}"`,
      '',
      ''
    ]);
  });

  const csvString = rows.map(r => r.join(',')).join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const filename = `${(p.fullName || 'Resume').replace(/\s+/g, '_')}_data.csv`;
  saveAs(blob, filename);
}

/**
 * Parses uploaded CSV text and constructs a resume state
 */
export function parseResumeCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return null;

  const parsed = {
    personalInfo: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: []
  };

  // Helper to split CSV row handling quotes
  const parseRow = (row) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const c = row[i];
      if (c === '"' && (i === 0 || row[i - 1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
    return result;
  };

  for (let i = 1; i < lines.length; i++) {
    const cols = parseRow(lines[i]);
    const section = cols[0];
    const f1 = cols[1] || '';
    const f2 = cols[2] || '';
    const f3 = cols[3] || '';
    const f4 = cols[4] || '';

    if (section === 'Personal Info') {
      if (f1 === 'Full Name') parsed.personalInfo.fullName = f2;
      if (f1 === 'Job Title') parsed.personalInfo.jobTitle = f2;
      if (f1 === 'Email') parsed.personalInfo.email = f2;
      if (f1 === 'Phone') parsed.personalInfo.phone = f2;
      if (f1 === 'Location') parsed.personalInfo.location = f2;
      if (f1 === 'LinkedIn') parsed.personalInfo.linkedin = f2;
      if (f1 === 'GitHub') parsed.personalInfo.github = f2;
      if (f1 === 'Website') parsed.personalInfo.website = f2;
      if (f1 === 'Summary') parsed.personalInfo.summary = f2;
    } else if (section === 'Education') {
      const dates = f4.split('-');
      parsed.education.push({
        id: `edu_${Date.now()}_${i}`,
        degree: f1,
        school: f2,
        startDate: dates[0]?.trim() || '',
        endDate: dates[1]?.trim() || '',
        score: f3.split('|')[0]?.replace(/GPA:\s*/i, '').trim() || '',
        description: f3.split('|')[1]?.trim() || ''
      });
    } else if (section === 'Experience') {
      const dates = f4.split('-');
      const bullets = f3 ? f3.split(';;').map(b => b.trim()).filter(Boolean) : [];
      parsed.experience.push({
        id: `exp_${Date.now()}_${i}`,
        role: f1,
        company: f2,
        location: '',
        startDate: dates[0]?.trim() || '',
        endDate: dates[1]?.trim() || '',
        current: (dates[1] || '').toLowerCase().includes('present'),
        bullets: bullets.length > 0 ? bullets : ['Led technical initiatives and project execution.']
      });
    } else if (section === 'Skills') {
      const items = f2.split(',').map(s => s.trim()).filter(Boolean);
      parsed.skills.push({
        category: f1,
        items
      });
    } else if (section === 'Projects') {
      const bullets = f3 ? f3.split(';;').map(b => b.trim()).filter(Boolean) : [];
      parsed.projects.push({
        id: `proj_${Date.now()}_${i}`,
        name: f1,
        techStack: f2.replace(/^Tech:\s*/i, ''),
        link: f4,
        bullets
      });
    } else if (section === 'Certifications') {
      parsed.certifications.push({
        id: `cert_${Date.now()}_${i}`,
        name: f1,
        issuer: f2,
        date: f3.replace(/^Date:\s*/i, ''),
        link: f4
      });
    } else if (section === 'Languages') {
      parsed.languages.push({
        id: `lang_${Date.now()}_${i}`,
        language: f1,
        proficiency: f2
      });
    }
  }

  return parsed;
}
