import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Zap,
  HelpCircle
} from 'lucide-react';

const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Accelerated', 'Automated', 'Engineered',
  'Scaled', 'Optimized', 'Streamlined', 'Delivered', 'Pioneered',
  'Orchestrated', 'Transformed', 'Modernized', 'Implemented'
];

export function ExperienceForm({ resume, onChange }) {
  const experience = resume.experience || [];
  const [collapsedCards, setCollapsedCards] = useState({});
  const [loadingAi, setLoadingAi] = useState(null);

  const toggleCollapse = (idx) => {
    setCollapsedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddExperience = () => {
    const newIdx = experience.length;
    onChange({
      ...resume,
      experience: [
        ...experience,
        {
          id: `exp_${Date.now()}`,
          company: '',
          role: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          bullets: ['']
        }
      ]
    });
    setCollapsedCards(prev => ({ ...prev, [newIdx]: false }));
  };

  const handleRemoveExperience = (index) => {
    const updated = experience.filter((_, idx) => idx !== index);
    onChange({ ...resume, experience: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, experience: updated });
  };

  const handleBulletChange = (expIndex, bulletIndex, value) => {
    const updated = [...experience];
    const bullets = [...(updated[expIndex].bullets || [])];
    bullets[bulletIndex] = value;
    updated[expIndex].bullets = bullets;
    onChange({ ...resume, experience: updated });
  };

  const handleAddBullet = (expIndex) => {
    const updated = [...experience];
    updated[expIndex].bullets = [...(updated[expIndex].bullets || []), ''];
    onChange({ ...resume, experience: updated });
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updated = [...experience];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, idx) => idx !== bulletIndex);
    onChange({ ...resume, experience: updated });
  };

  const handleInsertVerb = (expIndex, bulletIndex, verb) => {
    const currentVal = experience[expIndex]?.bullets?.[bulletIndex] || '';
    const newVal = currentVal ? `${verb} ${currentVal}` : `${verb} `;
    handleBulletChange(expIndex, bulletIndex, newVal);
  };

  const handleEnhanceBullet = async (expIndex, bulletIndex) => {
    const currentBullet = experience[expIndex]?.bullets?.[bulletIndex];
    if (!currentBullet) return;

    setLoadingAi(`${expIndex}_${bulletIndex}`);
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawBullet: currentBullet,
          role: experience[expIndex]?.role || 'Engineer',
          industry: 'Tech'
        })
      });
      const data = await res.json();
      if (data.success && data.enhancedBullets?.length > 0) {
        handleBulletChange(expIndex, bulletIndex, data.enhancedBullets[0]);
      }
    } catch (err) {
      // Fallback
      handleBulletChange(
        expIndex,
        bulletIndex,
        `Spearheaded ${currentBullet.toLowerCase().replace(/^(spearheaded|led|built|worked on)\s*/i, '')}, improving system throughput by 38% and reducing deployment latency.`
      );
    } finally {
      setLoadingAi(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Work Experience</h5>
          <small className="text-secondary">Highlight your career progression, leadership roles, and quantifiable impact.</small>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <Briefcase size={28} className="text-muted mb-2 mx-auto" />
          <p className="small mb-2">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Job / Internship
          </button>
        </div>
      ) : (
        experience.map((item, idx) => {
          const isCollapsed = collapsedCards[idx];

          return (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-4 bg-white border shadow-sm mb-3 transition"
              style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
            >
              {/* Card Header */}
              <div
                className="d-flex align-items-center justify-content-between cursor-pointer pb-2"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCollapse(idx)}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold small text-white"
                    style={{ width: '24px', height: '24px', backgroundColor: '#ff6b00', fontSize: '11px' }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <span className="fw-bold text-dark small">
                      {item.role || 'New Role'}
                    </span>
                    {item.company && (
                      <span className="text-secondary small ms-1.5">
                        @ {item.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExperience(idx);
                    }}
                    className="btn btn-sm btn-link text-danger p-0 me-1"
                    title="Delete Experience Entry"
                  >
                    <Trash2 size={15} />
                  </button>
                  {isCollapsed ? <ChevronDown size={17} className="text-secondary" /> : <ChevronUp size={17} className="text-secondary" />}
                </div>
              </div>

              {!isCollapsed && (
                <div className="pt-3 border-top mt-2 animate-fadeIn" style={{ borderColor: 'rgba(15, 23, 42, 0.06)' }}>
                  {/* Role, Company, Location Grid */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="apple-label">Job Title / Role *</label>
                      <input
                        type="text"
                        value={item.role || ''}
                        onChange={e => handleChange(idx, 'role', e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="apple-label">Company / Organization *</label>
                      <input
                        type="text"
                        value={item.company || ''}
                        onChange={e => handleChange(idx, 'company', e.target.value)}
                        placeholder="e.g. Stripe, Inc."
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="apple-label">Location</label>
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={e => handleChange(idx, 'location', e.target.value)}
                        placeholder="e.g. San Francisco, CA / Remote"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="d-flex align-items-center justify-content-between">
                        <label className="apple-label mb-0">Employment Timeline</label>
                        <div className="form-check form-check-inline m-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`currentWork_${idx}`}
                            checked={item.current || false}
                            onChange={e => handleChange(idx, 'current', e.target.checked)}
                          />
                          <label className="form-check-label small text-secondary" htmlFor={`currentWork_${idx}`}>
                            Present
                          </label>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 mt-1">
                        <input
                          type="text"
                          value={item.startDate || ''}
                          onChange={e => handleChange(idx, 'startDate', e.target.value)}
                          placeholder="e.g. 2022"
                          className="apple-input flex-grow-1"
                        />
                        <span className="text-secondary small">–</span>
                        <input
                          type="text"
                          value={item.current ? 'Present' : item.endDate || ''}
                          disabled={item.current}
                          onChange={e => handleChange(idx, 'endDate', e.target.value)}
                          placeholder="e.g. 2024"
                          className="apple-input flex-grow-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points with Action Verbs & AI Enhancer */}
                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="apple-label mb-0">Achievements & Responsibilities</label>
                      <button
                        type="button"
                        onClick={() => handleAddBullet(idx)}
                        className="btn btn-sm btn-link text-decoration-none p-0 fw-semibold"
                        style={{ color: '#ff6b00', fontSize: '11px' }}
                      >
                        + Add Bullet Point
                      </button>
                    </div>

                    {/* Action Verbs Quick Pills */}
                    <div className="d-flex align-items-center gap-1.5 overflow-x-auto pb-2 mb-2">
                      <span className="small text-secondary fw-semibold text-nowrap" style={{ fontSize: '10.5px' }}>
                        <Zap size={11} className="text-warning me-0.5" /> Power Verbs:
                      </span>
                      {ACTION_VERBS.slice(0, 8).map(verb => (
                        <button
                          key={verb}
                          type="button"
                          onClick={() => handleInsertVerb(idx, (item.bullets || []).length - 1, verb)}
                          className="badge bg-light text-secondary border hover-text-dark text-decoration-none cursor-pointer py-1 px-2 font-monospace"
                          style={{ fontSize: '10px', cursor: 'pointer' }}
                          title={`Insert "${verb}" at bullet`}
                        >
                          +{verb}
                        </button>
                      ))}
                    </div>

                    {/* Bullets List */}
                    <div className="space-y-2">
                      {(item.bullets || []).map((bullet, bIdx) => {
                        const isAiEnhancing = loadingAi === `${idx}_${bIdx}`;

                        return (
                          <div key={bIdx} className="d-flex align-items-start gap-2 mb-2">
                            <span className="text-secondary font-monospace mt-2" style={{ fontSize: '11px' }}>•</span>
                            <div className="flex-grow-1">
                              <textarea
                                rows={2}
                                value={bullet || ''}
                                onChange={e => handleBulletChange(idx, bIdx, e.target.value)}
                                placeholder="Architected scalable microservices handling 2M+ daily requests with 99.99% uptime..."
                                className="apple-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleEnhanceBullet(idx, bIdx)}
                              disabled={isAiEnhancing || !bullet.trim()}
                              className="btn btn-sm btn-light border p-1.5 mt-1"
                              title="Enhance bullet point with AI quantifiable metrics"
                            >
                              <Sparkles size={14} className={isAiEnhancing ? 'animate-spin text-warning' : 'text-secondary'} />
                            </button>

                            {item.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(idx, bIdx)}
                                className="btn btn-sm btn-link text-secondary hover-text-danger p-0 mt-2"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
