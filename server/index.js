const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/aiAssistant');
const parserRoutes = require('./routes/parser');
const exportRoutes = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Resume & CV Builder API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/parse', parserRoutes);
app.use('/api/export', exportRoutes);

// Static Client Serving (Production / Standalone Docker)
const path = require('path');
const fs = require('fs');
const clientDistPath = path.join(__dirname, 'dist');
const altClientDistPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else if (fs.existsSync(altClientDistPath)) {
  app.use(express.static(altClientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(altClientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Resume Builder Express Server running on http://localhost:${PORT}`);
});
