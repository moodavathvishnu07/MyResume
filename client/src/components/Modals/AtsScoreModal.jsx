import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Check
} from 'lucide-react';
import { calculateAtsScore } from '../../utils/atsScorer';

export function AtsScoreModal({ resume, isOpen, onClose }) {
  if (!isOpen) return null;

  const atsResult = calculateAtsScore(resume);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'suggestions'

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-end align-items-md-center justify-content-center p-0 p-md-3 animate-fadeIn"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 1100
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-top-5 rounded-md-4 border shadow-2xl overflow-hidden text-dark d-flex flex-column"
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90dvh',
          borderColor: '#cbd5e1',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
          animation: 'slideUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Handle Bar */}
        <div className="d-flex d-md-none justify-content-center pt-2.5 pb-1">
          <div className="rounded-pill bg-secondary bg-opacity-25" style={{ width: '36px', height: '4px' }} />
        </div>

        {/* Header */}
        <div className="px-3.5 px-md-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-white flex-shrink-0" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-2xs"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 100%)'
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <h6 className="fw-extrabold text-dark mb-0" style={{ fontSize: '1rem' }}>ATS Compliance Inspector</h6>
              <div className="text-secondary small" style={{ fontSize: '11px' }}>
                Algorithmic audit for Workday, Greenhouse & Lever
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light border rounded-circle p-1.5 text-dark hover-text-orange"
            style={{ borderColor: '#cbd5e1', width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-3.5 p-md-4 overflow-y-auto flex-grow-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Main Score Hero Card */}
          <div
            className="p-3.5 p-sm-4 rounded-4 text-white d-flex align-items-center justify-content-between mb-3.5 shadow-md position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff6b00 0%, #ff3b30 60%, #ea580c 100%)',
              boxShadow: '0 12px 30px -8px rgba(255, 107, 0, 0.45)'
            }}
          >
            <div>
              <div className="small text-uppercase tracking-wider fw-bold text-white-50 mb-1 font-monospace" style={{ fontSize: '10.5px' }}>
                Compatibility Score
              </div>
              <div className="h3 h2-md fw-extrabold mb-1 tracking-tight">
                {atsResult.grade}
              </div>
              <div className="badge rounded-pill bg-white bg-opacity-20 text-white border border-white border-opacity-30 fw-bold small" style={{ fontSize: '10.5px' }}>
                {atsResult.score >= 85 ? '✓ Fortune 500 Ready' : 'Optimization Recommended'}
              </div>
            </div>

            {/* Circular Ring Gauge */}
            <div className="position-relative d-flex align-items-center justify-content-center flex-shrink-0 ms-3" style={{ width: '82px', height: '82px' }}>
              <svg className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                <path
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  stroke="#ffffff"
                  strokeDasharray={`${atsResult.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="position-absolute fw-extrabold text-white fs-4 font-monospace">
                {atsResult.score}%
              </span>
            </div>
          </div>

          {/* Quick Tab Switcher */}
          <div className="d-flex align-items-center gap-1.5 p-1 bg-light rounded-pill border mb-3.5" style={{ borderColor: '#cbd5e1' }}>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`btn btn-sm w-50 rounded-pill py-1.5 fw-bold transition ${
                activeTab === 'overview'
                  ? 'btn-warning text-white shadow-2xs'
                  : 'btn-light border-0 text-dark'
              }`}
              style={{
                backgroundColor: activeTab === 'overview' ? '#ff6b00' : 'transparent',
                fontSize: '12px'
              }}
            >
              <FileCheck size={14} className="me-1" />
              <span>Section Audits</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('suggestions')}
              className={`btn btn-sm w-50 rounded-pill py-1.5 fw-bold transition ${
                activeTab === 'suggestions'
                  ? 'btn-warning text-white shadow-2xs'
                  : 'btn-light border-0 text-dark'
              }`}
              style={{
                backgroundColor: activeTab === 'suggestions' ? '#ff6b00' : 'transparent',
                fontSize: '12px'
              }}
            >
              <Sparkles size={14} className="me-1" />
              <span>AI Tips ({atsResult.suggestions.length})</span>
            </button>
          </div>

          {/* Tab 1: Section Breakdown Audits */}
          {activeTab === 'overview' && (
            <div className="d-flex flex-column gap-2">
              {atsResult.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-3 bg-white border d-flex align-items-center justify-content-between shadow-2xs transition"
                  style={{ borderColor: '#cbd5e1' }}
                >
                  <div className="d-flex align-items-center gap-2.5">
                    {item.status === 'pass' ? (
                      <div className="rounded-circle bg-success bg-opacity-15 p-1 text-success d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                        <Check size={15} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="rounded-circle bg-warning bg-opacity-15 p-1 text-warning d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                        <AlertTriangle size={15} strokeWidth={2.5} />
                      </div>
                    )}
                    <div>
                      <div className="small fw-bold text-dark">{item.category}</div>
                      <div className="text-secondary" style={{ fontSize: '11px' }}>
                        {item.status === 'pass' ? 'Meets ATS standards' : 'Action items detected'}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="small font-monospace fw-bold text-dark">
                      {item.score} / {item.max}
                    </span>
                    <span
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: item.status === 'pass' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: item.status === 'pass' ? '#047857' : '#b45309',
                        border: item.status === 'pass' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '10.5px'
                      }}
                    >
                      {item.status === 'pass' ? 'Strong' : 'Optimize'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Actionable Recommendations */}
          {activeTab === 'suggestions' && (
            <div className="d-flex flex-column gap-2">
              {atsResult.suggestions.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-4 border p-4" style={{ borderColor: '#cbd5e1' }}>
                  <CheckCircle2 size={36} className="text-success mx-auto mb-2" />
                  <h6 className="fw-bold text-dark mb-1">Zero ATS Blockers Found!</h6>
                  <p className="text-secondary small mb-0">
                    Your resume meets top tier ATS compliance benchmarks. You are ready to export and apply!
                  </p>
                </div>
              ) : (
                atsResult.suggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-3 d-flex align-items-start gap-2.5"
                    style={{
                      backgroundColor: 'rgba(255, 107, 0, 0.07)',
                      border: '1.5px solid rgba(255, 107, 0, 0.22)',
                      color: '#9a3412'
                    }}
                  >
                    <Sparkles size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#ff6b00' }} />
                    <div className="small fw-semibold" style={{ fontSize: '12.5px', lineHeight: 1.5 }}>
                      {sug}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3.5 px-md-4 py-3 border-top bg-light d-flex align-items-center justify-content-between flex-shrink-0" style={{ borderColor: '#e2e8f0' }}>
          <span className="small text-secondary fw-semibold font-monospace" style={{ fontSize: '11px' }}>
            ATS Engine v2.6 • Live
          </span>
          <button
            onClick={onClose}
            className="btn btn-orange-primary btn-sm px-3.5 py-2 shadow-sm fw-bold"
            style={{ minHeight: '38px' }}
          >
            <span>Continue Editing</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
