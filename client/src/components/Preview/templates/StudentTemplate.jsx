import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';

export function StudentTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#047857';
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

  const updateEducation = (idx, field, val) => {
    if (!onResumeChange) return;
    const updated = [...edu];
    updated[idx] = { ...updated[idx], [field]: val };
    onResumeChange({ ...resume, education: updated });
  };

  return (
    <div
      className="p-4 p-sm-5 bg-white text-dark w-100"
      style={{
        fontFamily,
        fontSize: baseFontSize,
        lineHeight: lineSpacing,
        color: '#111827'
      }}
    >
      {/* Student Header */}
      <header className={`text-center pb-3 ${sectionSpacingClass} border-bottom`} style={{ borderColor: primaryColor, borderWidth: '2px' }}>
        <h1 className="fw-bold tracking-tight mb-1" style={{ color: primaryColor, fontSize: '1.75rem' }}>
          <EditableText
            value={p.fullName}
            onChange={v => updatePersonalInfo('fullName', v)}
            placeholder="Candidate Name"
            style={{ color: primaryColor }}
          />
        </h1>
        <div className="small fw-semibold text-uppercase tracking-wider mb-2 text-secondary">
          <EditableText
            value={p.jobTitle}
            onChange={v => updatePersonalInfo('jobTitle', v)}
            placeholder="Field of Study / Aspiring Role"
          />
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 small text-secondary">
          <EditableText
            value={p.location}
            onChange={v => updatePersonalInfo('location', v)}
            placeholder="City, State"
          />
          <span>•</span>
          <ResumeLink href={`tel:${p.phone}`}>
            <EditableText
              value={p.phone}
              onChange={v => updatePersonalInfo('phone', v)}
              placeholder="Phone"
            />
          </ResumeLink>
          <span>•</span>
          <ResumeLink href={`mailto:${p.email}`}>
            <EditableText
              value={p.email}
              onChange={v => updatePersonalInfo('email', v)}
              placeholder="Email"
            />
          </ResumeLink>
          {p.linkedin && (
            <>
              <span>•</span>
              <ResumeLink href={p.linkedin} style={{ color: primaryColor, fontWeight: 600 }}>
                LinkedIn
              </ResumeLink>
            </>
          )}
        </div>
      </header>

      {/* Education (Placed First) */}
      {edu.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="small fw-bold text-uppercase pb-1 mb-2.5 border-bottom"
            style={{ color: primaryColor, borderColor: '#e5e7eb', fontSize: '0.8rem', letterSpacing: '0.06em' }}
          >
            Education & Academic Standing
          </h2>
          <div className="d-flex flex-column gap-2.5">
            {edu.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline mb-0.5">
                  <div>
                    <strong className="text-dark">
                      <EditableText
                        value={item.degree}
                        onChange={v => updateEducation(idx, 'degree', v)}
                        placeholder="Degree / Major"
                      />
                    </strong>
                    <span className="fw-semibold text-secondary">
                      {' — '}
                      <EditableText
                        value={item.school}
                        onChange={v => updateEducation(idx, 'school', v)}
                        placeholder="University"
                      />
                    </span>
                  </div>
                  <div className="small text-secondary text-nowrap ms-2">
                    <EditableText
                      value={item.startDate}
                      onChange={v => updateEducation(idx, 'startDate', v)}
                      placeholder="Start"
                    />
                    {' – '}
                    <EditableText
                      value={item.endDate}
                      onChange={v => updateEducation(idx, 'endDate', v)}
                      placeholder="End"
                    />
                  </div>
                </div>
                {item.score && <div className="small fw-semibold text-dark">GPA / Honor: {item.score}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
