import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

export function EducationForm({ resume, onChange }) {
  const education = resume.education || [];
  const [collapsedCards, setCollapsedCards] = useState({});

  const toggleCollapse = (idx) => {
    setCollapsedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddEducation = () => {
    const newIdx = education.length;
    onChange({
      ...resume,
      education: [
        ...education,
        {
          id: `edu_${Date.now()}`,
          school: '',
          degree: '',
          location: '',
          startDate: '',
          endDate: '',
          score: '',
          description: ''
        }
      ]
    });
    setCollapsedCards(prev => ({ ...prev, [newIdx]: false }));
  };

  const handleRemoveEducation = (index) => {
    const updated = education.filter((_, idx) => idx !== index);
    onChange({ ...resume, education: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, education: updated });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Education & Academics</h5>
          <small className="text-secondary">Degrees, universities, honors, GPA, and relevant coursework.</small>
        </div>
        <button
          type="button"
          onClick={handleAddEducation}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <GraduationCap size={28} className="text-muted mb-2 mx-auto" />
          <p className="small mb-2">No education records added yet.</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Degree
          </button>
        </div>
      ) : (
        education.map((item, idx) => {
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
                      {item.degree || 'Degree / Major'}
                    </span>
                    {item.school && (
                      <span className="text-secondary small ms-1.5">
                        — {item.school}
                      </span>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEducation(idx);
                    }}
                    className="btn btn-sm btn-link text-danger p-0 me-1"
                    title="Delete Education Entry"
                  >
                    <Trash2 size={15} />
                  </button>
                  {isCollapsed ? <ChevronDown size={17} className="text-secondary" /> : <ChevronUp size={17} className="text-secondary" />}
                </div>
              </div>

              {!isCollapsed && (
                <div className="pt-3 border-top mt-2 animate-fadeIn" style={{ borderColor: 'rgba(15, 23, 42, 0.06)' }}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="apple-label">Degree / Field of Study *</label>
                      <input
                        type="text"
                        value={item.degree || ''}
                        onChange={e => handleChange(idx, 'degree', e.target.value)}
                        placeholder="e.g. B.S. in Computer Science"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="apple-label">University / Institution *</label>
                      <input
                        type="text"
                        value={item.school || ''}
                        onChange={e => handleChange(idx, 'school', e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="apple-label">Location</label>
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={e => handleChange(idx, 'location', e.target.value)}
                        placeholder="e.g. Stanford, CA"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="apple-label">Start Year</label>
                      <input
                        type="text"
                        value={item.startDate || ''}
                        onChange={e => handleChange(idx, 'startDate', e.target.value)}
                        placeholder="e.g. 2018"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="apple-label">Graduation Year</label>
                      <input
                        type="text"
                        value={item.endDate || ''}
                        onChange={e => handleChange(idx, 'endDate', e.target.value)}
                        placeholder="e.g. 2022"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="apple-label">GPA / Standing / Honors</label>
                      <input
                        type="text"
                        value={item.score || ''}
                        onChange={e => handleChange(idx, 'score', e.target.value)}
                        placeholder="e.g. 3.92 / 4.0 (Magna Cum Laude)"
                        className="apple-input"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="apple-label">Relevant Coursework / Minor</label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={e => handleChange(idx, 'description', e.target.value)}
                        placeholder="e.g. Distributed Systems, Algorithms, Compilers"
                        className="apple-input"
                      />
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
