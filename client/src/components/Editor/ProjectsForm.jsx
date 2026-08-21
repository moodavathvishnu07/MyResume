import React from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { sanitizeUrl } from '../Preview/templates/ResumeLink';

export function ProjectsForm({ resume, onChange }) {
  const projects = resume.projects || [];

  const handleAddProject = () => {
    onChange({
      ...resume,
      projects: [
        ...projects,
        {
          id: `proj_${Date.now()}`,
          name: '',
          techStack: '',
          link: '',
          bullets: ['']
        }
      ]
    });
  };

  const handleRemoveProject = (index) => {
    const updated = projects.filter((_, idx) => idx !== index);
    onChange({ ...resume, projects: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, projects: updated });
  };

  const handleBulletChange = (pIndex, bIndex, value) => {
    const updated = [...projects];
    const bullets = [...(updated[pIndex].bullets || [])];
    bullets[bIndex] = value;
    updated[pIndex].bullets = bullets;
    onChange({ ...resume, projects: updated });
  };

  const handleAddBullet = (pIndex) => {
    const updated = [...projects];
    updated[pIndex].bullets = [...(updated[pIndex].bullets || []), ''];
    onChange({ ...resume, projects: updated });
  };

  const handleRemoveBullet = (pIndex, bIndex) => {
    const updated = [...projects];
    updated[pIndex].bullets = updated[pIndex].bullets.filter((_, idx) => idx !== bIndex);
    onChange({ ...resume, projects: updated });
  };

  return (
    <div className="space-y-4">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Key Projects & Portfolios</h5>
          <small className="text-secondary">Highlight notable open-source or commercial applications with live demo links.</small>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <p className="small mb-2">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Project
          </button>
        </div>
      ) : (
        projects.map((proj, pIdx) => (
          <div
            key={proj.id || pIdx}
            className="p-3.5 rounded-4 bg-white border shadow-sm mb-3"
            style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="badge rounded-pill bg-light text-secondary border small font-monospace">
                Project #{pIdx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveProject(pIdx)}
                className="btn btn-sm btn-link text-danger p-0"
                title="Remove Project"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6">
                <label className="apple-label">Project Name *</label>
                <input
                  type="text"
                  value={proj.name || ''}
                  onChange={e => handleProjectChange(pIdx, 'name', e.target.value)}
                  placeholder="e.g. Distributed Analytics Engine"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="apple-label">Tech Stack</label>
                <input
                  type="text"
                  value={proj.techStack || ''}
                  onChange={e => handleProjectChange(pIdx, 'techStack', e.target.value)}
                  placeholder="e.g. TypeScript, React, Go, Redis"
                  className="apple-input"
                />
              </div>

              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="apple-label mb-1">Live Demo / Repository URL</label>
                  {proj.link && sanitizeUrl(proj.link) && (
                    <a
                      href={sanitizeUrl(proj.link)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none small d-flex align-items-center gap-1 mb-1"
                      style={{ color: '#ff6b00', fontSize: '11px' }}
                      title="Test Live Demo Link"
                    >
                      <Globe size={11} />
                      <span>Test URL ↗</span>
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={proj.link || ''}
                  onChange={e => handleProjectChange(pIdx, 'link', e.target.value)}
                  placeholder="e.g. https://github.com/alex/project or projectdemo.com"
                  className="apple-input"
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <label className="apple-label mb-0">Project Highlights & Impact</label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(pIdx)}
                  className="btn btn-sm btn-link text-decoration-none p-0 fw-semibold"
                  style={{ color: '#ff6b00', fontSize: '11px' }}
                >
                  + Add Bullet
                </button>
              </div>

              <div className="space-y-2">
                {(proj.bullets || []).map((bullet, bIdx) => (
                  <div key={bIdx} className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-secondary font-monospace" style={{ fontSize: '11px' }}>•</span>
                    <input
                      type="text"
                      value={bullet || ''}
                      onChange={e => handleBulletChange(pIdx, bIdx, e.target.value)}
                      placeholder="Engineered real-time telemetry processing pipeline capable of handling 50k events/sec..."
                      className="apple-input"
                    />
                    {proj.bullets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(pIdx, bIdx)}
                        className="btn btn-sm btn-link text-secondary hover-text-danger p-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
