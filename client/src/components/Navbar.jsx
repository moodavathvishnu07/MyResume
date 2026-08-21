import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Upload,
  ShieldCheck,
  ChevronDown,
  Layers,
  FileType,
  FileSpreadsheet,
  Printer,
  Home,
  Sliders,
  FileEdit
} from 'lucide-react';
import { sampleProfiles } from '../data/samples';
import { calculateAtsScore } from '../utils/atsScorer';

export function Navbar({
  resume,
  onLoadSample,
  onOpenAtsModal,
  onOpenImportExport,
  onOpenSmartParser,
  onExportPdf,
  onExportDocx,
  onExportCsv,
  onScrollToEditor,
  onScrollToTop
}) {
  const [samplesOpen, setSamplesOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const ats = calculateAtsScore(resume);

  return (
    <header className="navbar navbar-expand glass-navbar sticky-top z-3 px-3 px-md-4 py-2.5">
      <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
        {/* Brand / Logo: myResume */}
        <div
          className="d-flex align-items-center gap-2 gap-md-3 text-decoration-none cursor-pointer"
          onClick={onScrollToTop}
          style={{ cursor: 'pointer' }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm"
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 50%, #ea580c 100%)',
              boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)'
            }}
          >
            <i className="bi bi-file-earmark-person-fill fs-5"></i>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-extrabold fs-5 text-dark tracking-tight" style={{ fontWeight: 800 }}>
                mera<span style={{ color: '#ff6b00' }}>Resume</span>
              </span>
              <span
                className="badge rounded-pill fw-bold font-monospace"
                style={{
                  backgroundColor: 'rgba(255, 107, 0, 0.12)',
                  color: '#ff6b00',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  fontSize: '10px'
                }}
              >
                PRO ATS
              </span>
            </div>
            <small className="text-secondary d-none d-sm-block" style={{ fontSize: '11px' }}>
              Design • Multi-Format Studio • Clickable Links
            </small>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {/* Quick Jump to Studio */}
          <button
            onClick={onScrollToEditor}
            className="btn btn-light-secondary btn-sm d-none d-md-flex align-items-center gap-1.5"
            type="button"
          >
            <FileEdit size={14} className="text-warning" />
            <span>Studio</span>
          </button>

          {/* Sample Preset Dropdown */}
          <div className="position-relative">
            <button
              onClick={() => setSamplesOpen(!samplesOpen)}
              className="btn btn-light-secondary btn-sm d-flex align-items-center gap-1.5"
              type="button"
            >
              <Layers size={13} style={{ color: '#ff6b00' }} />
              <span className="d-none d-md-inline">Sample Profiles</span>
              <ChevronDown size={12} />
            </button>

            {samplesOpen && (
              <div
                className="position-absolute end-0 mt-2 glass-dropdown-light rounded-3 p-1.5 z-3 animate-fadeIn"
                style={{ width: '230px' }}
              >
                <div className="px-2 py-1 text-uppercase text-secondary fw-bold" style={{ fontSize: '10px' }}>
                  1-Click Presets
                </div>
                {Object.entries(sampleProfiles).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onLoadSample(item.data);
                      setSamplesOpen(false);
                      onScrollToEditor();
                    }}
                    className="btn btn-light w-100 text-start d-flex align-items-center justify-content-between p-2 rounded-2 border-0 mb-1"
                    style={{ fontSize: '12px' }}
                  >
                    <span className="fw-semibold text-dark">{item.name}</span>
                    <span
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: 'rgba(255, 107, 0, 0.12)',
                        color: '#ff6b00',
                        fontSize: '10px'
                      }}
                    >
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Smart Parser */}
          <button
            onClick={onOpenSmartParser}
            className="btn btn-light-secondary btn-sm d-flex align-items-center gap-1.5"
            type="button"
            title="Import text from PDF, Word or LinkedIn"
          >
            <Sparkles size={13} style={{ color: '#ff4500' }} />
            <span className="d-none d-lg-inline">Smart Parser</span>
          </button>

          {/* ATS Score Indicator */}
          <button
            onClick={onOpenAtsModal}
            className="btn btn-light-secondary btn-sm d-flex align-items-center gap-2 border shadow-sm"
            type="button"
            title="Inspect ATS Score Breakdown"
          >
            <ShieldCheck size={16} style={{ color: ats.badgeColor }} />
            <span className="fw-bold font-mono text-dark" style={{ fontSize: '12px' }}>
              {ats.score}%
            </span>
            <span className="text-secondary d-none d-xl-inline small">ATS</span>
          </button>

          {/* Export Dropdown */}
          <div className="position-relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5 shadow"
              type="button"
            >
              <Download size={14} />
              <span className="fw-bold">Export</span>
              <ChevronDown size={12} />
            </button>

            {exportOpen && (
              <div
                className="position-absolute end-0 mt-2 glass-dropdown-light rounded-3 p-2 z-3 animate-fadeIn"
                style={{ width: '270px' }}
              >
                <div className="px-2 py-1 text-uppercase text-secondary fw-bold" style={{ fontSize: '10px' }}>
                  Download with Active Links
                </div>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onExportPdf();
                  }}
                  className="btn btn-light w-100 text-start d-flex align-items-center gap-2.5 p-2 rounded-2 border-0 mb-1"
                >
                  <Printer size={16} className="text-danger" />
                  <div>
                    <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Print / PDF Document</div>
                    <small className="text-secondary d-block" style={{ fontSize: '10px' }}>Crisp vector print & live links</small>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onExportDocx();
                  }}
                  className="btn btn-light w-100 text-start d-flex align-items-center gap-2.5 p-2 rounded-2 border-0 mb-1"
                >
                  <FileType size={16} style={{ color: '#ff6b00' }} />
                  <div>
                    <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Word Document (.DOCX)</div>
                    <small className="text-secondary d-block" style={{ fontSize: '10px' }}>Office OpenXML with links</small>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onExportCsv();
                  }}
                  className="btn btn-light w-100 text-start d-flex align-items-center gap-2.5 p-2 rounded-2 border-0 mb-1"
                >
                  <FileSpreadsheet size={16} className="text-success" />
                  <div>
                    <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Spreadsheet Data (.CSV)</div>
                    <small className="text-secondary d-block" style={{ fontSize: '10px' }}>Structured data tables</small>
                  </div>
                </button>

                <div className="border-top border-light my-1" />

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onOpenImportExport();
                  }}
                  className="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 fw-bold"
                  style={{ color: '#ff6b00', fontSize: '12px' }}
                >
                  <Upload size={14} />
                  <span>More Formats & Import Hub...</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
