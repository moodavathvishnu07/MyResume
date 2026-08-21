import React from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { sanitizeUrl } from '../Preview/templates/ResumeLink';

export function CertificationsForm({ resume, onChange }) {
  const certifications = resume.certifications || [];

  const handleAddCert = () => {
    onChange({
      ...resume,
      certifications: [
        ...certifications,
        {
          id: `cert_${Date.now()}`,
          name: '',
          issuer: '',
          date: '',
          link: ''
        }
      ]
    });
  };

  const handleRemoveCert = (index) => {
    const updated = certifications.filter((_, idx) => idx !== index);
    onChange({ ...resume, certifications: updated });
  };

  const handleCertChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...resume, certifications: updated });
  };

  return (
    <div className="space-y-4">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
        <div>
          <h5 className="fw-bold text-dark mb-1">Certifications & Licenses</h5>
          <small className="text-secondary">Industry recognized credentials and verification URLs.</small>
        </div>
        <button
          type="button"
          onClick={handleAddCert}
          className="btn btn-orange-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-4 rounded-4 bg-light text-center border border-dashed text-secondary">
          <p className="small mb-2">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddCert}
            className="btn btn-outline-secondary btn-sm"
          >
            + Add First Certification
          </button>
        </div>
      ) : (
        certifications.map((cert, cIdx) => (
          <div
            key={cert.id || cIdx}
            className="p-3.5 rounded-4 bg-white border shadow-sm mb-3"
            style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="badge rounded-pill bg-light text-secondary border small font-monospace">
                Certification #{cIdx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveCert(cIdx)}
                className="btn btn-sm btn-link text-danger p-0"
                title="Remove Certification"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="apple-label">Certificate Name *</label>
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={e => handleCertChange(cIdx, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect - Professional"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="apple-label">Issuing Organization *</label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={e => handleCertChange(cIdx, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="apple-label">Issue Date / Valid Through</label>
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={e => handleCertChange(cIdx, 'date', e.target.value)}
                  placeholder="e.g. 2024"
                  className="apple-input"
                />
              </div>

              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="apple-label mb-1">Verification Link</label>
                  {cert.link && sanitizeUrl(cert.link) && (
                    <a
                      href={sanitizeUrl(cert.link)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none small d-flex align-items-center gap-1 mb-1"
                      style={{ color: '#ff6b00', fontSize: '11px' }}
                      title="Test Credential Verification Link"
                    >
                      <ExternalLink size={11} />
                      <span>Test ↗</span>
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={cert.link || ''}
                  onChange={e => handleCertChange(cIdx, 'link', e.target.value)}
                  placeholder="e.g. https://credly.com/badges/..."
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
