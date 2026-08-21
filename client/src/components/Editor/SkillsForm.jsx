import React, { useState } from 'react';
import { Plus, Trash2, Tag, X, Sparkles } from 'lucide-react';

const SUGGESTED_KEYWORDS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'AWS',
  'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'Redis',
  'System Design', 'CI/CD', 'Microservices', 'REST APIs', 'Git'
];

export function SkillsForm({ resume, onChange }) {
  const skills = resume.skills || [];
  const [tagInputs, setTagInputs] = useState({});

  const handleAddCategory = () => {
    onChange({
      ...resume,
      skills: [
        ...skills,
        {
          category: 'New Skill Category',
          items: []
        }
      ]
    });
  };

  const handleRemoveCategory = (index) => {
    const updated = skills.filter((_, idx) => idx !== index);
    onChange({ ...resume, skills: updated });
  };

  const handleCategoryNameChange = (index, name) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], category: name };
    onChange({ ...resume, skills: updated });
  };

  const handleAddSkillTag = (index, tag) => {
    const trimmed = tag.trim().replace(/,$/, '');
    if (!trimmed) return;

    const updated = [...skills];
    const currentItems = updated[index]?.items || [];
    if (!currentItems.includes(trimmed)) {
      updated[index] = { ...updated[index], items: [...currentItems, trimmed] };
      onChange({ ...resume, skills: updated });
    }
    setTagInputs(prev => ({ ...prev, [index]: '' }));
  };

  const handleRemoveSkillTag = (catIndex, itemIndex) => {
    const updated = [...skills];
    const currentItems = updated[catIndex]?.items || [];
    updated[catIndex] = {
      ...updated[catIndex],
      items: currentItems.filter((_, idx) => idx !== itemIndex)
    };
    onChange({ ...resume, skills: updated });
  };

  const handleKeyDown = (catIndex, e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkillTag(catIndex, tagInputs[catIndex] || '');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Skills & Core Competencies</h5>
          <small className="text-secondary">Group skills into categories (e.g. Languages, Frameworks, Cloud & DevOps).</small>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Suggested 1-Click ATS Keywords */}
      <div className="p-3 rounded-4 bg-light border mb-4" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div className="d-flex align-items-center gap-1.5 small text-secondary fw-semibold mb-2" style={{ fontSize: '11px' }}>
          <Sparkles size={13} style={{ color: '#ff6b00' }} />
          <span>Popular ATS Tech Keywords (Click to add to first category):</span>
        </div>
        <div className="d-flex flex-wrap gap-1.5">
          {SUGGESTED_KEYWORDS.map(kw => (
            <button
              key={kw}
              type="button"
              onClick={() => handleAddSkillTag(0, kw)}
              className="badge bg-white text-dark border py-1.5 px-2.5 rounded-pill shadow-2xs hover-text-orange cursor-pointer transition"
              style={{ fontSize: '11px', cursor: 'pointer' }}
            >
              +{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Categories List */}
      {skills.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <p className="small mb-2">No skill categories added yet.</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Skill Category
          </button>
        </div>
      ) : (
        skills.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="p-3.5 rounded-4 bg-white border shadow-sm mb-3"
            style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <input
                type="text"
                value={cat.category || ''}
                onChange={e => handleCategoryNameChange(catIdx, e.target.value)}
                placeholder="Category Name (e.g. Languages & Frameworks)"
                className="form-control form-control-sm fw-bold border-0 bg-light p-2 text-dark rounded-3"
                style={{ fontSize: '13px', maxWidth: '300px' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(catIdx)}
                className="btn btn-sm btn-link text-danger p-0"
                title="Remove Category"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Tag Badges */}
            <div className="d-flex flex-wrap gap-1.5 mb-2.5">
              {(cat.items || []).map((item, iIdx) => (
                <span
                  key={iIdx}
                  className="badge rounded-pill bg-light border text-dark d-inline-flex align-items-center gap-1.5 py-1.5 px-2.5 shadow-2xs"
                  style={{ fontSize: '11.5px' }}
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkillTag(catIdx, iIdx)}
                    className="btn btn-sm btn-link p-0 text-secondary hover-text-danger d-inline-flex"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Tag Input Field */}
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                value={tagInputs[catIdx] || ''}
                onChange={e => setTagInputs(prev => ({ ...prev, [catIdx]: e.target.value }))}
                onKeyDown={e => handleKeyDown(catIdx, e)}
                placeholder="Type skill name & press Enter or comma (e.g. React, Next.js)..."
                className="apple-input flex-grow-1"
                style={{ fontSize: '12px' }}
              />
              <button
                type="button"
                onClick={() => handleAddSkillTag(catIdx, tagInputs[catIdx] || '')}
                className="btn btn-light-secondary btn-sm text-nowrap"
              >
                + Add Tag
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
