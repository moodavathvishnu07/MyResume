import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileType,
  FileSpreadsheet,
  Printer,
  Layers,
  Link2,
  CheckCircle2,
  Zap,
  Image as ImageIcon,
  Check,
  Star,
  HelpCircle,
  ChevronDown,
  Layout,
  FileText,
  MousePointerClick,
  Award,
  Lock,
  Code2,
  ExternalLink,
  Briefcase,
  CheckCircle,
  Building2,
  GraduationCap
} from 'lucide-react';
import { sampleProfiles } from '../data/samples';

const TEMPLATES_SHOWCASE = [
  {
    id: 'ats-classic',
    name: 'ATS Classic Standard',
    desc: 'Single column, high-contrast layout engineered for 100% parseability by Workday, Greenhouse & Lever.',
    badge: '100% ATS',
    category: 'Universal',
    previewColor: '#1e3a8a',
    accentName: 'Navy ATS',
    layoutType: 'Single Column',
    idealFor: 'Software, Finance, All Industries'
  },
  {
    id: 'modern',
    name: 'Modern Tech & Sidebar',
    desc: 'Two-column layout with dark sidebar, avatar photo slot, skill pills, and social tags.',
    badge: 'Most Popular',
    category: 'Engineering',
    previewColor: '#ff6b00',
    accentName: 'Sunset Orange',
    layoutType: 'Two Column',
    idealFor: 'Full-Stack, DevOps, Cloud'
  },
  {
    id: 'executive',
    name: 'Executive & Corporate',
    desc: 'Authoritative layout with double border dividers and refined serif typography.',
    badge: 'Leadership',
    category: 'Management',
    previewColor: '#1e293b',
    accentName: 'Slate Navy',
    layoutType: 'Authoritative',
    idealFor: 'Directors, VPs, Senior Roles'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Clean',
    desc: 'Crisp geometric typography, generous whitespace, and minimal timeline rules.',
    badge: 'Sleek & Crisp',
    category: 'Design & Tech',
    previewColor: '#0f172a',
    accentName: 'Charcoal',
    layoutType: 'Minimalist',
    idealFor: 'UI/UX, Product, Tech'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    desc: 'Vibrant accent banner, avatar photo highlight, and visual project showcase cards.',
    badge: 'Visual Design',
    category: 'Creatives',
    previewColor: '#ff4500',
    accentName: 'Sunset Coral',
    layoutType: 'Visual Banner',
    idealFor: 'Designers, Frontend, Media'
  },
  {
    id: 'student',
    name: 'Student & Academic',
    desc: 'Education and coursework prioritized first for new graduates and internships.',
    badge: 'Freshers',
    category: 'Entry Level',
    previewColor: '#047857',
    accentName: 'Emerald Green',
    layoutType: 'Education First',
    idealFor: 'Graduates, Students, Interns'
  }
];

const COMPARISON_FEATURES = [
  {
    feature: 'Universal ATS 100% Compatibility',
    myResume: 'Guaranteed 98%+ Pass',
    generic: 'Partial / Often Fails',
    word: 'Unformatted'
  },
  {
    feature: 'Active Clickable Links in PDF & Word',
    myResume: 'Live Clickable Links',
    generic: 'Plain Text Only',
    word: 'Manual Setup'
  },
  {
    feature: 'Multi-Format Hub (PDF, DOCX, CSV)',
    myResume: 'Instant 1-Click All',
    generic: 'PDF Paywall Only',
    word: 'DOCX Only'
  },
  {
    feature: 'AI Bullet Enhancer & Metrics',
    myResume: 'Built-in Free',
    generic: '$20/mo Paid Addon',
    word: 'Not Available'
  },
  {
    feature: 'Direct On-Canvas Line Editing',
    myResume: 'Click Any Line to Edit',
    generic: 'Rigid Forms Only',
    word: 'Manual Dragging'
  },
  {
    feature: '100% Free Export (No Watermark)',
    myResume: 'No Watermarks Ever',
    generic: 'Hidden Paywalls',
    word: 'Free'
  }
];

const FAQS = [
  {
    q: 'Will my hyperlinks remain clickable when I export to PDF or Word?',
    a: 'Yes! myResume preserves all external links (LinkedIn, GitHub, custom Portfolio, Project URLs, email mailto, and phone tel links) as fully active, clickable hyperlinks in both exported PDFs and Microsoft Word (.DOCX) documents.'
  },
  {
    q: 'How does the ATS Score calculation work?',
    a: 'Our real-time ATS algorithm scans for contact completeness, strong action verbs, quantifiable metrics (% / $ / scale), keyword density, section structure, and ensures zero parsing blockers.'
  },
  {
    q: 'Can I export my resume as a CSV spreadsheet or JSON backup?',
    a: 'Absolutely! You can export your structured resume data to a CSV spreadsheet or a raw JSON backup file, and restore it anytime with 1 click.'
  },
  {
    q: 'Is my data saved automatically?',
    a: 'Yes, every keystroke is securely cached in your local browser storage so you will never lose your progress even if you refresh the page.'
  }
];

export function LandingPage({ onSelectTemplate, onSelectSample, onOpenSmartParser }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const handleLaunchBuilder = (templateId = null) => {
    if (templateId && onSelectTemplate) {
      onSelectTemplate(templateId);
    }
    navigate('/resume');
  };

  const handleLoadPresetAndGo = (sampleData) => {
    if (onSelectSample) {
      onSelectSample(sampleData);
    }
    navigate('/resume');
  };

  return (
    <div className="min-vh-100 d-flex flex-column position-relative bg-white text-dark pb-5 mb-5 pb-md-0 mb-md-0" style={{ paddingTop: '64px' }}>
      {/* Animated Floating Ambient Orbs */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-4" />
        <div className="ambient-mesh" />
      </div>

      {/* Permanently Fixed 100% Transparent Top Navbar */}
      <header
        className="navbar navbar-expand fixed-top z-3 fluid-screen-padding py-2.5 py-md-3 transparent-hero-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: 'transparent',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          zIndex: 1050
        }}
      >
        <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
          {/* Brand Logo (Clickable Home) */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
            className="d-flex align-items-center gap-1.5 gap-sm-2 cursor-pointer text-decoration-none user-select-none"
            title="myResume Home"
            style={{ cursor: 'pointer' }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm flex-shrink-0"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 50%, #ea580c 100%)',
                boxShadow: '0 4px 12px rgba(255, 107, 0, 0.35)'
              }}
            >
              <i className="bi bi-file-earmark-person-fill" style={{ fontSize: '15px' }}></i>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="fw-extrabold text-dark tracking-tight" style={{ fontWeight: 800, fontSize: 'clamp(1.1rem, 4vw, 1.35rem)' }}>
                my<span style={{ color: '#ff6b00' }}>Resume</span>
              </span>
              <span
                className="badge rounded-pill fw-bold font-monospace d-none d-sm-inline-block"
                style={{
                  backgroundColor: 'rgba(255, 107, 0, 0.12)',
                  color: '#ff6b00',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  fontSize: '9px'
                }}
              >
                PRO ATS
              </span>
            </div>
          </div>

          {/* Navigation Links & Action */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <a href="#templates" className="btn btn-link text-decoration-none text-secondary d-none d-md-inline-block small fw-semibold hover-text-dark">
              Templates
            </a>
            <a href="#features" className="btn btn-link text-decoration-none text-secondary d-none d-md-inline-block small fw-semibold hover-text-dark">
              Features
            </a>
            <a href="#advantage" className="btn btn-link text-decoration-none text-secondary d-none d-lg-inline-block small fw-semibold hover-text-dark">
              The Advantage
            </a>
            <a href="#faq" className="btn btn-link text-decoration-none text-secondary d-none d-lg-inline-block small fw-semibold hover-text-dark">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => navigate('/smartresume')}
              className="btn btn-light-secondary btn-sm px-2.5 px-sm-3 py-1.5 text-nowrap d-none d-sm-inline-flex"
              style={{ minHeight: '34px', fontSize: '12px' }}
            >
              <Sparkles size={13} style={{ color: '#ff4500' }} />
              <span>Smart AI</span>
            </button>
            <button
              type="button"
              onClick={() => handleLaunchBuilder()}
              className="btn btn-orange-primary btn-sm px-2.5 px-sm-3 py-1.5 shadow-sm text-nowrap"
              style={{ minHeight: '34px', fontSize: '12px' }}
            >
              <span>Open Studio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="position-relative py-2 py-sm-3 py-md-5 overflow-hidden">
        <div className="container position-relative z-1 py-1 py-md-4 text-center fluid-screen-padding">
          {/* Top Pill Badge */}
          <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-white border shadow-sm mb-3 mb-md-4" style={{ borderColor: '#cbd5e1', maxWidth: '98%' }}>
            <span
              className="d-inline-block rounded-circle flex-shrink-0"
              style={{
                width: '7px',
                height: '7px',
                backgroundColor: '#ff6b00',
                boxShadow: '0 0 6px #ff6b00'
              }}
            />
            <span className="small fw-bold text-dark font-monospace text-truncate" style={{ fontSize: '10.5px' }}>
              ATS 98% Compatibility Guaranteed • Multi-Format Engine
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fw-extrabold text-dark tracking-tight mb-2.5 mb-md-3 mx-auto"
            style={{
              fontWeight: 800,
              maxWidth: '860px',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              fontSize: 'clamp(1.75rem, 6.5vw, 3.5rem)'
            }}
          >
            Create an <span style={{ color: '#ff6b00' }}>ATS-Optimized Resume</span> That Lands Interviews.
          </h1>

          <p className="lead text-secondary mx-auto mb-3.5 mb-md-4 px-1" style={{ maxWidth: '640px', fontSize: '0.95rem', lineHeight: 1.55 }}>
            Build and export pixel-perfect resumes in a dedicated full-screen Studio with 6+ templates, active clickable links, AI bullet point enhancements, photo support, and instant PDF/DOCX/CSV downloads.
          </p>

          {/* Hero CTAs */}
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 gap-sm-2.5 gap-md-3 mb-4 mb-md-5 mx-auto" style={{ maxWidth: '540px' }}>
            <button
              type="button"
              onClick={() => handleLaunchBuilder()}
              className="btn btn-orange-primary py-2.5 py-sm-3 px-4 shadow-lg fs-6 w-100"
              style={{ minHeight: '46px' }}
            >
              <span>Launch Resume Studio</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => handleLoadPresetAndGo(sampleProfiles.softwareEngineer.data)}
              className="btn btn-light-secondary py-2.5 py-sm-3 px-4 fs-6 w-100"
              style={{ minHeight: '46px' }}
            >
              <Layers size={16} style={{ color: '#ff6b00' }} />
              <span>Load Demo Profile</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="row g-2 g-sm-2.5 g-md-3 justify-content-center max-w-4xl mx-auto pt-1 mb-3 mb-md-5">
            <div className="col-6 col-md-3">
              <div className="p-2.5 p-sm-3 rounded-4 bg-white border shadow-sm" style={{ borderColor: '#cbd5e1' }}>
                <div className="h4 h3-md fw-extrabold mb-0 font-monospace" style={{ color: '#ff6b00' }}>100%</div>
                <small className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>ATS Parseable</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 p-sm-3 rounded-4 bg-white border shadow-sm" style={{ borderColor: '#cbd5e1' }}>
                <div className="h4 h3-md fw-extrabold text-dark mb-0 font-monospace">6+</div>
                <small className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>Tailored Templates</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 p-sm-3 rounded-4 bg-white border shadow-sm" style={{ borderColor: '#cbd5e1' }}>
                <div className="h4 h3-md fw-extrabold text-dark mb-0 font-monospace">4 Formats</div>
                <small className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>PDF, DOCX, CSV, JSON</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 p-sm-3 rounded-4 bg-white border shadow-sm" style={{ borderColor: '#cbd5e1' }}>
                <div className="h4 h3-md fw-extrabold text-dark mb-0 font-monospace">Live</div>
                <small className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>Clickable Links</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Resume Templates Section */}
      <section id="templates" className="py-3 py-sm-4 py-md-5 position-relative z-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
        <div className="container py-2 py-md-4 fluid-screen-padding">
          <div className="text-center max-w-2xl mx-auto mb-3 mb-md-5">
            <span
              className="badge rounded-pill px-3 py-1 text-uppercase fw-bold mb-2 font-monospace"
              style={{ backgroundColor: 'rgba(255, 107, 0, 0.12)', color: '#ff6b00', fontSize: '11px' }}
            >
              Resume Templates
            </span>
            <h2 className="h4 h2-md fw-bold text-dark tracking-tight mb-1.5">
              Crafted for Every Career Stage & Industry
            </h2>
            <p className="text-secondary small mb-0">
              Select any template to immediately open and customize it in the live studio.
            </p>
          </div>

          <div className="row g-2.5 g-sm-3 g-md-4">
            {TEMPLATES_SHOWCASE.map(tpl => (
              <div key={tpl.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="studio-card-light h-100 d-flex flex-column justify-content-between p-3 p-sm-3.5 p-md-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLaunchBuilder(tpl.id)}
                >
                  <div>
                    {/* Top Meta Header */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge rounded-pill bg-light text-secondary border small" style={{ borderColor: '#cbd5e1', fontSize: '11px' }}>
                        {tpl.category}
                      </span>
                      <span
                        className="badge rounded-pill fw-bold font-monospace"
                        style={{
                          backgroundColor: 'rgba(255, 107, 0, 0.12)',
                          color: '#ff6b00',
                          fontSize: '10px'
                        }}
                      >
                        {tpl.badge}
                      </span>
                    </div>

                    {/* Template Card Visual Header Accent */}
                    <div
                      className="rounded-3 p-2.5 mb-2.5 d-flex align-items-center justify-content-between border"
                      style={{
                        backgroundColor: '#f8fafc',
                        borderColor: '#e2e8f0',
                        borderLeft: `4px solid ${tpl.previewColor}`
                      }}
                    >
                      <div>
                        <div className="fw-bold text-dark small">{tpl.name}</div>
                        <div className="text-secondary" style={{ fontSize: '10.5px' }}>{tpl.layoutType} • {tpl.idealFor}</div>
                      </div>
                      <span
                        className="rounded-circle shadow-2xs flex-shrink-0 ms-2"
                        style={{ width: '14px', height: '14px', backgroundColor: tpl.previewColor }}
                        title={tpl.accentName}
                      />
                    </div>

                    <p className="text-secondary small mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{tpl.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunchBuilder(tpl.id);
                    }}
                    className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2 fw-bold btn-sm py-2"
                    style={{ borderColor: '#ff6b00', color: '#ff6b00', minHeight: '42px', borderRadius: '10px' }}
                  >
                    <span>Use {tpl.name}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Enterprise Engineering Features Section */}
      <section id="features" className="py-3 py-sm-4 py-md-5 position-relative z-1">
        <div className="container py-2 py-md-4 fluid-screen-padding">
          <div className="text-center max-w-2xl mx-auto mb-3 mb-md-5">
            <span
              className="badge rounded-pill px-3 py-1 text-uppercase fw-bold mb-2 font-monospace"
              style={{ backgroundColor: 'rgba(255, 69, 0, 0.12)', color: '#ff4500', fontSize: '11px' }}
            >
              Enterprise Engineering
            </span>
            <h2 className="h4 h2-md fw-bold text-dark tracking-tight mb-1.5">
              Designed for Maximum Hiring Impact
            </h2>
            <p className="text-secondary small mb-0">
              Built with rigorous ATS compliance algorithms, hyperlinked vector generation, and smart AI metric enhancers.
            </p>
          </div>

          <div className="row g-2.5 g-sm-3 g-md-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="studio-card-light h-100 p-3 p-sm-3.5 p-md-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center mb-2.5"
                  style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255, 107, 0, 0.12)', color: '#ff6b00' }}
                >
                  <ShieldCheck size={20} />
                </div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Real-Time ATS Scorer</h6>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                  Instant 100-point audit assessing contact completeness, action verb power, metrics, and keyword density.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="studio-card-light h-100 p-3 p-sm-3.5 p-md-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center mb-2.5"
                  style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255, 69, 0, 0.12)', color: '#ff4500' }}
                >
                  <Link2 size={20} />
                </div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Active Clickable Links</h6>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                  Clickable links for LinkedIn, GitHub, custom Portfolio, and Project URLs preserved in PDF and Word DOCX.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="studio-card-light h-100 p-3 p-sm-3.5 p-md-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center mb-2.5"
                  style={{ width: '42px', height: '42px', backgroundColor: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}
                >
                  <FileType size={20} />
                </div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Multi-Format Hub</h6>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                  Export as vector-crisp PDF, Microsoft Word (.DOCX), structured CSV spreadsheet, or JSON backup.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="studio-card-light h-100 p-3 p-sm-3.5 p-md-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center mb-2.5"
                  style={{ width: '44px', height: '44px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}
                >
                  <Sparkles size={20} />
                </div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>AI Action Verbs & Bullets</h6>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                  100+ categorized power action verbs and AI bullet point enhancer that injects quantifiable impact metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Advantage (Comparison) Section */}
      <section id="advantage" className="py-3 py-sm-4 py-md-5 position-relative z-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
        <div className="container py-2 py-md-4 fluid-screen-padding" style={{ maxWidth: '960px' }}>
          <div className="text-center mb-3 mb-md-5">
            <span
              className="badge rounded-pill px-3 py-1 text-uppercase fw-bold mb-2 font-monospace"
              style={{ backgroundColor: 'rgba(255, 107, 0, 0.12)', color: '#ff6b00', fontSize: '11px' }}
            >
              The Advantage
            </span>
            <h2 className="h4 h2-md fw-bold text-dark tracking-tight mb-1.5">
              Why myResume Outperforms Old Builders
            </h2>
            <p className="text-secondary small mb-0">
              Direct comparison against generic web builders and basic Word document templates.
            </p>
          </div>

          {/* Mobile Comparison Cards (< 768px) */}
          <div className="d-flex d-md-none flex-column gap-2">
            {COMPARISON_FEATURES.map((item, idx) => (
              <div key={idx} className="p-3 rounded-4 bg-white border shadow-sm" style={{ borderColor: '#cbd5e1' }}>
                <div className="fw-bold text-dark small mb-2 pb-1 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: '#e2e8f0' }}>
                  <span>{item.feature}</span>
                  <span className="badge rounded-pill bg-success bg-opacity-15 text-success fw-bold" style={{ fontSize: '10px' }}>
                    PRO
                  </span>
                </div>

                <div className="d-flex flex-column gap-1.5 small">
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 107, 0, 0.08)' }}>
                    <span className="fw-bold" style={{ color: '#c2410c', fontSize: '12px' }}>myResume PRO</span>
                    <span className="fw-bold d-flex align-items-center gap-1" style={{ color: '#ff6b00', fontSize: '11.5px' }}>
                      <CheckCircle2 size={14} /> {item.myResume}
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between px-1.5 text-secondary" style={{ fontSize: '11px' }}>
                    <span>Generic Builders:</span>
                    <span className="text-muted">{item.generic}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between px-1.5 text-secondary" style={{ fontSize: '11px' }}>
                    <span>Word Templates:</span>
                    <span className="text-muted">{item.word}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="table-responsive rounded-4 border bg-white shadow-sm overflow-hidden d-none d-md-block" style={{ borderColor: '#cbd5e1' }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 text-dark fw-bold" style={{ width: '40%' }}>Core Capabilities</th>
                  <th className="py-3 px-3 text-center fw-bold" style={{ width: '30%', color: '#ff6b00', backgroundColor: 'rgba(255, 107, 0, 0.05)' }}>
                    myResume PRO
                  </th>
                  <th className="py-3 px-2 text-center text-secondary fw-semibold" style={{ width: '15%' }}>Generic Builders</th>
                  <th className="py-3 px-2 text-center text-secondary fw-semibold" style={{ width: '15%' }}>Word Templates</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-4 fw-semibold text-dark small">{item.feature}</td>
                    <td className="py-2.5 px-3 text-center fw-bold" style={{ color: '#ff6b00', backgroundColor: 'rgba(255, 107, 0, 0.05)', fontSize: '12px' }}>
                      <span className="d-inline-flex align-items-center gap-1.5">
                        <CheckCircle2 size={16} /> {item.myResume}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center small text-secondary">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary" style={{ fontSize: '10px' }}>{item.generic}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center small text-secondary">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary" style={{ fontSize: '10px' }}>{item.word}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section id="faq" className="py-3 py-sm-4 py-md-5 position-relative z-1">
        <div className="container py-2 py-md-4 fluid-screen-padding" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-3 mb-md-5">
            <span
              className="badge rounded-pill px-3 py-1 text-uppercase fw-bold mb-2 font-monospace"
              style={{ backgroundColor: 'rgba(255, 107, 0, 0.12)', color: '#ff6b00', fontSize: '11px' }}
            >
              FAQ
            </span>
            <h2 className="h4 h2-md fw-bold text-dark tracking-tight mb-1.5">
              Frequently Asked Questions
            </h2>
            <p className="text-secondary small mb-0">
              Everything you need to know about ATS scoring, active links, and exports.
            </p>
          </div>

          <div className="d-flex flex-column gap-2">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-3 p-sm-3.5 rounded-4 bg-white border shadow-sm transition"
                style={{
                  borderColor: openFaq === idx ? '#ff6b00' : '#cbd5e1',
                  cursor: 'pointer',
                  boxShadow: openFaq === idx ? '0 8px 20px rgba(255, 107, 0, 0.1)' : 'var(--shadow-sm)'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bold text-dark small" style={{ fontSize: '0.925rem' }}>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className="text-secondary transition ms-2 flex-shrink-0"
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: openFaq === idx ? '#ff6b00' : undefined
                    }}
                  />
                </div>
                {openFaq === idx && (
                  <p className="text-secondary small mt-2 mb-0 pt-2.5 border-top" style={{ borderColor: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.55 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Impact Glowing CTA Banner */}
      <section className="py-3 py-sm-4 py-md-5 position-relative z-1">
        <div className="container py-2 py-md-3 fluid-screen-padding">
          <div
            className="p-3.5 p-sm-4 p-md-5 rounded-5 text-white text-center shadow-2xl position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 60%, #ea580c 100%)',
              boxShadow: '0 25px 60px -15px rgba(255, 107, 0, 0.45)'
            }}
          >
            <h2 className="h4 h2-md fw-extrabold mb-2">
              Ready to Build Your Winning Resume?
            </h2>
            <p className="text-white-50 mx-auto mb-3 small" style={{ maxWidth: '540px' }}>
              Join thousands of engineers, designers, managers, and students crafting ATS-perfect resumes in seconds.
            </p>
            <button
              type="button"
              onClick={() => handleLaunchBuilder()}
              className="btn btn-light text-dark fw-bold py-2.5 px-4 rounded-pill shadow-lg small d-inline-flex align-items-center gap-2"
              style={{ minHeight: '44px' }}
            >
              <span>Launch Resume Studio Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="py-4 border-top bg-white position-relative z-1" style={{ borderColor: '#e2e8f0' }}>
        <div className="container fluid-screen-padding d-flex flex-column flex-md-row align-items-center justify-content-between gap-2.5 text-secondary small text-center text-md-start">
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <span className="fw-extrabold text-dark">my<span style={{ color: '#ff6b00' }}>Resume</span></span>
            <span>• Universal ATS & CV Studio</span>
          </div>
          <div>
            © 2026 myResume. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Persistent Mobile Bottom CTA Dock */}
      <div className="position-fixed bottom-0 start-0 end-0 p-2 bg-white bg-opacity-95 border-top d-flex d-md-none justify-content-center z-3 shadow-lg" style={{ borderColor: '#cbd5e1', backdropFilter: 'blur(16px)' }}>
        <button
          type="button"
          onClick={() => handleLaunchBuilder()}
          className="btn btn-orange-primary w-100 rounded-pill py-2.5 shadow-md font-monospace fw-bold small"
          style={{ maxWidth: '420px', minHeight: '44px' }}
        >
          <Sparkles size={16} />
          <span>Launch Resume Studio — Free</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
