import React, { useRef, useState } from 'react';
import { Upload, Trash2, Sparkles, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { sanitizeUrl } from '../Preview/templates/ResumeLink';

export function PersonalInfoForm({ resume = {}, onChange, setResume, settings = {}, onSettingsChange, setSettings }) {
  const p = resume.personalInfo || {};
  const fileInputRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateResume = onChange || setResume || (() => {});
  const updateSettings = onSettingsChange || setSettings || (() => {});

  const handleChange = (field, value) => {
    updateResume({
      ...resume,
      personalInfo: {
        ...p,
        [field]: value
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResume({
          ...resume,
          personalInfo: {
            ...p,
            photo: reader.result,
            showPhoto: true
          }
        });
        updateSettings({
          ...settings,
          showPhoto: true
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updateResume({
      ...resume,
      personalInfo: {
        ...p,
        photo: '',
        showPhoto: false
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAiSummary = async () => {
    setIsGenerating(true);
    try {
      const skillsList = (resume.skills || []).flatMap(s => s.items || []);
      const res = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: p.jobTitle || 'Software Engineer',
          yearsOfExp: 5,
          topSkills: skillsList
        })
      });
      const data = await res.json();
      if (data.success && data.summaries?.length > 0) {
        handleChange('summary', data.summaries[0]);
      }
    } catch (err) {
      // Fallback
      handleChange(
        'summary',
        `Results-driven ${p.jobTitle || 'Professional'} with extensive expertise in delivering scalable solutions, driving high product impact, and collaborating across cross-functional engineering squads.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Personal & Contact Details</h5>
          <small className="text-secondary">
            Flexible URLs accepted (e.g. <code>https://linkedin.com/in/username</code> or <code>linkedin.com/username</code>). All links remain active and clickable.
          </small>
        </div>
      </div>

      {/* Photo Upload & Controls */}
      <div className="p-3 rounded-4 bg-white border shadow-sm d-flex flex-column flex-sm-row align-items-center gap-3 mb-4" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div className="position-relative">
          {p.photo ? (
            <img
              src={p.photo}
              alt="Avatar"
              className={`object-cover shadow-sm ${
                settings.photoShape === 'circle'
                  ? 'rounded-circle'
                  : settings.photoShape === 'rounded'
                  ? 'rounded-4'
                  : 'rounded-0'
              }`}
              style={{
                width: '80px',
                height: '80px',
                border: '2px solid #ff6b00'
              }}
            />
          ) : (
            <div
              className="rounded-circle d-flex flex-column align-items-center justify-content-center text-secondary border border-2 border-dashed bg-light"
              style={{ width: '80px', height: '80px' }}
            >
              <ImageIcon size={22} className="text-muted" />
              <span style={{ fontSize: '10px' }} className="mt-1">Photo</span>
            </div>
          )}
        </div>

        <div className="flex-grow-1 text-center text-sm-start">
          <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center justify-content-sm-start mb-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="d-none"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-light-secondary btn-sm"
            >
              <Upload size={13} />
              <span>{p.photo ? 'Change Photo' : 'Upload Photo'}</span>
            </button>

            {p.photo && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="btn btn-outline-danger btn-sm"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            )}

            {/* Toggle show photo in template */}
            <div className="form-check form-switch ms-sm-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPhotoSwitch"
                checked={Boolean(settings?.showPhoto)}
                onChange={e =>
                  updateSettings({ ...settings, showPhoto: e.target.checked })
                }
              />
              <label className="form-check-label small text-secondary" htmlFor="showPhotoSwitch">
                Show in Resume
              </label>
            </div>
          </div>

          {settings?.showPhoto && (
            <div className="d-flex align-items-center gap-2 small text-secondary">
              <span>Avatar Shape:</span>
              <div className="btn-group btn-group-sm">
                {['circle', 'rounded', 'square'].map(shape => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => updateSettings({ ...settings, photoShape: shape })}
                    className={`btn text-capitalize ${
                      (settings?.photoShape || 'circle') === shape ? 'btn-warning text-dark fw-bold' : 'btn-light'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="apple-label">Full Name *</label>
          <input
            type="text"
            value={p.fullName || ''}
            onChange={e => handleChange('fullName', e.target.value)}
            placeholder="e.g. Alexander Vance"
            className="apple-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="apple-label">Job Title / Headline *</label>
          <input
            type="text"
            value={p.jobTitle || ''}
            onChange={e => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="apple-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="apple-label">Email Address *</label>
          <input
            type="email"
            value={p.email || ''}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="e.g. alex@example.com"
            className="apple-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="apple-label">Phone Number *</label>
          <input
            type="tel"
            value={p.phone || ''}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="e.g. +1 (555) 234-5678"
            className="apple-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="apple-label">Location (City, Country) *</label>
          <input
            type="text"
            value={p.location || ''}
            onChange={e => handleChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="apple-input"
          />
        </div>

        {/* LinkedIn with link tester */}
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center justify-content-between">
            <label className="apple-label mb-1">LinkedIn URL</label>
            {p.linkedin && sanitizeUrl(p.linkedin) && (
              <a
                href={sanitizeUrl(p.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none small d-flex align-items-center gap-1 mb-1"
                style={{ color: '#ff6b00', fontSize: '11px' }}
                title="Test Link"
              >
                <span>Test ↗</span>
              </a>
            )}
          </div>
          <input
            type="text"
            value={p.linkedin || ''}
            onChange={e => handleChange('linkedin', e.target.value)}
            placeholder="e.g. https://linkedin.com/in/username or linkedin.com/in/username"
            className="apple-input"
          />
        </div>

        {/* GitHub with link tester */}
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center justify-content-between">
            <label className="apple-label mb-1">GitHub URL</label>
            {p.github && sanitizeUrl(p.github) && (
              <a
                href={sanitizeUrl(p.github)}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none small d-flex align-items-center gap-1 mb-1"
                style={{ color: '#ff6b00', fontSize: '11px' }}
                title="Test Link"
              >
                <span>Test ↗</span>
              </a>
            )}
          </div>
          <input
            type="text"
            value={p.github || ''}
            onChange={e => handleChange('github', e.target.value)}
            placeholder="e.g. https://github.com/username or github.com/username"
            className="apple-input"
          />
        </div>

        {/* Website with link tester */}
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center justify-content-between">
            <label className="apple-label mb-1">Website / Portfolio</label>
            {p.website && sanitizeUrl(p.website) && (
              <a
                href={sanitizeUrl(p.website)}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none small d-flex align-items-center gap-1 mb-1"
                style={{ color: '#ff6b00', fontSize: '11px' }}
                title="Test Link"
              >
                <span>Test ↗</span>
              </a>
            )}
          </div>
          <input
            type="text"
            value={p.website || ''}
            onChange={e => handleChange('website', e.target.value)}
            placeholder="e.g. https://yourportfolio.dev or yourportfolio.dev"
            className="apple-input"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mt-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <label className="apple-label mb-0">Professional Summary</label>
          <button
            type="button"
            onClick={handleAiSummary}
            disabled={isGenerating}
            className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1.5"
            style={{ fontSize: '11px' }}
          >
            <Sparkles size={12} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'Enhancing...' : 'AI Auto-Generate'}</span>
          </button>
        </div>
        <textarea
          rows={4}
          value={p.summary || ''}
          onChange={e => handleChange('summary', e.target.value)}
          placeholder="Concise 2-4 sentence summary emphasizing your domain expertise, quantifiable achievements, and leadership..."
          className="apple-input"
        />
      </div>
    </div>
  );
}
