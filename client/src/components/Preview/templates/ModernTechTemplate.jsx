import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

export function ModernTechTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#ff6b00';
  const fontFamily = settings.fontFamily || 'Outfit';

  const baseFontSize = settings.fontSize === 'small' ? '12px' : settings.fontSize === 'large' ? '14px' : '13px';
  const lineSpacing = settings.spacing === 'compact' ? 1.35 : settings.spacing === 'relaxed' ? 1.6 : 1.45;

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
      className="d-flex min-vh-100 bg-white text-dark w-100"
      style={{
        fontFamily,
        fontSize: baseFontSize,
        lineHeight: lineSpacing
      }}
    >
      {/* Left Sidebar (35%) */}
      <aside
        className="p-4 d-flex flex-column gap-4 text-white flex-shrink-0"
        style={{
          width: '35%',
          backgroundColor: '#0f172a',
          borderRight: '1px solid #1e293b'
        }}
      >
        {/* Profile Avatar Image */}
        {settings.showPhoto && p.photo && (
          <div className="d-flex justify-content-center">
            <img
              src={p.photo}
              alt={p.fullName}
              className={`object-cover shadow-lg ${
                settings.photoShape === 'circle'
                  ? 'rounded-circle'
                  : settings.photoShape === 'rounded'
                  ? 'rounded-4'
                  : 'rounded-0'
              }`}
              style={{
                width: '100px',
                height: '100px',
                border: `3px solid ${primaryColor}`
              }}
            />
          </div>
        )}

        {/* Candidate Info in Sidebar */}
        <div className="text-center text-sm-start">
          <h1 className="h5 fw-bold text-white mb-1 tracking-tight" style={{ fontSize: '1.25rem' }}>
            <EditableText
              value={p.fullName}
              onChange={v => updatePersonalInfo('fullName', v)}
              placeholder="Candidate Name"
              style={{ color: '#ffffff' }}
            />
          </h1>
          <div className="small fw-semibold text-uppercase tracking-wider" style={{ color: primaryColor, fontSize: '0.75rem' }}>
            <EditableText
              value={p.jobTitle}
              onChange={v => updatePersonalInfo('jobTitle', v)}
              placeholder="Role Title"
              style={{ color: primaryColor }}
            />
          </div>
        </div>

        {/* Contact info list with clickable links */}
        <div className="d-flex flex-column gap-2 small">
          <div className="text-uppercase fw-bold text-secondary border-bottom border-secondary border-opacity-25 pb-1" style={{ fontSize: '10px' }}>
            Contact Info
          </div>

          <div className="d-flex align-items-center gap-2 text-light text-truncate">
            <Mail size={13} className="text-secondary flex-shrink-0" />
            <EditableText
              value={p.email}
              onChange={v => updatePersonalInfo('email', v)}
              placeholder="email@example.com"
              style={{ color: '#f8fafc', fontSize: '11.5px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-2 text-light">
            <Phone size={13} className="text-secondary flex-shrink-0" />
            <EditableText
              value={p.phone}
              onChange={v => updatePersonalInfo('phone', v)}
              placeholder="+1 555-0100"
              style={{ color: '#f8fafc', fontSize: '11.5px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-2 text-light" style={{ fontSize: '11.5px' }}>
            <MapPin size={13} className="text-secondary flex-shrink-0" />
            <EditableText
              value={p.location}
              onChange={v => updatePersonalInfo('location', v)}
              placeholder="Location"
              style={{ color: '#f8fafc' }}
            />
          </div>

          {p.linkedin && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <Linkedin size={13} className="text-secondary flex-shrink-0" />
              <ResumeLink href={p.linkedin} style={{ color: primaryColor, fontSize: '11.5px' }} className="text-truncate">
                LinkedIn Profile
              </ResumeLink>
            </div>
          )}

          {p.github && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <Github size={13} className="text-secondary flex-shrink-0" />
              <ResumeLink href={p.github} style={{ color: primaryColor, fontSize: '11.5px' }} className="text-truncate">
                GitHub Repo
              </ResumeLink>
            </div>
          )}

          {p.website && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <Globe size={13} className="text-secondary flex-shrink-0" />
              <ResumeLink href={p.website} style={{ color: primaryColor, fontSize: '11.5px' }} className="text-truncate">
                Portfolio Website
              </ResumeLink>
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills.length > 0 && (
          <div className="d-flex flex-column gap-2.5">
            <div className="text-uppercase fw-bold text-secondary border-bottom border-secondary border-opacity-25 pb-1" style={{ fontSize: '10px' }}>
              Skills & Tech Stack
            </div>
            {skills.map((s, idx) => (
              <div key={idx}>
                <div className="small fw-semibold text-light mb-1" style={{ fontSize: '11px' }}>{s.category}</div>
                <div className="d-flex flex-wrap gap-1">
                  {(s.items || []).map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="badge rounded-pill bg-dark border border-secondary border-opacity-50 text-light fw-normal py-1 px-2"
                      style={{ fontSize: '10.5px' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in Sidebar */}
        {edu.length > 0 && (
          <div className="d-flex flex-column gap-2">
            <div className="text-uppercase fw-bold text-secondary border-bottom border-secondary border-opacity-25 pb-1" style={{ fontSize: '10px' }}>
              Education
            </div>
            {edu.map((e, idx) => (
              <div key={e.id || idx} className="small text-light">
                <strong className="d-block text-white" style={{ fontSize: '12px' }}>{e.degree}</strong>
                <span className="text-secondary d-block" style={{ fontSize: '11px' }}>{e.school}</span>
                <span className="text-muted d-block" style={{ fontSize: '10.5px' }}>{e.startDate} – {e.endDate || 'Present'}</span>
                {e.score && <span className="badge bg-secondary bg-opacity-25 text-warning mt-1" style={{ fontSize: '10px' }}>{e.score}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages.length > 0 && (
          <div className="d-flex flex-column gap-1.5 small">
            <div className="text-uppercase fw-bold text-secondary border-bottom border-secondary border-opacity-25 pb-1" style={{ fontSize: '10px' }}>
              Languages
            </div>
            {languages.map((l, idx) => (
              <div key={l.id || idx} className="d-flex justify-content-between text-light" style={{ fontSize: '11.5px' }}>
                <span>{l.language}</span>
                <span className="text-secondary" style={{ fontSize: '10.5px' }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area (65%) */}
      <main className="p-4 p-sm-5 d-flex flex-column gap-4 flex-grow-1">
        {/* Professional Summary */}
        {(p.summary || onResumeChange) && (
          <section>
            <h2 className="small fw-bold text-uppercase tracking-wider text-dark mb-2 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: primaryColor }} />
              Professional Summary
            </h2>
            <EditableText
              as="p"
              value={p.summary}
              onChange={v => updatePersonalInfo('summary', v)}
              placeholder="Click to write a concise professional summary highlighting your key achievements..."
              className="text-secondary-emphasis mb-0"
              multiline
              style={{ textAlign: 'justify' }}
            />
          </section>
        )}

        {/* Work Experience */}
        {exp.length > 0 && (
          <section>
            <h2 className="small fw-bold text-uppercase tracking-wider text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: primaryColor }} />
              Work Experience
            </h2>
            <div className="d-flex flex-column gap-3.5">
              {exp.map((item, idx) => (
                <div key={item.id || idx} className="ps-3 border-start" style={{ borderColor: primaryColor, borderWidth: '2px' }}>
                  <div className="d-flex justify-content-between align-items-baseline mb-0.5">
                    <div>
                      <strong className="text-dark">
                        <EditableText
                          value={item.role}
                          onChange={v => updateExperience(idx, 'role', v)}
                          placeholder="Job Title"
                        />
                      </strong>
                      <span className="fw-semibold ms-1" style={{ color: primaryColor }}>
                        {' @ '}
                        <EditableText
                          value={item.company}
                          onChange={v => updateExperience(idx, 'company', v)}
                          placeholder="Company"
                          style={{ color: primaryColor }}
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
                  {item.location && <div className="small text-muted fst-italic mb-1">{item.location}</div>}
                  <ul className="mb-0 ps-3 text-secondary-emphasis" style={{ listStyleType: 'disc' }}>
                    {(item.bullets || []).map((b, bIdx) => (
                      <li key={bIdx} className="mb-1">
                        <EditableText
                          value={b}
                          onChange={v => updateExpBullet(idx, bIdx, v)}
                          placeholder="Click to write work bullet..."
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

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="small fw-bold text-uppercase tracking-wider text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: primaryColor }} />
              Featured Projects
            </h2>
            <div className="d-flex flex-column gap-2.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="p-3 rounded-3 bg-light border" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
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
                      <ResumeLink href={proj.link} className="small fw-semibold d-flex align-items-center gap-1" style={{ color: primaryColor, fontSize: '11px' }}>
                        Demo <ExternalLink size={11} />
                      </ResumeLink>
                    )}
                  </div>
                  <ul className="mb-0 ps-3 text-secondary-emphasis" style={{ listStyleType: 'disc' }}>
                    {(proj.bullets || []).map((b, bIdx) => (
                      <li key={bIdx} className="mb-0.5">
                        <EditableText
                          value={b}
                          onChange={v => updateProjBullet(idx, bIdx, v)}
                          placeholder="Click to write project highlight..."
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
      </main>
    </div>
  );
}
