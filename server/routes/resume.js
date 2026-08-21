const express = require('express');
const router = express.Router();

// In-memory store with sample initial store
let resumes = {};

// GET /api/resumes - List all saved resumes
router.get('/', (req, res) => {
  const list = Object.keys(resumes).map(id => ({
    id,
    name: resumes[id].personalInfo?.fullName || 'Untitled Resume',
    title: resumes[id].personalInfo?.jobTitle || '',
    updatedAt: resumes[id].updatedAt || new Date().toISOString()
  }));
  res.json({ success: true, count: list.length, resumes: list });
});

// GET /api/resumes/:id - Get specific resume
router.get('/:id', (req, res) => {
  const resume = resumes[req.params.id];
  if (!resume) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }
  res.json({ success: true, resume });
});

// POST /api/resumes - Save or create resume
router.post('/', (req, res) => {
  const resumeData = req.body;
  const id = resumeData.id || `resume_${Date.now()}`;
  resumes[id] = {
    ...resumeData,
    id,
    updatedAt: new Date().toISOString()
  };
  res.status(201).json({ success: true, id, message: 'Resume saved successfully' });
});

// DELETE /api/resumes/:id - Delete a resume
router.delete('/:id', (req, res) => {
  if (resumes[req.params.id]) {
    delete resumes[req.params.id];
    return res.json({ success: true, message: 'Resume deleted successfully' });
  }
  res.status(404).json({ success: false, message: 'Resume not found' });
});

module.exports = router;
