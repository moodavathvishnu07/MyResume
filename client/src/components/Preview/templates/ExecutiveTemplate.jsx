import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';

export function ExecutiveTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#1e293b';
  const fontFamily = settings.fontFamily || 'Merriweather';

  const baseFontSize = settings.fontSize === 'small' ? '12px' : settings.fontSize === 'large' ? '14px' : '13px';
  const lineSpacing = settings.spacing === 'compact' ? 1.35 : settings.spacing === 'relaxed' ? 1.6 : 1.5;
  const sectionSpacingClass = settings.spacing === 'compact' ? 'mb-3' : settings.spacing === 'relaxed' ? 'mb-5' : 'mb-4';

  const updatePersonalInfo = (field, val) => {
    if (!onResumeChange) return;
    onResumeChange({
      ...resume,
      personalInfo: { ...p, [field]: val }
    });
  };

  const updateExperience = (idx, field, val) => {
    if (!onResumeChange) return;
    const updated = [...exp];
    updated[idx] = { ...updated[idx], [field]: val };
    onResumeChange({ ...resume, experience: updated });
  };

  const updateExpBullet = (expIdx, bIdx, val) => {
    if (!onResumeChange) return;
    const updated = [...exp];
    const bullets = [...(updated[expIdx].bullets || [])];
    bullets[bIdx] = val;
    updated[expIdx].bullets = bullets;
    onResumeChange({ ...resume, experience: updated });
  };

  return (
    <div
      className="p-4 p-sm-5 bg-white text-dark w-100"
      style={{
        fontFamily,
        fontSize: baseFontSize,
        lineHeight: lineSpacing,
        color: '#1e293b'
      }}
    >
      {/* Executive Header */}
      <header className={`d-flex align-items-center justify-content-between pb-3 ${sectionSpacingClass} border-bottom`} style={{ borderColor: primaryColor, borderWidth: '3px' }}>
        <div>
          <h1 className="h3 fw-bold tracking-tight mb-1" style={{ color: primaryColor, fontSize: '1.65rem' }}>
            <EditableText
              value={p.fullName}
              onChange={v => updatePersonalInfo('fullName', v)}
              placeholder="Candidate Name"
              style={{ color: primaryColor }}
            />
          </h1>
          <div className="small fw-semibold text-uppercase tracking-wider mb-2 text-secondary" style={{ letterSpacing: '0.08em' }}>
            <EditableText
              value={p.jobTitle}
              onChange={v => updatePersonalInfo('jobTitle', v)}
              placeholder="Executive Title"
            />
          </div>

          {/* Contact Bar */}
          <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
            <EditableText
              value={p.location}
              onChange={v => updatePersonalInfo('location', v)}
              placeholder="City, State"
            />
            <span>|</span>
            <ResumeLink href={`tel:${p.phone}`}>
              <EditableText
                value={p.phone}
                onChange={v => updatePersonalInfo('phone', v)}
                placeholder="Phone"
              />
            </ResumeLink>
            <span>|</span>
            <ResumeLink href={`mailto:${p.email}`}>
              <EditableText
                value={p.email}
                onChange={v => updatePersonalInfo('email', v)}
                placeholder="Email"
              />
            </ResumeLink>
            {p.linkedin && (
              <>
                <span>|</span>
                <ResumeLink href={p.linkedin} style={{ color: primaryColor, fontWeight: 600 }}>
                  LinkedIn
                </ResumeLink>
              </>
            )}
          </div>
        </div>

        {/* Profile Image if enabled */}
        {settings.showPhoto && p.photo && (
          <div className="flex-shrink-0 ms-3">
            <img
              src={p.photo}
              alt={p.fullName}
              className={`object-cover shadow-sm ${
                settings.photoShape === 'circle'
                  ? 'rounded-circle'
                  : settings.photoShape === 'rounded'
                  ? 'rounded-3'
                  : 'rounded-0'
              }`}
              style={{
                width: '85px',
                height: '85px',
                border: `2px solid ${primaryColor}`
              }}
            />
          </div>
        )}
      </header>

      {/* Executive Summary */}
      {(p.summary || onResumeChange) && (
        <section className={sectionSpacingClass}>
          <h2
            className="small fw-bold text-uppercase tracking-wider pb-1 mb-2 border-bottom"
            style={{ color: primaryColor, borderColor: '#cbd5e1', fontSize: '0.8rem', letterSpacing: '0.06em' }}
          >
            Executive Profile
          </h2>
          <EditableText
            as="p"
            value={p.summary}
            onChange={v => updatePersonalInfo('summary', v)}
            placeholder="Executive summary of leadership track record..."
            className="mb-0 text-secondary-emphasis"
            multiline
            style={{ textAlign: 'justify' }}
          />
        </section>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="small fw-bold text-uppercase tracking-wider pb-1 mb-2.5 border-bottom"
            style={{ color: primaryColor, borderColor: '#cbd5e1', fontSize: '0.8rem', letterSpacing: '0.06em' }}
          >
            Areas of Expertise & Core Competencies
          </h2>
          <div className="row g-2 small text-secondary-emphasis">
            {skills.map((s, idx) => (
              <div key={idx} className="col-12 col-sm-6">
                <strong className="text-dark">{s.category}: </strong>
                <span>{(s.items || []).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {exp.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="small fw-bold text-uppercase tracking-wider pb-1 mb-3 border-bottom"
            style={{ color: primaryColor, borderColor: '#cbd5e1', fontSize: '0.8rem', letterSpacing: '0.06em' }}
          >
            Leadership & Professional Experience
          </h2>
          <div className="d-flex flex-column gap-3.5">
            {exp.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <div>
                    <strong className="text-dark" style={{ fontSize: '0.95rem' }}>
                      <EditableText
                        value={item.role}
                        onChange={v => updateExperience(idx, 'role', v)}
                        placeholder="Leadership Role"
                      />
                    </strong>
                    <span className="fw-semibold text-secondary">
                      {' | '}
                      <EditableText
                        value={item.company}
                        onChange={v => updateExperience(idx, 'company', v)}
                        placeholder="Company"
                      />
                    </span>
                  </div>
                  <span className="small text-secondary text-nowrap ms-2">
                    <EditableText
                      value={item.startDate}
                      onChange={v => updateExperience(idx, 'startDate', v)}
                      placeholder="Start"
                    />
                    {' – '}
                    <EditableText
                      value={item.current ? 'Present' : item.endDate}
                      onChange={v => updateExperience(idx, 'endDate', v)}
                      placeholder="End"
                    />
                  </span>
                </div>
                <ul className="mb-0 ps-3 text-secondary-emphasis" style={{ listStyleType: 'disc' }}>
                  {(item.bullets || []).map((b, bIdx) => (
                    <li key={bIdx} className="mb-1">
                      <EditableText
                        value={b}
                        onChange={v => updateExpBullet(idx, bIdx, v)}
                        placeholder="Click to add executive accomplishment..."
                        multiline
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
