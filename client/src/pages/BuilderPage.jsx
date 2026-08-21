import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Download,
  Upload,
  ShieldCheck,
  ChevronDown,
  Layers,
  FileType,
  FileSpreadsheet,
  Printer,
  Check,
  RotateCcw,
  Sliders,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
  Edit3,
  FilePlus,
  Trash2,
  Eye,
  FileEdit,
  MoreVertical,
  Maximize2,
  Share2,
  X
} from 'lucide-react';
import { sampleProfiles } from '../data/samples';
import { emptyResumeState } from '../types/resume';
import { calculateAtsScore } from '../utils/atsScorer';

import { SectionNav } from '../components/Editor/SectionNav';
import { PersonalInfoForm } from '../components/Editor/PersonalInfoForm';
import { EducationForm } from '../components/Editor/EducationForm';
import { ExperienceForm } from '../components/Editor/ExperienceForm';
import { SkillsForm } from '../components/Editor/SkillsForm';
import { ProjectsForm } from '../components/Editor/ProjectsForm';
import { CertificationsForm } from '../components/Editor/CertificationsForm';
import { AchievementsForm } from '../components/Editor/AchievementsForm';
import { LanguagesForm } from '../components/Editor/LanguagesForm';
import { StyleControls } from '../components/Customizer/StyleControls';
import { ResumePreview } from '../components/Preview/ResumePreview';

import { AtsScoreModal } from '../components/Modals/AtsScoreModal';
import { ImportExportModal } from '../components/Modals/ImportExportModal';
import { SmartParserModal } from '../components/Modals/SmartParserModal';

import { exportResumeToDocx } from '../utils/docxHelper';
import { exportResumeToCsv } from '../utils/csvHelper';
import { printResume, downloadDirectPdf } from '../utils/pdfHelper';

const ORDERED_SECTIONS = [
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'achievements',
  'languages',
  'design'
];

export function BuilderPage({
  resume,
  setResume,
  settings,
  setSettings
}) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'
  const [editorWidthPercent, setEditorWidthPercent] = useState(45);
  const [isDraggingSplitter, setIsDraggingSplitter] = useState(false);

  // Responsive device detector
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 992 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [documentTitle, setDocumentTitle] = useState(() => resume.personalInfo?.fullName ? `${resume.personalInfo.fullName} - Resume` : 'Untitled Resume');

  // Modals state
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [smartParserOpen, setSmartParserOpen] = useState(false);

  // Dropdown states
  const [samplesOpen, setSamplesOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

  const previewRef = useRef(null);
  const workspaceRef = useRef(null);

  // Keep document title synced with full name if untitled
  useEffect(() => {
    if (resume.personalInfo?.fullName && documentTitle === 'Untitled Resume') {
      setDocumentTitle(`${resume.personalInfo.fullName} - Resume`);
    }
  }, [resume.personalInfo?.fullName]);

  // Draggable Splitter Event Listeners with Cursor & Selection Protection
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingSplitter || !workspaceRef.current) return;
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - workspaceRect.left) / workspaceRect.width) * 100;
      if (newWidth >= 25 && newWidth <= 75) {
        setEditorWidthPercent(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isDraggingSplitter) {
        setIsDraggingSplitter(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isDraggingSplitter) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingSplitter]);

  // Calculate ATS score
  const ats = calculateAtsScore(resume);

  // Stepper calculations
  const currentSectionIndex = ORDERED_SECTIONS.indexOf(activeSection);
  const prevSection = currentSectionIndex > 0 ? ORDERED_SECTIONS[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < ORDERED_SECTIONS.length - 1 ? ORDERED_SECTIONS[currentSectionIndex + 1] : null;

  // Handlers
  const handleLoadSample = (sampleData) => {
    setResume(sampleData);
    setSamplesOpen(false);
  };

  const handleClearToBlank = () => {
    if (window.confirm('Start a fresh blank resume? Any unsaved edits will be cleared.')) {
      setResume(emptyResumeState);
      setDocumentTitle('Untitled Resume');
    }
  };

  const handleExportPdf = async () => {
    try {
      await downloadDirectPdf('resume-print-sheet', resume.personalInfo?.fullName || 'Resume');
    } catch (err) {
      console.error('Error downloading PDF:', err);
      printResume();
    }
  };

  const handlePrint = () => {
    printResume();
  };

  const handleExportDocx = async () => {
    try {
      await exportResumeToDocx(resume);
    } catch (err) {
      console.error('Error generating docx:', err);
    }
  };

  const handleExportCsv = () => {
    exportResumeToCsv(resume);
  };

  const renderActiveSectionForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm resume={resume} setResume={setResume} settings={settings} setSettings={setSettings} onSettingsChange={setSettings} />;
      case 'experience':
        return <ExperienceForm resume={resume} setResume={setResume} />;
      case 'education':
        return <EducationForm resume={resume} setResume={setResume} />;
      case 'skills':
        return <SkillsForm resume={resume} setResume={setResume} />;
      case 'projects':
        return <ProjectsForm resume={resume} setResume={setResume} />;
      case 'certifications':
        return <CertificationsForm resume={resume} setResume={setResume} />;
      case 'achievements':
        return <AchievementsForm resume={resume} setResume={setResume} />;
      case 'languages':
        return <LanguagesForm resume={resume} setResume={setResume} />;
      case 'design':
        return <StyleControls settings={settings} setSettings={setSettings} />;
      default:
        return (
          <PersonalInfoForm
            resume={resume}
            setResume={setResume}
            settings={settings}
            setSettings={setSettings}
            onSettingsChange={setSettings}
          />
        );
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white text-dark overflow-hidden position-relative" style={{ height: '100dvh' }}>
      {/* Ambient Orbs */}
      <div className="ambient-glow-wrapper no-print">
        <div className="ambient-orb orb-1" style={{ opacity: 0.22 }} />
        <div className="ambient-orb orb-2" style={{ opacity: 0.22 }} />
        <div className="ambient-mesh" />
      </div>

      {/* Top Studio Header Bar - Strictly Fixed */}
      <header
        className="navbar navbar-expand glass-navbar z-3 px-2.5 px-sm-3 px-md-4 py-2 border-bottom flex-shrink-0"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '54px',
          zIndex: 1050,
          borderColor: '#cbd5e1',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
          {/* Left: Brand Logo (Clickable Home) + Tools + Document Title */}
          <div className="d-flex align-items-center gap-1.5 gap-sm-2 gap-md-2.5">
            {/* Clickable Brand Logo (Reaches Home on tap/click across all devices) */}
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
              <span className="fw-extrabold text-dark tracking-tight" style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                mera<span style={{ color: '#ff6b00' }}>Resume</span>
              </span>
            </div>

            <div className="vr my-auto flex-shrink-0" style={{ height: '16px', color: '#cbd5e1' }} />

            {/* Desktop Only: Sidebar Toggle (NEVER rendered on mobile DOM) */}
            {isDesktop && (
              <>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`btn btn-sm d-flex align-items-center gap-1.5 border transition flex-shrink-0 ${
                    sidebarCollapsed ? 'btn-warning text-white fw-bold shadow-2xs' : 'btn-light-secondary'
                  }`}
                  style={{ minHeight: '34px' }}
                  title={sidebarCollapsed ? 'Expand Editor Sidebar' : 'Collapse Editor Sidebar'}
                >
                  {sidebarCollapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
                  <span>{sidebarCollapsed ? 'Show Editor' : 'Hide Editor'}</span>
                </button>

                <div className="vr my-auto flex-shrink-0" style={{ height: '16px', color: '#cbd5e1' }} />
              </>
            )}

            {/* Document Title Input */}
            <div className="d-flex flex-column justify-content-center">
              <input
                type="text"
                value={documentTitle}
                onChange={e => setDocumentTitle(e.target.value)}
                className="form-control form-control-sm fw-bold border-0 bg-transparent p-0 text-dark text-truncate"
                style={{ fontSize: '0.875rem', width: isDesktop ? 'clamp(130px, 16vw, 220px)' : 'clamp(85px, 22vw, 140px)' }}
                title="Click to rename resume"
              />
              <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '9px' }}>
                <Check size={9} className="text-success" />
                <span>Auto-Saved</span>
              </div>
            </div>
          </div>

          {/* Right Action Tools: Desktop */}
          {isDesktop ? (
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={handleClearToBlank}
                className="btn btn-light-secondary btn-sm p-1.5 px-2 d-inline-flex align-items-center gap-1"
                type="button"
                title="Start fresh blank resume"
              >
                <FilePlus size={13} style={{ color: '#ff6b00' }} />
                <span>New Blank</span>
              </button>

              {/* Sample Presets */}
              <div className="position-relative">
                <button
                  onClick={() => setSamplesOpen(!samplesOpen)}
                  className="btn btn-light-secondary btn-sm p-1.5 px-2 d-flex align-items-center gap-1"
                  type="button"
                >
                  <Layers size={13} style={{ color: '#ff6b00' }} />
                  <span>Presets</span>
                  <ChevronDown size={11} />
                </button>

                {samplesOpen && (
                  <div
                    className="position-absolute end-0 mt-2 glass-dropdown-light rounded-3 p-1.5 z-3 animate-fadeIn shadow-lg"
                    style={{ width: '220px' }}
                  >
                    <div className="px-2 py-1 text-uppercase text-secondary fw-bold" style={{ fontSize: '9.5px' }}>
                      1-Click Presets
                    </div>
                    {Object.entries(sampleProfiles).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => handleLoadSample(item.data)}
                        className="btn btn-light w-100 text-start d-flex align-items-center justify-content-between p-2 rounded-2 border-0 mb-1"
                        style={{ fontSize: '12px' }}
                      >
                        <span className="fw-semibold text-dark">{item.name}</span>
                        <span
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: 'rgba(255, 107, 0, 0.12)',
                            color: '#ff6b00',
                            fontSize: '9.5px'
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
                onClick={() => setSmartParserOpen(true)}
                className="btn btn-light-secondary btn-sm p-1.5 px-2 d-flex align-items-center gap-1"
                type="button"
                title="Import text from PDF or LinkedIn"
              >
                <Sparkles size={13} style={{ color: '#ff4500' }} />
                <span>Smart Parser</span>
              </button>

              {/* ATS Score Indicator */}
              <button
                onClick={() => setAtsModalOpen(true)}
                className="btn btn-light-secondary btn-sm p-1.5 px-2.5 d-flex align-items-center gap-1.5 border shadow-sm"
                type="button"
                title="Inspect ATS Score"
              >
                <ShieldCheck size={14} style={{ color: ats.badgeColor }} />
                <span className="fw-bold font-mono text-dark" style={{ fontSize: '12px' }}>
                  {ats.score}%
                </span>
                <span className="badge rounded-pill bg-light text-secondary border px-1" style={{ fontSize: '9px' }}>
                  ATS
                </span>
              </button>

              {/* Export Dropdown */}
              <div className="position-relative">
                <button
                  onClick={() => setExportOpen(!exportOpen)}
                  className="btn btn-orange-primary btn-sm p-1.5 px-3 d-flex align-items-center gap-1.5 shadow"
                  type="button"
                >
                  <Download size={13} />
                  <span>Export</span>
                  <ChevronDown size={11} />
                </button>

                {exportOpen && (
                  <div
                    className="position-absolute end-0 mt-2 glass-dropdown-light rounded-3 p-2 z-3 animate-fadeIn shadow-lg"
                    style={{ width: '250px' }}
                  >
                    <div className="px-2 py-1 text-uppercase text-secondary fw-bold" style={{ fontSize: '9.5px' }}>
                      Export Options
                    </div>

                    <button
                      onClick={() => {
                        setExportOpen(false);
                        handleExportPdf();
                      }}
                      className="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 mb-1"
                    >
                      <Download size={15} className="text-danger" />
                      <div>
                        <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Download PDF (.pdf)</div>
                        <small className="text-secondary d-block" style={{ fontSize: '9.5px' }}>Direct high-res file + live links</small>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setExportOpen(false);
                        handlePrint();
                      }}
                      className="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 mb-1"
                    >
                      <Printer size={15} style={{ color: '#0071e3' }} />
                      <div>
                        <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Print / Save as PDF</div>
                        <small className="text-secondary d-block" style={{ fontSize: '9.5px' }}>Native vector browser print</small>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setExportOpen(false);
                        handleExportDocx();
                      }}
                      className="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 mb-1"
                    >
                      <FileType size={15} style={{ color: '#ff6b00' }} />
                      <div>
                        <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Word Document (.DOCX)</div>
                        <small className="text-secondary d-block" style={{ fontSize: '9.5px' }}>Office OpenXML + links</small>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setExportOpen(false);
                        handleExportCsv();
                      }}
                      className="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 mb-1"
                    >
                      <FileSpreadsheet size={15} className="text-success" />
                      <div>
                        <div className="text-dark fw-bold" style={{ fontSize: '12px' }}>Spreadsheet (.CSV)</div>
                        <small className="text-secondary d-block" style={{ fontSize: '9.5px' }}>Raw data table</small>
                      </div>
                    </button>

                    <div className="border-top border-light my-1" />

                    <button
                      onClick={() => {
                        setExportOpen(false);
                        setImportExportOpen(true);
                      }}
                      className="btn btn-light w-100 text-start d-flex align-items-center gap-1.5 p-2 rounded-2 border-0 fw-bold"
                      style={{ color: '#ff6b00', fontSize: '11.5px' }}
                    >
                      <Upload size={13} />
                      <span>More Formats & JSON Hub...</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Right Action Tools: Mobile (Clean & Focused) */
            <div className="d-flex align-items-center gap-1.5">
              <button
                onClick={() => setAtsModalOpen(true)}
                className="btn btn-light btn-sm border py-1 px-2 d-flex align-items-center gap-1 rounded-pill"
                style={{ borderColor: '#cbd5e1', fontSize: '11px', minHeight: '32px' }}
                title="Inspect ATS Score"
              >
                <ShieldCheck size={13} style={{ color: ats.badgeColor }} />
                <span className="fw-bold">{ats.score}%</span>
              </button>

              <button
                onClick={handleExportPdf}
                className="btn btn-orange-primary btn-sm py-1 px-2.5 d-flex align-items-center gap-1 rounded-pill"
                style={{ fontSize: '11px', minHeight: '32px' }}
                title="1-Tap Export PDF"
              >
                <Download size={13} />
                <span>PDF</span>
              </button>

              <button
                onClick={() => setMobileActionsOpen(true)}
                className="btn btn-light btn-sm border p-1 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px', borderColor: '#cbd5e1' }}
                title="More Actions"
              >
                <MoreVertical size={16} className="text-secondary" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace with Splitter & Mobile View Adaptation */}
      <div
        ref={workspaceRef}
        className="container-fluid p-0 flex-grow-1 d-flex flex-column flex-lg-row overflow-hidden position-relative z-1"
        style={{ marginTop: '54px', height: 'calc(100dvh - 54px)' }}
      >
        {/* Left Pane: Form Editor */}
        <div
          className={`flex-column border-end bg-white overflow-y-auto no-print h-100 shadow-sm ${
            sidebarCollapsed ? 'd-none' : (mobileTab === 'editor' ? 'd-flex' : 'd-none d-lg-flex')
          }`}
          style={{
            width: isDesktop ? (sidebarCollapsed ? '0%' : `${editorWidthPercent}%`) : (mobileTab === 'editor' ? '100%' : '0%'),
            minWidth: 0,
            maxWidth: '100%',
            borderColor: '#cbd5e1',
            transition: isDraggingSplitter ? 'none' : 'width 0.15s ease-out'
          }}
        >
          <SectionNav activeSection={activeSection} setActiveSection={setActiveSection} resume={resume} />
          
          {/* Form Body Container with generous mobile bottom padding */}
          <div className="p-3 p-md-4 flex-grow-1 pb-5 mb-5">
            {renderActiveSectionForm()}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="p-2.5 p-sm-3 border-top bg-light d-flex align-items-center justify-content-between flex-shrink-0 pb-5 mb-4 pb-lg-3 mb-lg-0" style={{ borderColor: '#e2e8f0' }}>
            <button
              type="button"
              disabled={!prevSection}
              onClick={() => prevSection && setActiveSection(prevSection)}
              className="btn btn-light btn-sm d-flex align-items-center gap-1 border disabled:opacity-25"
              style={{ borderColor: '#cbd5e1', minHeight: '38px', padding: '0.4rem 0.85rem' }}
            >
              <ChevronLeft size={15} />
              <span className="small fw-semibold">Previous</span>
            </button>

            <span className="small text-secondary fw-semibold font-monospace" style={{ fontSize: '11px' }}>
              Step {currentSectionIndex + 1} of {ORDERED_SECTIONS.length}
            </span>

            <button
              type="button"
              disabled={!nextSection}
              onClick={() => nextSection && setActiveSection(nextSection)}
              className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1 disabled:opacity-25"
              style={{ minHeight: '38px', padding: '0.4rem 0.85rem' }}
            >
              <span className="small fw-semibold">Next</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Draggable Splitter Divider (Desktop only) */}
        {isDesktop && !sidebarCollapsed && (
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingSplitter(true);
            }}
            onDoubleClick={() => setEditorWidthPercent(50)}
            className="d-flex align-items-center justify-content-center flex-shrink-0 position-relative transition"
            style={{
              width: '10px',
              cursor: 'col-resize',
              backgroundColor: isDraggingSplitter ? '#ff6b00' : '#e2e8f0',
              zIndex: 10,
              userSelect: 'none'
            }}
            title="Drag horizontally to resize Editor & Live Preview • Double-click to reset 50/50 split"
          >
            {/* Grab handle indicator */}
            <div
              className="rounded-pill transition"
              style={{
                width: '4px',
                height: isDraggingSplitter ? '48px' : '32px',
                backgroundColor: isDraggingSplitter ? '#ffffff' : '#94a3b8'
              }}
            />

            {/* Live Drag Tooltip */}
            {isDraggingSplitter && (
              <div
                className="position-absolute start-50 top-50 translate-middle badge bg-dark text-white rounded-pill px-2 py-1 shadow-lg"
                style={{ fontSize: '10px', pointerEvents: 'none', zIndex: 20 }}
              >
                {Math.round(editorWidthPercent)}% | {Math.round(100 - editorWidthPercent)}%
              </div>
            )}
          </div>
        )}

        {/* Right Pane: Live Interactive Resume Canvas */}
        <div
          className={`h-100 overflow-hidden bg-light position-relative ${
            mobileTab === 'preview' ? 'd-flex flex-column w-100' : 'd-none d-lg-flex flex-column'
          }`}
          style={{
            width: isDesktop ? (sidebarCollapsed ? '100%' : `${100 - editorWidthPercent}%`) : (mobileTab === 'preview' ? '100%' : '0%'),
            minWidth: 0,
            transition: isDraggingSplitter ? 'none' : 'width 0.15s ease-out'
          }}
        >
          {/* Floating Expand Button when Sidebar is collapsed on Desktop */}
          {isDesktop && sidebarCollapsed && (
            <button
              type="button"
              onClick={() => setSidebarCollapsed(false)}
              className="btn btn-orange-primary btn-sm shadow position-absolute start-0 top-50 translate-middle-y z-3 rounded-end-pill px-3 py-2"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              title="Expand Editor Sidebar"
            >
              <Edit3 size={14} />
              <span>Open Editor</span>
            </button>
          )}

          <ResumePreview
            resume={resume}
            setResume={setResume}
            settings={settings}
            setSettings={setSettings}
            previewRef={previewRef}
          />
        </div>
      </div>

      {/* Floating Bottom Navigation Dock (Visible only on mobile devices) */}
      {!isDesktop && (
        <div className="mobile-bottom-dock d-flex align-items-center justify-content-around">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`mobile-dock-btn ${mobileTab === 'editor' ? 'active' : ''}`}
          >
            <FileEdit size={19} strokeWidth={mobileTab === 'editor' ? 2.5 : 1.8} style={{ color: mobileTab === 'editor' ? '#ff6b00' : '#64748b' }} />
            <span>Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`mobile-dock-btn ${mobileTab === 'preview' ? 'active' : ''}`}
          >
            <Eye size={19} strokeWidth={mobileTab === 'preview' ? 2.5 : 1.8} style={{ color: mobileTab === 'preview' ? '#ff6b00' : '#64748b' }} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setAtsModalOpen(true)}
            className="mobile-dock-btn"
          >
            <ShieldCheck size={19} style={{ color: ats.badgeColor }} />
            <span>ATS {ats.score}%</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileActionsOpen(true)}
            className="mobile-dock-btn"
          >
            <MoreVertical size={19} style={{ color: '#64748b' }} />
            <span>Tools</span>
          </button>
        </div>
      )}

      {/* Mobile Tools Bottom Sheet / Drawer */}
      {mobileActionsOpen && (
        <div
          className="position-fixed inset-0 w-100 h-100 d-flex flex-column justify-content-end animate-fadeIn z-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 1060 }}
          onClick={() => setMobileActionsOpen(false)}
        >
          <div
            className="bg-white rounded-top-5 p-4 border-top shadow-2xl animate-slideUp"
            style={{ borderColor: '#cbd5e1', maxHeight: '80vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark mb-0">Studio Tools & Presets</h6>
              <button
                type="button"
                onClick={() => setMobileActionsOpen(false)}
                className="btn btn-sm btn-light rounded-circle p-1"
                style={{ width: '28px', height: '28px' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  handleExportPdf();
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2"
              >
                <Printer size={18} className="text-danger" />
                <div>
                  <div className="fw-bold text-dark">Export PDF Document</div>
                  <small className="text-secondary">Direct high-res print or vector download</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  handleExportDocx();
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2"
              >
                <FileType size={18} style={{ color: '#ff6b00' }} />
                <div>
                  <div className="fw-bold text-dark">Word (.DOCX) Export</div>
                  <small className="text-secondary">Editable Office Word document with links</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  handleExportCsv();
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2"
              >
                <FileSpreadsheet size={18} className="text-success" />
                <div>
                  <div className="fw-bold text-dark">Spreadsheet (.CSV) Export</div>
                  <small className="text-secondary">Tabular export for database records</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  setSmartParserOpen(true);
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2"
              >
                <Sparkles size={18} style={{ color: '#ff4500' }} />
                <div>
                  <div className="fw-bold text-dark">Smart Text / PDF Parser</div>
                  <small className="text-secondary">Auto-import text from LinkedIn or CV</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  setImportExportOpen(true);
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2"
              >
                <Upload size={18} style={{ color: '#ff6b00' }} />
                <div>
                  <div className="fw-bold text-dark">JSON Backup & Restore Hub</div>
                  <small className="text-secondary">Save or restore raw resume JSON files</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileActionsOpen(false);
                  handleClearToBlank();
                }}
                className="btn btn-light w-100 text-start d-flex align-items-center gap-3 p-3 rounded-3 border mb-2 text-danger"
              >
                <Trash2 size={18} />
                <div>
                  <div className="fw-bold">Start New Blank Resume</div>
                  <small className="text-muted">Clear all sections and start fresh</small>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ATS Score Modal */}
      <AtsScoreModal
        resume={resume}
        isOpen={atsModalOpen}
        onClose={() => setAtsModalOpen(false)}
      />

      {/* Multi-Format Import / Export Modal */}
      <ImportExportModal
        resume={resume}
        onImport={(importedData) => setResume(importedData)}
        isOpen={importExportOpen}
        onClose={() => setImportExportOpen(false)}
      />

      {/* Smart Text Parser Modal */}
      <SmartParserModal
        onImport={(importedData) => setResume(importedData)}
        isOpen={smartParserOpen}
        onClose={() => setSmartParserOpen(false)}
      />
    </div>
  );
}
