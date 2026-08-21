import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { parseResumeTextClient } from '../../utils/textParser';

export function SmartParserModal({ onImport, isOpen, onClose }) {
  const [pastedText, setPastedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (!pastedText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch('/api/parse/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: pastedText })
      });
      const data = await res.json();
      if (data.success && data.parsedData) {
        setPreviewData(data.parsedData);
      } else {
        const clientParsed = parseResumeTextClient(pastedText);
        setPreviewData(clientParsed);
      }
    } catch (err) {
      const clientParsed = parseResumeTextClient(pastedText);
      setPreviewData(clientParsed);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = () => {
    if (previewData) {
      onImport(previewData);
      onClose();
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
          maxWidth: '560px',
          borderColor: 'rgba(15, 23, 42, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-light">
          <div className="d-flex align-items-center gap-2">
            <Sparkles size={18} style={{ color: '#ff6b00' }} />
            <h6 className="fw-bold text-dark mb-0">Smart Document & PDF Text Importer</h6>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-link text-secondary hover-text-dark p-0">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {!previewData ? (
            <>
              <p className="small text-secondary mb-3">
                Copy text from any PDF, Word (.DOCX), Google Doc, or LinkedIn profile and paste it below. Our intelligent engine will automatically parse contact details, links, education, work history, and skills.
              </p>

              <textarea
                rows={8}
                value={pastedText}
                onChange={e => setPastedText(e.target.value)}
                placeholder="Paste raw resume text here...&#10;&#10;e.g.&#10;Alexander Vance&#10;Senior Software Engineer&#10;alex@example.com | +1 555-234-5678 | San Francisco, CA&#10;https://linkedin.com/in/alexander-vance&#10;&#10;Experience:&#10;Apex Cloud - Senior Engineer (2022 - Present)..."
                className="apple-input font-monospace mb-3"
                style={{ fontSize: '11px' }}
              />

              <button
                type="button"
                onClick={handleParse}
                disabled={isProcessing || !pastedText.trim()}
                className="btn btn-orange-primary btn-sm w-100 justify-content-center"
              >
                <Sparkles size={14} className={isProcessing ? 'animate-spin' : ''} />
                <span>{isProcessing ? 'Analyzing & Parsing...' : 'Parse Resume Data'}</span>
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-2.5 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 text-success small d-flex align-items-center gap-2 mb-3">
                <CheckCircle2 size={16} />
                <span>Resume parsed successfully! Review detected details below.</span>
              </div>

              {/* Summary of parsed fields */}
              <div className="p-3 rounded-3 bg-light border space-y-2 small mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
                <div>
                  <span className="text-secondary">Detected Name:</span>{' '}
                  <strong className="text-dark">{previewData.personalInfo?.fullName}</strong>
                </div>
                <div>
                  <span className="text-secondary">Job Title:</span>{' '}
                  <span className="text-dark">{previewData.personalInfo?.jobTitle}</span>
                </div>
                <div>
                  <span className="text-secondary">Email:</span>{' '}
                  <span className="text-dark">{previewData.personalInfo?.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-secondary">Phone:</span>{' '}
                  <span className="text-dark">{previewData.personalInfo?.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-secondary">LinkedIn:</span>{' '}
                  <span style={{ color: '#ff6b00' }}>{previewData.personalInfo?.linkedin || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-secondary">Skills Extracted:</span>{' '}
                  <span className="text-dark">
                    {(previewData.skills?.[0]?.items || []).join(', ') || 'General skills'}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewData(null)}
                  className="btn btn-light-secondary btn-sm flex-grow-1"
                >
                  Back / Re-Paste
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="btn btn-orange-primary btn-sm flex-grow-1 justify-content-center"
                >
                  <span>Apply to Editor</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
