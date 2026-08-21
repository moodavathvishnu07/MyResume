import React from 'react';
import { Plus, Trash2, Trophy } from 'lucide-react';

export function AchievementsForm({ resume, onChange }) {
  const achievements = resume.achievements || [];

  const handleAddAchievement = () => {
    onChange({
      ...resume,
      achievements: [
        ...achievements,
        {
          id: `ach_${Date.now()}`,
          title: '',
          issuer: '',
          date: '',
          description: ''
        }
      ]
    });
  };

  const handleRemoveAchievement = (index) => {
    const updated = achievements.filter((_, idx) => idx !== index);
    onChange({ ...resume, achievements: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, achievements: updated });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Honors & Key Achievements</h5>
          <small className="text-secondary">Hackathons, leadership awards, publications, and patents.</small>
        </div>
        <button
          type="button"
          onClick={handleAddAchievement}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Award</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <Trophy size={28} className="text-muted mb-2 mx-auto" />
          <p className="small mb-2">No honors or achievements added yet.</p>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Award / Achievement
          </button>
        </div>
      ) : (
        achievements.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-3.5 rounded-4 bg-white border shadow-sm mb-3"
            style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="badge rounded-pill bg-light text-secondary border small font-monospace">
                Award #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveAchievement(idx)}
                className="btn btn-sm btn-link text-danger p-0"
                title="Remove Award"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="apple-label">Honor / Award Title *</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={e => handleChange(idx, 'title', e.target.value)}
                  placeholder="e.g. 1st Place — MIT Global Hackathon"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="apple-label">Issuing Body / Org *</label>
                <input
                  type="text"
                  value={item.issuer || ''}
                  onChange={e => handleChange(idx, 'issuer', e.target.value)}
                  placeholder="e.g. MIT / IEEE"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="apple-label">Year / Date</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={e => handleChange(idx, 'date', e.target.value)}
                  placeholder="e.g. 2023"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-8">
                <label className="apple-label">Brief Description</label>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={e => handleChange(idx, 'description', e.target.value)}
                  placeholder="e.g. Awarded $25,000 for building an AI-powered medical diagnostic assistant."
                  className="apple-input"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
