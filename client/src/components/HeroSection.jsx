import React from 'react';
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
  Image as ImageIcon
} from 'lucide-react';
import { sampleProfiles } from '../data/samples';

export function HeroSection({ onScrollToEditor, onLoadSample, onOpenSmartParser, onOpenAtsModal }) {
  return (
    <section className="hero-section position-relative py-5 overflow-hidden">
      <div className="container position-relative z-1 py-4">
        {/* Top Badge */}
        <div className="d-flex justify-content-center mb-3">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-warning border-opacity-50 shadow-sm">
            <span
              className="d-inline-block rounded-circle"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#ff6b00',
                boxShadow: '0 0 8px #ff6b00'
              }}
            />
            <span className="small fw-bold text-dark font-monospace" style={{ fontSize: '11px' }}>
              ATS 98% Compatibility Guaranteed • Multi-Format Engine
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-4" style={{ maxWidth: '820px' }}>
          <h1
            className="display-5 fw-extrabold text-dark tracking-tight mb-3"
            style={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Design an <span style={{ color: '#ff6b00' }}>ATS-Perfect Resume</span> That Gets You Hired.
          </h1>
          <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '640px', fontSize: '1.1rem' }}>
            Build, customize, and export professional resumes with 6+ tailored templates, live clickable hyperlinks, profile image upload, smart AI bullet assistance, and instant multi-format downloads.
          </p>

          {/* Primary Action Buttons with Hover Effects */}
          <div className="d-flex flex-wrap items-center justify-content-center gap-3 mb-5">
            <button
              type="button"
              onClick={onScrollToEditor}
              className="btn btn-orange-primary py-2.5 px-4 shadow-lg"
              style={{ fontSize: '1rem' }}
            >
              <span>Start Building My Resume</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => onLoadSample(sampleProfiles.softwareEngineer.data)}
              className="btn btn-light-secondary py-2.5 px-3.5"
            >
              <Layers size={16} className="text-warning" />
              <span>Load Demo Profile</span>
            </button>

            <button
              type="button"
              onClick={onOpenSmartParser}
              className="btn btn-light-secondary py-2.5 px-3.5"
            >
              <Sparkles size={16} style={{ color: '#ff4500' }} />
              <span>Smart Document Parser</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="row g-3 justify-content-center">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="studio-card-light h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(255, 107, 0, 0.12)',
                    color: '#ff6b00'
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Fortune 500 ATS Proof</h6>
                <p className="text-secondary small mb-0">
                  Engineered to bypass Workday, Greenhouse, and Lever filters with clean semantic parsing.
                </p>
              </div>
              <div className="mt-3 pt-2 border-top border-light d-flex align-items-center gap-1 text-warning small fw-semibold">
                <CheckCircle2 size={14} />
                <span>Real-Time Scorer</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="studio-card-light h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(255, 69, 0, 0.12)',
                    color: '#ff4500'
                  }}
                >
                  <Link2 size={22} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Clickable Links Everywhere</h6>
                <p className="text-secondary small mb-0">
                  LinkedIn, GitHub, Portfolio, and Project URLs stay live and clickable in PDF & Word DOCX.
                </p>
              </div>
              <div className="mt-3 pt-2 border-top border-light d-flex align-items-center gap-1 text-danger small fw-semibold">
                <CheckCircle2 size={14} />
                <span>Active Hyperlinks</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="studio-card-light h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(249, 115, 22, 0.12)',
                    color: '#f97316'
                  }}
                >
                  <FileType size={22} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Multi-Format Exports</h6>
                <p className="text-secondary small mb-0">
                  Download as PDF, Microsoft Word (.DOCX), structured CSV spreadsheet, or JSON backup.
                </p>
              </div>
              <div className="mt-3 pt-2 border-top border-light d-flex align-items-center gap-1 text-warning small fw-semibold">
                <CheckCircle2 size={14} />
                <span>PDF, DOCX & CSV</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="studio-card-light h-100 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    color: '#ef4444'
                  }}
                >
                  <ImageIcon size={22} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Photo & 6+ Templates</h6>
                <p className="text-secondary small mb-0">
                  ATS Classic, Modern Tech, Executive, Minimalist, Creative Portfolio, and Student layouts.
                </p>
              </div>
              <div className="mt-3 pt-2 border-top border-light d-flex align-items-center gap-1 text-danger small fw-semibold">
                <CheckCircle2 size={14} />
                <span>Custom Styling Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
