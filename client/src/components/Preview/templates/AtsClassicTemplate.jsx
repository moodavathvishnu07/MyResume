import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';

export function AtsClassicTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#1e3a8a';
  const fontFamily = settings.fontFamily || 'Inter';

  // Spacing & Font multipliers
  const lineSpacing = settings.spacing === 'compact' ? 1.3 : settings.spacing === 'relaxed' ? 1.6 : 1.45;
  const sectionSpacingClass = settings.spacing === 'compact' ? 'mb-3' : settings.spacing === 'relaxed' ? 'mb-5' : 'mb-4';
  const baseFontSize = settings.fontSize === 'small' ? '12px' : settings.fontSize === 'large' ? '14px' : '13px';

  // Direct Inline Update Helpers
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

  const updateEducation = (idx, field, val) => {
    if (!onResumeChange) return;
    const updated = [...edu];
    updated[idx] = { ...updated[idx], [field]: val };
    onResumeChange({ ...resume, education: updated });
  };

  const updateProject = (idx, field, val) => {
    if (!onResumeChange) return;
    const updated = [...projects];
    updated[idx] = { ...updated[idx], [field]: val };
    onResumeChange({ ...resume, projects: updated });
  };

  const updateProjBullet = (projIdx, bIdx, val) => {
    if (!onResumeChange) return;
    const updated = [...projects];
    const bullets = [...(updated[projIdx].bullets || [])];
    bullets[bIdx] = val;
    updated[projIdx].bullets = bullets;
    onResumeChange({ ...resume, projects: updated });
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
      {/* Header Container */}
      <header className={`text-center pb-3 ${sectionSpacingClass} border-bottom`} style={{ borderColor: primaryColor, borderWidth: '2px' }}>
        <h1
          className="fw-bold tracking-tight text-uppercase mb-1"
          style={{
            fontSize: '1.75rem',
            color: primaryColor,
            letterSpacing: '0.02em'
          }}
        >
          <EditableText
            value={p.fullName}
            onChange={v => updatePersonalInfo('fullName', v)}
            placeholder="Candidate Full Name"
          />
        </h1>

        <div
          className="fw-semibold text-uppercase tracking-wider mb-2"
          style={{ fontSize: '0.875rem', color: '#4b5563', letterSpacing: '0.05em' }}
        >
          <EditableText
            value={p.jobTitle}
            onChange={v => updatePersonalInfo('jobTitle', v)}
            placeholder="Professional Title"
          />
        </div>

        {/* Contact info line with clickable links */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 small text-secondary">
          <EditableText
            value={p.location}
            onChange={v => updatePersonalInfo('location', v)}
            placeholder="City, Country"
          />
          <span>•</span>
          <ResumeLink href={`tel:${p.phone}`}>
            <EditableText
              value={p.phone}
              onChange={v => updatePersonalInfo('phone', v)}
              placeholder="Phone Number"
            />
          </ResumeLink>
          <span>•</span>
          <ResumeLink href={`mailto:${p.email}`}>
            <EditableText
              value={p.email}
              onChange={v => updatePersonalInfo('email', v)}
              placeholder="Email Address"
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
          {p.github && (
            <>
              <span>•</span>
              <ResumeLink href={p.github} style={{ color: primaryColor, fontWeight: 600 }}>
                GitHub
              </ResumeLink>
            </>
          )}
          {p.website && (
            <>
              <span>•</span>
              <ResumeLink href={p.website} style={{ color: primaryColor, fontWeight: 600 }}>
                Portfolio
              </ResumeLink>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {(p.summary || onResumeChange) && (
        <section className={sectionSpacingClass}>
          <h2
            className="fw-bold text-uppercase pb-1 mb-2 border-bottom"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: primaryColor,
              borderColor: '#e5e7eb'
            }}
          >
            Professional Summary
          </h2>
          <EditableText
            as="p"
            value={p.summary}
            onChange={v => updatePersonalInfo('summary', v)}
            placeholder="Click to write a concise professional summary highlighting your key achievements..."
            className="mb-0 text-secondary-emphasis"
            multiline
            style={{ textAlign: 'justify' }}
          />
        </section>
      )}

      {/* Work Experience */}
      {exp.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="fw-bold text-uppercase pb-1 mb-2.5 border-bottom"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: primaryColor,
              borderColor: '#e5e7eb'
            }}
          >
            Work Experience
          </h2>
          <div className="d-flex flex-column gap-3">
            {exp.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <div>
                    <strong className="text-dark">
                      <EditableText
                        value={item.role}
                        onChange={v => updateExperience(idx, 'role', v)}
                        placeholder="Job Title"
                      />
                    </strong>
                    <span className="fw-semibold text-secondary">
                      , <EditableText
                        value={item.company}
                        onChange={v => updateExperience(idx, 'company', v)}
                        placeholder="Company Name"
                      />
                    </span>
                  </div>
                  <div className="small text-secondary text-nowrap ms-2">
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
                    {item.location ? ` | ${item.location}` : ''}
                  </div>
                </div>
                <ul className="mb-0 ps-3 text-secondary-emphasis" style={{ listStyleType: 'disc' }}>
                  {(item.bullets || []).map((b, bIdx) => (
                    <li key={bIdx} className="mb-1">
                      <EditableText
                        value={b}
                        onChange={v => updateExpBullet(idx, bIdx, v)}
                        placeholder="Click to add action-driven achievement..."
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

      {/* Skills */}
      {skills.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="fw-bold text-uppercase pb-1 mb-2 border-bottom"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: primaryColor,
              borderColor: '#e5e7eb'
            }}
          >
            Technical & Professional Skills
          </h2>
          <div className="d-flex flex-column gap-1.5">
            {skills.map((s, idx) => (
              <div key={idx} className="text-secondary-emphasis">
                <strong className="text-dark">{s.category}: </strong>
                <span>{(s.items || []).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="fw-bold text-uppercase pb-1 mb-2.5 border-bottom"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: primaryColor,
              borderColor: '#e5e7eb'
            }}
          >
            Key Projects
          </h2>
          <div className="d-flex flex-column gap-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <div>
                    <strong className="text-dark">
                      <EditableText
                        value={proj.name}
                        onChange={v => updateProject(idx, 'name', v)}
                        placeholder="Project Name"
                      />
                    </strong>
                    {proj.techStack && (
                      <span className="small text-secondary ms-2">[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.link && (
                    <ResumeLink href={proj.link} style={{ color: primaryColor, fontWeight: 600, fontSize: '0.8rem' }}>
                      View Project ↗
                    </ResumeLink>
                  )}
                </div>
                <ul className="mb-0 ps-3 text-secondary-emphasis" style={{ listStyleType: 'disc' }}>
                  {(proj.bullets || []).map((b, bIdx) => (
                    <li key={bIdx} className="mb-1">
                      <EditableText
                        value={b}
                        onChange={v => updateProjBullet(idx, bIdx, v)}
                        placeholder="Click to add project impact details..."
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

      {/* Education */}
      {edu.length > 0 && (
        <section className={sectionSpacingClass}>
          <h2
            className="fw-bold text-uppercase pb-1 mb-2 border-bottom"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              color: primaryColor,
              borderColor: '#e5e7eb'
            }}
          >
            Education
          </h2>
          <div className="d-flex flex-column gap-2">
            {edu.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="d-flex justify-content-between align-items-baseline">
                  <div>
                    <strong className="text-dark">
                      <EditableText
                        value={item.degree}
                        onChange={v => updateEducation(idx, 'degree', v)}
                        placeholder="Degree Title"
                      />
                    </strong>
                    <span className="text-secondary">
                      {' — '}
                      <EditableText
                        value={item.school}
                        onChange={v => updateEducation(idx, 'school', v)}
                        placeholder="University / College"
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
                {item.score && <div className="small text-secondary">GPA / Standing: {item.score}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages Grid */}
      {(certs.length > 0 || languages.length > 0 || achievements.length > 0) && (
        <div className="row g-4">
          {certs.length > 0 && (
            <div className="col-12 col-sm-6">
              <h2
                className="fw-bold text-uppercase pb-1 mb-2 border-bottom"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  color: primaryColor,
                  borderColor: '#e5e7eb'
                }}
              >
                Certifications
              </h2>
              <div className="d-flex flex-column gap-1.5 small text-secondary-emphasis">
                {certs.map((c, idx) => (
                  <div key={c.id || idx}>
                    <strong className="text-dark">{c.name}</strong>
                    {c.issuer && <span> ({c.issuer})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="col-12 col-sm-6">
              <h2
                className="fw-bold text-uppercase pb-1 mb-2 border-bottom"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  color: primaryColor,
                  borderColor: '#e5e7eb'
                }}
              >
                Languages
              </h2>
              <div className="d-flex flex-column gap-1 small text-secondary-emphasis">
                {languages.map((l, idx) => (
                  <div key={l.id || idx}>
                    <strong className="text-dark">{l.language}: </strong>
                    <span>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
