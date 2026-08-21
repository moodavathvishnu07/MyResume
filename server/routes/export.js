const express = require('express');
const router = express.Router();

/**
 * Convert JSON resume to CSV format
 */
router.post('/to-csv', (req, res) => {
  const resume = req.body;
  if (!resume) {
    return res.status(400).json({ success: false, message: 'Resume data required' });
  }

  const p = resume.personalInfo || {};
  let csvRows = [];

  // Section 1: Personal Info
  csvRows.push(['SECTION', 'FIELD', 'VALUE', 'EXTRA_1', 'EXTRA_2']);
  csvRows.push(['Personal Info', 'Full Name', `"${(p.fullName || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Job Title', `"${(p.jobTitle || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Email', `"${(p.email || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Phone', `"${(p.phone || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Location', `"${(p.location || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'LinkedIn', `"${(p.linkedin || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'GitHub', `"${(p.github || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Website', `"${(p.website || '').replace(/"/g, '""')}"`, '', '']);
  csvRows.push(['Personal Info', 'Summary', `"${(p.summary || '').replace(/"/g, '""')}"`, '', '']);

  // Section 2: Education
  (resume.education || []).forEach((edu, idx) => {
    csvRows.push([
      'Education',
      `Degree #${idx + 1}`,
      `"${(edu.degree || '').replace(/"/g, '""')}"`,
      `"${(edu.school || '').replace(/"/g, '""')}"`,
      `"${edu.startDate || ''} - ${edu.endDate || ''} | GPA: ${edu.score || ''}"`
    ]);
  });

  // Section 3: Experience
  (resume.experience || []).forEach((exp, idx) => {
    const bulletsJoined = (exp.bullets || []).join(' ;; ');
    csvRows.push([
      'Experience',
      `Role #${idx + 1}`,
      `"${(exp.role || '').replace(/"/g, '""')} at ${(exp.company || '').replace(/"/g, '""')}"`,
      `"${exp.startDate || ''} - ${exp.endDate || ''} (${exp.location || ''})"`,
      `"${bulletsJoined.replace(/"/g, '""')}"`
    ]);
  });

  // Section 4: Skills
  (resume.skills || []).forEach(sk => {
    csvRows.push([
      'Skills',
      `Category: ${sk.category || 'General'}`,
      `"${(sk.items || []).join(', ').replace(/"/g, '""')}"`,
      '',
      ''
    ]);
  });

  // Section 5: Projects
  (resume.projects || []).forEach((proj, idx) => {
    csvRows.push([
      'Projects',
      `Project #${idx + 1}`,
      `"${(proj.name || '').replace(/"/g, '""')}"`,
      `"Tech: ${(proj.techStack || '').replace(/"/g, '""')} | Link: ${proj.link || ''}"`,
      `"${(proj.bullets || []).join(' ;; ').replace(/"/g, '""')}"`
    ]);
  });

  // Section 6: Certifications
  (resume.certifications || []).forEach((c, idx) => {
    csvRows.push([
      'Certifications',
      `Cert #${idx + 1}`,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.issuer || '').replace(/"/g, '""')} (${c.date || ''})"`,
      `"${c.link || ''}"`
    ]);
  });

  // Section 7: Languages
  (resume.languages || []).forEach((l, idx) => {
    csvRows.push([
      'Languages',
      `Lang #${idx + 1}`,
      `"${(l.language || '').replace(/"/g, '""')}"`,
      `"${(l.proficiency || '').replace(/"/g, '""')}"`,
      ''
    ]);
  });

  const csvContent = csvRows.map(r => r.join(',')).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="resume_data.csv"');
  res.send(csvContent);
});

module.exports = router;
