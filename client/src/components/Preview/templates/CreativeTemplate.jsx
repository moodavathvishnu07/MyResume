import React from 'react';
import { ResumeLink } from './ResumeLink';
import { EditableText } from './EditableText';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, BookOpen, Briefcase, Code } from 'lucide-react';

export function CreativeTemplate({ resume, settings, onResumeChange }) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const primaryColor = settings.primaryColor || '#ff6b00';
  const fontFamily = settings.fontFamily || 'Plus Jakarta Sans';

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

  return (
    <div
      className="bg-white text-dark w-100"
      style={{
        fontFamily,
        fontSize: baseFontSize,
        lineHeight: lineSpacing
      }}
    >
      {/* Top Gradient Banner */}
      <div
        className="p-4 p-sm-5 text-white position-relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #1e1b4b 100%)`
        }}
      >
        <div className="d-flex align-items-center gap-4 position-relative z-1">
          {settings.showPhoto && p.photo && (
            <img
              src={p.photo}
              alt={p.fullName}
              className={`object-cover border border-3 border-white shadow-lg ${
                settings.photoShape === 'circle'
                  ? 'rounded-circle'
                  : settings.photoShape === 'rounded'
                  ? 'rounded-4'
                  : 'rounded-0'
              }`}
              style={{
                width: '95px',
                height: '95px'
              }}
            />
          )}

          <div className="flex-grow-1">
            <h1 className="h3 fw-extrabold text-white mb-1 tracking-tight" style={{ fontSize: '1.75rem' }}>
              <EditableText
                value={p.fullName}
                onChange={v => updatePersonalInfo('fullName', v)}
                placeholder="Candidate Name"
                style={{ color: '#ffffff' }}
              />
            </h1>
            <div className="small fw-semibold text-uppercase tracking-wider text-white-50 mb-3" style={{ letterSpacing: '0.06em' }}>
              <EditableText
                value={p.jobTitle}
                onChange={v => updatePersonalInfo('jobTitle', v)}
                placeholder="Role Title"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              />
            </div>

            {/* Contact Pills */}
            <div className="d-flex flex-wrap gap-2 small">
              <div className="badge rounded-pill bg-white bg-opacity-15 text-white py-1.5 px-2.5 d-flex align-items-center gap-1.5">
                <Mail size={12} />
                <EditableText
                  value={p.email}
                  onChange={v => updatePersonalInfo('email', v)}
                  placeholder="email"
                  style={{ color: '#ffffff' }}
                />
              </div>
              <div className="badge rounded-pill bg-white bg-opacity-15 text-white py-1.5 px-2.5 d-flex align-items-center gap-1.5">
                <Phone size={12} />
                <EditableText
                  value={p.phone}
                  onChange={v => updatePersonalInfo('phone', v)}
                  placeholder="phone"
                  style={{ color: '#ffffff' }}
                />
              </div>
              <div className="badge rounded-pill bg-white bg-opacity-15 text-white py-1.5 px-2.5 d-flex align-items-center gap-1.5">
                <MapPin size={12} />
                <EditableText
                  value={p.location}
                  onChange={v => updatePersonalInfo('location', v)}
                  placeholder="location"
                  style={{ color: '#ffffff' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 p-sm-5 d-flex flex-column gap-4">
        {/* Professional Summary */}
        {(p.summary || onResumeChange) && (
          <section className="p-3.5 rounded-4 bg-light border" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
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
          <section>
            <h2 className="small fw-bold text-uppercase tracking-wider mb-3 d-flex align-items-center gap-2" style={{ color: primaryColor, fontSize: '0.85rem' }}>
              <Briefcase size={16} /> Work Experience
            </h2>
            <div className="d-flex flex-column gap-3.5">
              {exp.map((item, idx) => (
                <div key={item.id || idx} className="ps-3 border-start" style={{ borderColor: primaryColor, borderWidth: '2px' }}>
                  <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <div>
                      <strong className="text-dark">
                        <EditableText
                          value={item.role}
                          onChange={v => updateExperience(idx, 'role', v)}
                          placeholder="Role"
                        />
                      </strong>
                      <span className="text-secondary fw-semibold">
                        {' — '}
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
                          placeholder="Click to add accomplishment..."
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
    </div>
  );
}
