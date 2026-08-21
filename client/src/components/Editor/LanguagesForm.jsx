import React from 'react';
import { Plus, Trash2, Languages as LangIcon } from 'lucide-react';

const PROFICIENCY_LEVELS = [
  'Native / Bilingual',
  'Fluent / Professional',
  'Intermediate',
  'Conversational',
  'Basic / Elementary'
];

export function LanguagesForm({ resume, onChange }) {
  const languages = resume.languages || [];

  const handleAddLanguage = () => {
    onChange({
      ...resume,
      languages: [
        ...languages,
        {
          id: `lang_${Date.now()}`,
          language: '',
          proficiency: 'Fluent / Professional'
        }
      ]
    });
  };

  const handleRemoveLanguage = (index) => {
    const updated = languages.filter((_, idx) => idx !== index);
    onChange({ ...resume, languages: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, languages: updated });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Languages & Fluency</h5>
          <small className="text-secondary">Communication proficiencies and multilingual abilities.</small>
        </div>
        <button
          type="button"
          onClick={handleAddLanguage}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Language</span>
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <LangIcon size={28} className="text-muted mb-2 mx-auto" />
          <p className="small mb-2">No languages added yet.</p>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Language
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {languages.map((lang, idx) => (
            <div key={lang.id || idx} className="col-12 col-md-6">
              <div
                className="p-3.5 rounded-4 bg-white border shadow-sm"
                style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="badge rounded-pill bg-light text-secondary border small font-monospace">
                    Language #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(idx)}
                    className="btn btn-sm btn-link text-danger p-0"
                    title="Remove Language"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="mb-2">
                  <label className="apple-label">Language *</label>
                  <input
                    type="text"
                    value={lang.language || ''}
                    onChange={e => handleChange(idx, 'language', e.target.value)}
                    placeholder="e.g. English, Spanish, German"
                    className="apple-input"
                  />
                </div>

                <div>
                  <label className="apple-label">Proficiency Level</label>
                  <select
                    value={lang.proficiency || 'Fluent / Professional'}
                    onChange={e => handleChange(idx, 'proficiency', e.target.value)}
                    className="apple-input form-select"
                    style={{ fontSize: '12px' }}
                  >
                    {PROFICIENCY_LEVELS.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
