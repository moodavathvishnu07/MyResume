import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';

export function MinimalistTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#0f172a';
  const fontFamily = settings.fontFamily || 'Inter';

  const baseFontSize = settings.fontSize === 'small' ? '12px' : settings.fontSize === 'large' ? '14px' : '13px';
  const lineSpacing = settings.spacing === 'compact' ? 1.35 : settings.spacing === 'relaxed' ? 1.6 : 1.45;
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
      {/* Minimal Header */}
      <header className={`pb-3 ${sectionSpacingClass}`}>
        <h1
          className="fw-light tracking-tight mb-1"
          style={{ fontSize: '2rem', letterSpacing: '-0.02em', color: '#0f172a' }}
        >
          <EditableText
            value={p.fullName}
            onChange={v => updatePersonalInfo('fullName', v)}
            placeholder="Candidate Name"
          />
        </h1>
        <div className="small fw-semibold text-uppercase tracking-wider mb-3 text-secondary" style={{ letterSpacing: '0.08em' }}>
          <EditableText
            value={p.jobTitle}
            onChange={v => updatePersonalInfo('jobTitle', v)}
            placeholder="Professional Title"
          />
        </div>

        {/* Minimal Link Bar */}
        <div className="d-flex flex-wrap align-items-center gap-3 small text-secondary border-top border-bottom py-2" style={{ borderColor: '#e2e8f0' }}>
          <EditableText
            value={p.location}
            onChange={v => updatePersonalInfo('location', v)}
            placeholder="Location"
          />
          <ResumeLink href={`mailto:${p.email}`}>
            <EditableText
              value={p.email}
              onChange={v => updatePersonalInfo('email', v)}
              placeholder="Email"
            />
          </ResumeLink>
          <ResumeLink href={`tel:${p.phone}`}>
            <EditableText
              value={p.phone}
              onChange={v => updatePersonalInfo('phone', v)}
              placeholder="Phone"
            />
          </ResumeLink>
          {p.linkedin && <ResumeLink href={p.linkedin} style={{ color: primaryColor, fontWeight: 600 }}>LinkedIn</ResumeLink>}
          {p.github && <ResumeLink href={p.github} style={{ color: primaryColor, fontWeight: 600 }}>GitHub</ResumeLink>}
          {p.website && <ResumeLink href={p.website} style={{ color: primaryColor, fontWeight: 600 }}>Portfolio</ResumeLink>}
        </div>
      </header>

      {/* Summary */}
      {(p.summary || onResumeChange) && (
        <section className={sectionSpacingClass}>
          <EditableText
            as="p"
            value={p.summary}
            onChange={v => updatePersonalInfo('summary', v)}
            placeholder="Click to write summary..."
            className="mb-0 text-secondary-emphasis"
            multiline
            style={{ textAlign: 'justify' }}
          />
        </section>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2 className="small fw-bold text-uppercase tracking-widest text-secondary mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            Experience
          </h2>
          <div className="d-flex flex-column gap-3.5">
            {exp.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <div>
                    <strong className="text-dark">
                      <EditableText
                        value={item.role}
                        onChange={v => updateExperience(idx, 'role', v)}
                        placeholder="Role"
                      />
                    </strong>
                    <span className="text-secondary">
                      {' / '}
                      <EditableText
                        value={item.company}
                        onChange={v => updateExperience(idx, 'company', v)}
                        placeholder="Company"
                      />
                    </span>
                  </div>
                  <span className="small text-secondary font-monospace ms-2">
                    <EditableText
                      value={item.startDate}
                      onChange={v => updateExperience(idx, 'startDate', v)}
                      placeholder="Start"
                    />
                    {' — '}
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
                        placeholder="Click to add bullet..."
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
