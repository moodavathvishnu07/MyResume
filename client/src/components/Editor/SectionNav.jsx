import React from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Languages,
  Palette
} from 'lucide-react';

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'achievements', label: 'Awards', icon: Trophy },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'design', label: 'Design & Style', icon: Palette }
];

export function SectionNav({ activeSection, setActiveSection, resume }) {
  const isSectionFilled = (id) => {
    if (!resume) return false;
    switch (id) {
      case 'personal':
        return Boolean(resume.personalInfo?.fullName && resume.personalInfo?.email);
      case 'experience':
        return Boolean(resume.experience?.length > 0 && resume.experience[0]?.role);
      case 'education':
        return Boolean(resume.education?.length > 0 && resume.education[0]?.degree);
      case 'skills':
        return Boolean(resume.skills?.length > 0 && resume.skills.some(s => s.items?.length > 0));
      case 'projects':
        return Boolean(resume.projects?.length > 0 && resume.projects[0]?.name);
      case 'certifications':
        return Boolean(resume.certifications?.length > 0 && resume.certifications[0]?.name);
      case 'achievements':
        return Boolean(resume.achievements?.length > 0 && resume.achievements[0]?.title);
      case 'languages':
        return Boolean(resume.languages?.length > 0 && resume.languages[0]?.language);
      default:
        return false;
    }
  };

  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];
  const progressPercent = Math.round(((currentIndex + 1) / SECTIONS.length) * 100);

  return (
    <div className="bg-white border-bottom sticky-top z-2 flex-shrink-0 shadow-2xs" style={{ borderColor: '#e2e8f0' }}>
      {/* Progress Bar Line */}
      <div className="w-100 bg-light position-relative" style={{ height: '3px' }}>
        <div
          className="h-100 transition-all"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #ff6b00 0%, #ff3b30 100%)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* Mobile Context Status Bar (Step X of 9) */}
      <div className="d-flex d-md-none align-items-center justify-content-between px-3 pt-1.5 pb-0 text-secondary" style={{ fontSize: '10.5px' }}>
        <span className="fw-bold font-monospace text-dark">
          Step {currentIndex + 1} of {SECTIONS.length}
        </span>
        <span className="fw-semibold" style={{ color: '#ff6b00' }}>
          {currentSection.label} Section
        </span>
      </div>

      {/* Horizontally Scrollable Section Pills */}
      <div
        className="px-2.5 py-2 d-flex align-items-center gap-1.5 overflow-x-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {SECTIONS.map((section, idx) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const filled = isSectionFilled(section.id);

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`btn btn-sm d-flex align-items-center gap-1.5 rounded-pill py-1.5 px-3 text-nowrap transition ${
                isActive
                  ? 'btn-warning text-white fw-bold shadow-2xs'
                  : 'btn-light text-dark hover-text-orange border'
              }`}
              style={{
                fontSize: '12px',
                backgroundColor: isActive ? '#ff6b00' : '#ffffff',
                color: isActive ? '#ffffff' : '#1e293b',
                borderColor: isActive ? '#ff6b00' : '#cbd5e1',
                minHeight: '34px'
              }}
            >
              <Icon size={14} className={isActive ? 'text-white' : 'text-dark'} />
              <span style={{ fontWeight: isActive ? 700 : 600 }}>{section.label}</span>
              {filled && !isActive && (
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold ms-0.5"
                  style={{ width: '13px', height: '13px', fontSize: '8.5px' }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
