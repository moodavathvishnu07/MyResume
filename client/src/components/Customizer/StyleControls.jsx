import React from 'react';
import { Check, Layout, Palette, Type, Sliders, Image as ImageIcon, Paintbrush } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    desc: 'Highest ATS score, single column, universally parsed',
    badge: '100% ATS'
  },
  {
    id: 'modern',
    name: 'Modern Tech',
    desc: 'Two-column with dark sidebar, photo, and tech pills',
    badge: 'Popular'
  },
  {
    id: 'executive',
    name: 'Executive',
    desc: 'Corporate elegance with double divider borders & serif accents',
    badge: 'Senior Roles'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    desc: 'Sleek whitespace, clean geometric typography',
    badge: 'Clean'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    desc: 'Gradient accent banner, photo highlight, project cards',
    badge: 'Visual'
  },
  {
    id: 'student',
    name: 'Student & Academic',
    desc: 'Education & project-centric layout for graduates and interns',
    badge: 'Freshers'
  }
];

const PRESET_COLORS = [
  { name: 'Vibrant Orange', hex: '#ff6b00' },
  { name: 'Sunset Coral', hex: '#ff4500' },
  { name: 'Navy ATS', hex: '#1e3a8a' },
  { name: 'Slate Executive', hex: '#1e293b' },
  { name: 'Emerald Forest', hex: '#047857' },
  { name: 'Cyan Tech', hex: '#0284c7' },
  { name: 'Purple Gradient', hex: '#7c3aed' },
  { name: 'Crimson Red', hex: '#e11d48' }
];

const TEXT_COLORS = [
  { name: 'Dark Slate (Default)', hex: '#0f172a' },
  { name: 'Charcoal Black', hex: '#1e293b' },
  { name: 'Deep Midnight Navy', hex: '#0a192f' },
  { name: 'Espresso Dark Brown', hex: '#292524' },
  { name: 'Pure Ink Black', hex: '#000000' }
];

const FONTS = [
  { name: 'Plus Jakarta Sans (Modern Display)', value: 'Plus Jakarta Sans' },
  { name: 'Inter (Clean Sans)', value: 'Inter' },
  { name: 'Outfit (Geometric Clean)', value: 'Outfit' },
  { name: 'Roboto (Standard)', value: 'Roboto' },
  { name: 'Merriweather (Corporate Serif)', value: 'Merriweather' },
  { name: 'Playfair Display (Executive Serif)', value: 'Playfair Display' },
  { name: 'JetBrains Mono (Tech Code)', value: 'JetBrains Mono' }
];

export function StyleControls({ settings, onSettingsChange }) {
  const handleChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-bottom pb-3 mb-3" style={{ borderColor: '#e2e8f0' }}>
        <h5 className="fw-bold text-dark mb-1">Template & Styling Studio</h5>
        <small className="text-secondary">
          Switch among 6+ ATS and modern layout templates, customize line text colors, accents, fonts, and photo options.
        </small>
      </div>

      {/* 1. Template Selector */}
      <div className="mb-4">
        <label className="apple-label d-flex align-items-center gap-1.5 mb-2.5">
          <Layout size={14} style={{ color: '#ff6b00' }} />
          Choose Resume Template (6 Available)
        </label>
        <div className="row g-2.5">
          {TEMPLATES.map(t => {
            const isSelected = settings.template === t.id;
            return (
              <div key={t.id} className="col-12 col-sm-6">
                <div
                  onClick={() => handleChange('template', t.id)}
                  className={`p-3 rounded-4 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-warning shadow-sm'
                      : 'bg-white border-light hover-shadow'
                  }`}
                  style={{
                    borderColor: isSelected ? '#ff6b00' : '#cbd5e1',
                    borderWidth: isSelected ? '2px' : '1.5px'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <strong className="text-dark" style={{ fontSize: '13px' }}>{t.name}</strong>
                    <span
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: isSelected ? 'rgba(255, 107, 0, 0.15)' : '#f1f5f9',
                        color: isSelected ? '#ff6b00' : '#475569',
                        fontSize: '9.5px'
                      }}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-secondary small mb-0" style={{ fontSize: '11px' }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Accent & Brand Color */}
      <div className="p-3.5 rounded-4 bg-white border shadow-sm mb-3" style={{ borderColor: '#cbd5e1' }}>
        <label className="apple-label d-flex align-items-center gap-1.5 mb-2">
          <Palette size={14} style={{ color: '#ff4500' }} />
          Primary Brand & Section Header Color
        </label>
        <div className="d-flex flex-wrap align-items-center gap-2">
          {PRESET_COLORS.map(c => {
            const isSelected = settings.primaryColor === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => handleChange('primaryColor', c.hex)}
                style={{ backgroundColor: c.hex, width: '30px', height: '30px' }}
                className="rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm transition"
                title={c.name}
              >
                {isSelected && <Check size={14} className="text-white drop-shadow" />}
              </button>
            );
          })}
          {/* Custom color input */}
          <div className="d-flex align-items-center gap-2 ms-2">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={e => handleChange('primaryColor', e.target.value)}
              className="rounded-3 cursor-pointer bg-transparent border-0"
              style={{ width: '30px', height: '30px' }}
              title="Custom Hex Picker"
            >
            </input>
            <span className="text-dark small font-monospace fw-bold">{settings.primaryColor}</span>
          </div>
        </div>
      </div>

      {/* 3. Typography Selector */}
      <div className="p-3.5 rounded-4 bg-white border shadow-sm mb-3" style={{ borderColor: '#cbd5e1' }}>
        <label className="apple-label d-flex align-items-center gap-1.5 mb-2">
          <Type size={14} style={{ color: '#ff6b00' }} />
          Font Family
        </label>
        <select
          value={settings.fontFamily}
          onChange={e => handleChange('fontFamily', e.target.value)}
          className="form-select apple-input"
        >
          {FONTS.map(f => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Sizing & Spacing */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <div className="p-3 rounded-4 bg-white border shadow-sm h-100" style={{ borderColor: '#cbd5e1' }}>
            <label className="apple-label d-flex align-items-center gap-1.5 mb-2">
              <Sliders size={14} style={{ color: '#f97316' }} />
              Font Size
            </label>
            <div className="btn-group w-100">
              {['small', 'medium', 'large'].map(sz => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleChange('fontSize', sz)}
                  className={`btn btn-sm text-capitalize ${
                    settings.fontSize === sz
                      ? 'btn-warning text-white fw-bold'
                      : 'btn-light border'
                  }`}
                  style={{
                    backgroundColor: settings.fontSize === sz ? '#ff6b00' : '#ffffff',
                    borderColor: settings.fontSize === sz ? '#ff6b00' : '#cbd5e1',
                    fontSize: '11px'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="p-3 rounded-4 bg-white border shadow-sm h-100" style={{ borderColor: '#cbd5e1' }}>
            <label className="apple-label d-flex align-items-center gap-1.5 mb-2">
              <Sliders size={14} style={{ color: '#ea580c' }} />
              Line Spacing
            </label>
            <div className="btn-group w-100">
              {['compact', 'normal', 'relaxed'].map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => handleChange('spacing', sp)}
                  className={`btn btn-sm text-capitalize ${
                    settings.spacing === sp
                      ? 'btn-warning text-white fw-bold'
                      : 'btn-light border'
                  }`}
                  style={{
                    backgroundColor: settings.spacing === sp ? '#ff6b00' : '#ffffff',
                    borderColor: settings.spacing === sp ? '#ff6b00' : '#cbd5e1',
                    fontSize: '11px'
                  }}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
