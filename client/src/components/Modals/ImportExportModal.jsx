import React, { useRef, useState } from 'react';
import {
  X,
  FileDown,
  FileUp,
  FileText,
  FileSpreadsheet,
  FileType,
  Copy,
  Check,
  Download,
  Upload,
  Printer
} from 'lucide-react';
import { exportResumeToCsv, parseResumeCsv } from '../../utils/csvHelper';
import { exportResumeToDocx } from '../../utils/docxHelper';
import { printResume } from '../../utils/pdfHelper';
import { saveAs } from 'file-saver';

export function ImportExportModal({ resume, onImport, isOpen, onClose }) {
  const [tab, setTab] = useState('export');
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const candidateName = resume.personalInfo?.fullName || 'Resume';

  // Export Handlers
  const handleExportPdf = () => {
    printResume();
    onClose();
  };

  const handleExportDocx = async () => {
    try {
      await exportResumeToDocx(resume);
      setSuccessMsg('DOCX generated with clickable links and downloaded!');
    } catch (err) {
      console.error(err);
      setErrorMsg('Error generating Word document.');
    }
  };

  const handleExportCsv = () => {
    exportResumeToCsv(resume);
    setSuccessMsg('CSV exported successfully!');
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, `${candidateName.replace(/\s+/g, '_')}_backup.json`);
    setSuccessMsg('JSON backup file saved!');
  };

  const handleCopyPlainText = () => {
    const p = resume.personalInfo || {};
    const text = `
${p.fullName || ''}
${p.jobTitle || ''}
${p.email || ''} | ${p.phone || ''} | ${p.location || ''}
LinkedIn: ${p.linkedin || ''} | GitHub: ${p.github || ''} | Portfolio: ${p.website || ''}

SUMMARY:
${p.summary || ''}

EXPERIENCE:
${(resume.experience || []).map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate || (e.current ? 'Present' : '')})\n${(e.bullets || []).map(b => `• ${b}`).join('\n')}`).join('\n\n')}

EDUCATION:
${(resume.education || []).map(e => `${e.degree} - ${e.school} (${e.startDate} - ${e.endDate || 'Present'})\nGPA: ${e.score || ''}`).join('\n\n')}

SKILLS:
${(resume.skills || []).map(s => `${s.category}: ${(s.items || []).join(', ')}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Import Handlers
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setSuccessMsg('');
    const reader = new FileReader();

    if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        try {
          const parsed = parseResumeCsv(event.target.result);
          if (parsed && (parsed.personalInfo?.fullName || parsed.skills?.length > 0)) {
            onImport(parsed);
            setSuccessMsg('CSV Resume imported successfully!');
            setTimeout(onClose, 1000);
          } else {
            setErrorMsg('Could not find valid resume data in CSV.');
          }
        } catch (err) {
          setErrorMsg('Error parsing CSV file format.');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.json')) {
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.personalInfo || parsed.experience) {
            onImport(parsed);
            setSuccessMsg('JSON Resume restored successfully!');
            setTimeout(onClose, 1000);
          } else {
            setErrorMsg('Invalid JSON resume schema.');
          }
        } catch (err) {
          setErrorMsg('Invalid JSON format.');
        }
      };
      reader.readAsText(file);
    } else {
      setErrorMsg('Please upload a valid .csv or .json file.');
    }
  };

  const handleJsonPasteImport = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      onImport(parsed);
      setSuccessMsg('Resume data imported from JSON text!');
      setTimeout(onClose, 1000);
    } catch (err) {
      setErrorMsg('Invalid JSON syntax in text box.');
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 animate-fadeIn"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050
      }}
    >
      <div
        className="bg-white rounded-4 border shadow-2xl overflow-hidden text-dark"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderColor: 'rgba(15, 23, 42, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-light">
          <div className="d-flex align-items-center gap-2">
            <Download size={18} style={{ color: '#ff6b00' }} />
            <h6 className="fw-bold text-dark mb-0">Import & Export Multi-Format Hub</h6>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-link text-secondary hover-text-dark p-0">
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="d-flex border-bottom bg-light p-2 gap-2">
          <button
            onClick={() => { setTab('export'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              tab === 'export' ? 'btn-orange-primary' : 'btn-light text-secondary'
            }`}
            style={{ fontSize: '12px' }}
          >
            <FileDown size={14} />
            <span>Export & Download</span>
          </button>
          <button
            onClick={() => { setTab('import'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              tab === 'import' ? 'btn-orange-primary' : 'btn-light text-secondary'
            }`}
            style={{ fontSize: '12px' }}
          >
            <FileUp size={14} />
            <span>Import & Restore</span>
          </button>
        </div>

        {/* Feedback notices */}
        {errorMsg && (
          <div className="mx-4 mt-3 p-2.5 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 text-danger small">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mx-4 mt-3 p-2.5 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 text-success small">
            {successMsg}
          </div>
        )}

        {/* Tab 1: Export Hub */}
        {tab === 'export' && (
          <div className="p-4 space-y-3" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
            <p className="small text-secondary mb-3">
              All exported files (PDF & DOCX) retain active, clickable links for LinkedIn, GitHub, and Portfolio.
            </p>

            {/* 1. PDF Export */}
            <div
              onClick={handleExportPdf}
              className="p-3 rounded-3 bg-white border mb-2 d-flex align-items-center justify-content-between hover-shadow cursor-pointer transition"
              style={{ borderColor: 'rgba(15, 23, 42, 0.1)', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-danger"
                  style={{ width: '38px', height: '38px', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <Printer size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Print / Download PDF</div>
                  <small className="text-secondary" style={{ fontSize: '11px' }}>High-res vector print with active hyperlinks</small>
                </div>
              </div>
              <span className="badge rounded-pill bg-warning text-dark font-monospace" style={{ fontSize: '10px' }}>
                Recommended
              </span>
            </div>

            {/* 2. DOCX Word Export */}
            <div
              onClick={handleExportDocx}
              className="p-3 rounded-3 bg-white border mb-2 d-flex align-items-center justify-content-between hover-shadow cursor-pointer transition"
              style={{ borderColor: 'rgba(15, 23, 42, 0.1)', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00' }}
                >
                  <FileType size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Export Microsoft Word (.DOCX)</div>
                  <small className="text-secondary" style={{ fontSize: '11px' }}>Styled document with headings & clickable links</small>
                </div>
              </div>
              <Download size={15} className="text-secondary" />
            </div>

            {/* 3. CSV Export */}
            <div
              onClick={handleExportCsv}
              className="p-3 rounded-3 bg-white border mb-2 d-flex align-items-center justify-content-between hover-shadow cursor-pointer transition"
              style={{ borderColor: 'rgba(15, 23, 42, 0.1)', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-success"
                  style={{ width: '38px', height: '38px', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                >
                  <FileSpreadsheet size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Export Tabular CSV (.CSV)</div>
                  <small className="text-secondary" style={{ fontSize: '11px' }}>Structured data spreadsheet of all sections</small>
                </div>
              </div>
              <Download size={15} className="text-secondary" />
            </div>

            {/* 4. JSON Backup */}
            <div
              onClick={handleExportJson}
              className="p-3 rounded-3 bg-white border mb-3 d-flex align-items-center justify-content-between hover-shadow cursor-pointer transition"
              style={{ borderColor: 'rgba(15, 23, 42, 0.1)', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-purple"
                  style={{ width: '38px', height: '38px', backgroundColor: 'rgba(147, 51, 234, 0.1)', color: '#9333ea' }}
                >
                  <FileText size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Save JSON Resume Backup (.JSON)</div>
                  <small className="text-secondary" style={{ fontSize: '11px' }}>Full state file for 1-click restore anytime</small>
                </div>
              </div>
              <Download size={15} className="text-secondary" />
            </div>

            {/* 5. Plain Text Copy */}
            <button
              type="button"
              onClick={handleCopyPlainText}
              className="btn btn-light w-100 border text-dark btn-sm d-flex align-items-center justify-content-center gap-2 py-2"
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text for Job Application Portals'}</span>
            </button>
          </div>
        )}

        {/* Tab 2: Import Hub */}
        {tab === 'import' && (
          <div className="p-4 space-y-3" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
            <p className="small text-secondary mb-3">
              Restore your resume from a previously exported CSV or JSON file.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.json"
              className="d-none"
              onChange={handleFileUpload}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-4 border border-2 border-dashed d-flex flex-column align-items-center justify-content-center text-center cursor-pointer transition bg-light"
              style={{ cursor: 'pointer' }}
            >
              <Upload size={28} style={{ color: '#ff6b00' }} className="mb-2" />
              <div className="small fw-bold text-dark">Click to Upload Resume File</div>
              <small className="text-secondary">Supports .CSV or .JSON backup files</small>
            </div>

            <div className="text-center my-3">
              <span className="small text-secondary text-uppercase fw-bold" style={{ fontSize: '10px' }}>
                Or Paste JSON String Below
              </span>
            </div>

            <textarea
              rows={4}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Paste raw JSON resume content..."
              className="apple-input font-monospace mb-3"
              style={{ fontSize: '11px' }}
            />

            <button
              type="button"
              onClick={handleJsonPasteImport}
              className="btn btn-orange-primary btn-sm w-100 justify-content-center"
            >
              Import JSON Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
