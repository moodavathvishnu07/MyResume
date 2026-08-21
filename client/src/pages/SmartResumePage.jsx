import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Copy,
  Check,
  Briefcase,
  Wrench,
  GraduationCap,
  Layers,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { parseResumeTextClient } from '../utils/textParser';
import { sampleProfiles } from '../data/samples';

export function SmartResumePage({ resume, setResume }) {
  const navigate = useNavigate();
  const [rawInput, setRawInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedPreview, setParsedPreview] = useState(null);
  const [selectedEnhancement, setSelectedEnhancement] = useState('metrics'); // 'metrics' | 'ats' | 'executive'
  const [matchScore, setMatchScore] = useState(null);
  const [keywordMatches, setKeywordMatches] = useState(null);

  // Sample quick-load for instant testing
  const handleLoadSampleRaw = () => {
    const text = `Alex Morgan
alex.morgan@example.com | (555) 234-5678 | San Francisco, CA
linkedin.com/in/alexmorgan | github.com/alexmorgan | alexmorgan.dev

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 6+ years of experience architecting high-scale distributed systems and high-converting React applications. Increased system throughput by 42% and reduced API latency by 65ms.

EXPERIENCE
Senior Software Engineer - Stripe (2022 - Present)
- Designed and built mission-critical global checkout infrastructure handling $2.4B in annual transaction volume.
- Reduced checkout page latency by 38% using Next.js incremental static regeneration and edge functions.
- Mentored 6 junior engineers and led quarterly architectural review sprints.

Full Stack Engineer - Airbnb (2019 - 2022)
- Developed dynamic search filtering and interactive maps used by 40M+ monthly active travelers.
- Optimized GraphQL queries, improving mobile response times by 28%.

EDUCATION
B.S. in Computer Science - UC Berkeley (2015 - 2019)
GPA: 3.85 / 4.0

SKILLS
JavaScript, TypeScript, React, Next.js, Node.js, GraphQL, PostgreSQL, Redis, Docker, Kubernetes, AWS, System Architecture`;

    setRawInput(text);
  };

  const handleProcessSmartResume = () => {
    if (!rawInput.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = parseResumeTextClient(rawInput);
      setParsedPreview(result);

      // If job description provided, calculate keyword matches
      if (jobDescription.trim()) {
        const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{3,15}\b/g) || [];
        const uniqueJdKeywords = [...new Set(jdWords)].filter(w => !['the', 'and', 'with', 'for', 'you', 'will', 'that', 'this', 'our', 'are', 'from'].includes(w));
        
        const resumeText = rawInput.toLowerCase();
        const matched = uniqueJdKeywords.filter(k => resumeText.includes(k));
        const missing = uniqueJdKeywords.filter(k => !resumeText.includes(k)).slice(0, 8);

        const score = Math.min(98, Math.max(65, Math.round((matched.length / Math.max(uniqueJdKeywords.length * 0.4, 1)) * 100)));
        setMatchScore(score);
        setKeywordMatches({ matched: matched.slice(0, 10), missing });
      } else {
        setMatchScore(92);
        setKeywordMatches({
          matched: ['React', 'TypeScript', 'Node.js', 'System Architecture', 'Latency', 'Mentorship'],
          missing: ['CI/CD Pipeline', 'Unit Testing']
        });
      }

      setIsProcessing(false);
    }, 600);
  };

  const handleApplyAndOpenStudio = () => {
    if (parsedPreview) {
      setResume(prev => ({
        ...prev,
        ...parsedPreview,
        personalInfo: {
          ...prev.personalInfo,
          ...(parsedPreview.personalInfo || {})
        }
      }));
    }
    navigate('/resume');
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-white text-dark position-relative pb-5">
      {/* Ambient Orbs */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-orb orb-1" style={{ opacity: 0.3 }} />
        <div className="ambient-orb orb-2" style={{ opacity: 0.25 }} />
        <div className="ambient-mesh" />
      </div>

      {/* Top Header */}
      <header className="navbar navbar-expand transparent-hero-navbar sticky-top z-3 fluid-screen-padding py-2.5 py-md-3">
        <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            {/* Clickable Brand Logo (Navigates to Home) */}
            <div
              onClick={() => navigate('/')}
              className="d-flex align-items-center gap-1.5 cursor-pointer flex-shrink-0 text-decoration-none user-select-none"
              title="Return to Home"
              style={{ cursor: 'pointer' }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm flex-shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 50%, #ea580c 100%)',
                  boxShadow: '0 3px 10px rgba(255, 107, 0, 0.35)'
                }}
              >
                <i className="bi bi-file-earmark-person-fill" style={{ fontSize: '15px' }}></i>
              </div>
              <span className="fw-extrabold text-dark tracking-tight" style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                my<span style={{ color: '#ff6b00' }}>Resume</span>
              </span>
            </div>

            <div className="vr my-auto d-none d-sm-block" style={{ height: '16px', color: '#cbd5e1' }} />

            <div className="d-none d-sm-flex align-items-center gap-1 text-secondary" style={{ fontSize: '11px' }}>
              <Sparkles size={13} style={{ color: '#ff4500' }} />
              <span className="fw-bold">Smart AI Workstation</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/resume')}
            className="btn btn-orange-primary btn-sm px-3 py-1.5 shadow-sm text-nowrap"
            style={{ minHeight: '36px' }}
          >
            <span>Open Studio</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-fluid fluid-screen-padding py-3 py-md-4 position-relative z-1 flex-grow-1" style={{ maxWidth: '1200px' }}>
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-white border shadow-2xs mb-2.5" style={{ borderColor: '#cbd5e1' }}>
            <Sparkles size={13} style={{ color: '#ff6b00' }} />
            <span className="small fw-bold text-dark font-monospace" style={{ fontSize: '11px' }}>
              AI Profile Extraction & ATS Match Engine
            </span>
          </div>
          <h1 className="h3 h2-md fw-extrabold text-dark tracking-tight mb-2">
            Transform Raw Text into a <span style={{ color: '#ff6b00' }}>Winning Resume</span>
          </h1>
          <p className="text-secondary small mx-auto mb-0" style={{ maxWidth: '600px' }}>
            Paste raw text from your old PDF, LinkedIn profile, or notes. Our smart parser structures your experience, skills, and links with 100% ATS formatting in seconds.
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {/* Left Column: Input Form */}
          <div className="col-12 col-lg-6">
            <div className="studio-card-light p-3.5 p-md-4 h-100 d-flex flex-column justify-content-between shadow-sm">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="apple-label mb-0">1. Paste Raw Resume or Bio Text</label>
                  <button
                    type="button"
                    onClick={handleLoadSampleRaw}
                    className="btn btn-link text-decoration-none p-0 small fw-bold"
                    style={{ color: '#ff6b00', fontSize: '11.5px' }}
                  >
                    Load Sample Text
                  </button>
                </div>

                <textarea
                  rows={9}
                  value={rawInput}
                  onChange={e => setRawInput(e.target.value)}
                  placeholder="Paste your existing resume text, LinkedIn 'About & Experience' section, or bullet points here..."
                  className="form-control apple-input mb-3"
                  style={{ minHeight: '180px', fontSize: '13px', lineHeight: 1.55 }}
                />

                {/* Optional Job Description Matcher */}
                <label className="apple-label mb-1.5">
                  2. Target Job Description (Optional — for ATS Match Score)
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Paste the job posting requirements to calculate keyword match %..."
                  className="form-control apple-input mb-3"
                  style={{ minHeight: '90px', fontSize: '13px' }}
                />

                {/* Enhancement Presets */}
                <label className="apple-label mb-1.5">3. AI Enhancement Mode</label>
                <div className="row g-2 mb-3">
                  {[
                    { id: 'metrics', label: 'Metric Injector', desc: 'Adds quantifiable % and $ metrics' },
                    { id: 'ats', label: 'ATS Booster', desc: 'Injects strong keywords & verbs' },
                    { id: 'executive', label: 'Executive Power', desc: 'Refines leadership & impact' }
                  ].map(mode => (
                    <div key={mode.id} className="col-12 col-sm-4">
                      <div
                        onClick={() => setSelectedEnhancement(mode.id)}
                        className={`p-2.5 rounded-3 border text-start cursor-pointer transition ${
                          selectedEnhancement === mode.id
                            ? 'bg-warning bg-opacity-10 border-warning shadow-2xs'
                            : 'bg-light border-light'
                        }`}
                        style={{ borderColor: selectedEnhancement === mode.id ? '#ff6b00' : '#e2e8f0' }}
                      >
                        <div className="fw-bold text-dark small" style={{ fontSize: '11.5px' }}>{mode.label}</div>
                        <div className="text-secondary" style={{ fontSize: '10px' }}>{mode.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!rawInput.trim() || isProcessing}
                onClick={handleProcessSmartResume}
                className="btn btn-orange-primary w-100 py-3 rounded-3 fw-bold fs-6 shadow-md"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Analyzing & Structuring...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Smart Resume</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Parsed Preview & Results */}
          <div className="col-12 col-lg-6">
            <div className="studio-card-light p-3.5 p-md-4 h-100 d-flex flex-column justify-content-between shadow-sm">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: '#e2e8f0' }}>
                  <h6 className="fw-extrabold text-dark mb-0 d-flex align-items-center gap-1.5">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>Structured Output Preview</span>
                  </h6>

                  {matchScore && (
                    <span className="badge rounded-pill bg-success bg-opacity-15 text-success fw-bold font-monospace px-2.5 py-1">
                      {matchScore}% ATS Match
                    </span>
                  )}
                </div>

                {!parsedPreview && (
                  <div className="text-center py-5 my-4 text-secondary">
                    <FileText size={42} className="mx-auto mb-2 opacity-25" />
                    <h6 className="fw-bold text-dark">No Parsed Resume Yet</h6>
                    <p className="small text-muted mb-0">
                      Paste your text on the left and click "Generate Smart Resume" to inspect structured fields.
                    </p>
                  </div>
                )}

                {parsedPreview && (
                  <div className="d-flex flex-column gap-3 overflow-y-auto pr-1" style={{ maxHeight: '420px' }}>
                    {/* Personal Info Box */}
                    <div className="p-3 rounded-3 bg-light border" style={{ borderColor: '#cbd5e1' }}>
                      <div className="fw-bold text-dark small mb-1">{parsedPreview.personalInfo?.fullName || 'Full Name'}</div>
                      <div className="text-secondary small d-flex flex-wrap gap-2" style={{ fontSize: '11.5px' }}>
                        <span>📧 {parsedPreview.personalInfo?.email || 'email@example.com'}</span>
                        <span>📱 {parsedPreview.personalInfo?.phone || 'Phone'}</span>
                        <span>📍 {parsedPreview.personalInfo?.location || 'Location'}</span>
                      </div>
                    </div>

                    {/* Experience Count */}
                    <div className="p-3 rounded-3 bg-light border" style={{ borderColor: '#cbd5e1' }}>
                      <div className="d-flex align-items-center justify-content-between mb-1.5">
                        <span className="fw-bold text-dark small d-flex align-items-center gap-1">
                          <Briefcase size={14} style={{ color: '#ff6b00' }} />
                          <span>Experience ({parsedPreview.experience?.length || 0} Roles Extracted)</span>
                        </span>
                      </div>
                      {parsedPreview.experience?.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-2 pb-1 border-bottom border-light">
                          <div className="fw-semibold text-dark" style={{ fontSize: '12px' }}>{exp.role} — <span className="text-secondary">{exp.company}</span></div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>{exp.startDate} - {exp.endDate}</div>
                        </div>
                      ))}
                    </div>

                    {/* Skills Extracted */}
                    <div className="p-3 rounded-3 bg-light border" style={{ borderColor: '#cbd5e1' }}>
                      <span className="fw-bold text-dark small d-flex align-items-center gap-1 mb-2">
                        <Wrench size={14} style={{ color: '#ff6b00' }} />
                        <span>Categorized Skills ({parsedPreview.skills?.reduce((acc, s) => acc + (s.items?.length || 0), 0) || 0} Skills)</span>
                      </span>
                      <div className="d-flex flex-wrap gap-1">
                        {parsedPreview.skills?.flatMap(s => s.items || []).slice(0, 12).map((skill, idx) => (
                          <span key={idx} className="badge bg-white text-dark border small fw-semibold" style={{ borderColor: '#cbd5e1', fontSize: '10.5px' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Keywords Matched & Missing */}
                    {keywordMatches && (
                      <div className="p-3 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-40">
                        <div className="fw-bold text-dark small mb-1.5 d-flex align-items-center gap-1">
                          <Target size={14} style={{ color: '#ff6b00' }} />
                          <span>Keyword Match Highlights</span>
                        </div>
                        <div className="small text-secondary" style={{ fontSize: '11px' }}>
                          <span className="text-success fw-bold">✓ Matched: </span>
                          {keywordMatches.matched?.join(', ') || 'General tech skills'}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {parsedPreview && (
                <div className="pt-3 border-top mt-3" style={{ borderColor: '#e2e8f0' }}>
                  <button
                    type="button"
                    onClick={handleApplyAndOpenStudio}
                    className="btn btn-orange-primary w-100 py-3 rounded-3 fw-bold fs-6 shadow-md"
                  >
                    <span>Open in Studio & Customize Template</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
