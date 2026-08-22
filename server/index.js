const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/aiAssistant');
const parserRoutes = require('./routes/parser');
const exportRoutes = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 5000;
const clientDistPath = path.join(__dirname, 'dist');
const altClientDistPath = path.join(__dirname, '../client/dist');


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

const defaultRobotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: https://meraresume.onrender.com/sitemap.xml
`;

const defaultSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://meraresume.onrender.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://meraresume.onrender.com/resume</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://meraresume.onrender.com/smartresume</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

// Explicit SEO routes for Robots & Sitemap with guaranteed delivery
app.get('/robots.txt', (req, res) => {
  const possiblePaths = [
    path.join(clientDistPath, 'robots.txt'),
    path.join(altClientDistPath, 'robots.txt'),
    path.join(__dirname, '../client/public/robots.txt')
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return res.type('text/plain; charset=utf-8').sendFile(path.resolve(p));
    }
  }
  res.type('text/plain; charset=utf-8').send(defaultRobotsTxt);
});

app.get('/sitemap.xml', (req, res) => {
  const possiblePaths = [
    path.join(clientDistPath, 'sitemap.xml'),
    path.join(altClientDistPath, 'sitemap.xml'),
    path.join(__dirname, '../client/public/sitemap.xml')
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return res.type('application/xml; charset=utf-8').sendFile(path.resolve(p));
    }
  }
  res.type('application/xml; charset=utf-8').send(defaultSitemapXml);
});

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
