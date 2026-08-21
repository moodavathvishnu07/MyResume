import React, { useState, useEffect, useRef } from 'react';
import { AtsClassicTemplate } from './templates/AtsClassicTemplate';
import { ModernTechTemplate } from './templates/ModernTechTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { StudentTemplate } from './templates/StudentTemplate';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MousePointer,
  Maximize2,
  Sparkles,
  Sliders,
  Move,
  Bold,
  Italic,
  Underline,
  Palette,
  Hand
} from 'lucide-react';

const TEMPLATE_PILLS = [
  { id: 'ats-classic', label: 'ATS Classic' },
  { id: 'modern', label: 'Modern Tech' },
  { id: 'executive', label: 'Executive' },
  { id: 'minimalist', label: 'Minimal' },
  { id: 'creative', label: 'Creative' },
  { id: 'student', label: 'Student' }
];

const COLOR_SWATCHES = [
  '#ff6b00', '#0071e3', '#1e3a8a', '#047857', '#e11d48', '#1e293b'
];

const QUICK_TEXT_COLORS = [
  { hex: '#0f172a', label: 'Dark Slate' },
  { hex: '#ff6b00', label: 'Sunset Orange' },
  { hex: '#0071e3', label: 'Apple Blue' },
  { hex: '#1e3a8a', label: 'Deep Navy' },
  { hex: '#047857', label: 'Emerald Green' },
  { hex: '#e11d48', label: 'Rose Red' },
  { hex: '#7c3aed', label: 'Violet Purple' },
  { hex: '#f59e0b', label: 'Amber Gold' }
];

const ZOOM_PRESETS = [50, 75, 100, 125, 150, 200];

export function ResumePreview({ resume, setResume, settings, setSettings, previewRef }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [customZoomPercent, setCustomZoomPercent] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const [showZoomMenu, setShowZoomMenu] = useState(false);

  // Mouse Pan Dragging State
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  // Floating Selection Color Toolbar State
  const [selectionBubble, setSelectionBubble] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: ''
  });

  // ResizeObserver to calculate exact viewport width for pixel-perfect scale
  useEffect(() => {
    const checkViewport = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
        setIsMobile(width < 768);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Calculate base auto-fit scale
  const a4Width = 794; // Exact standard A4 width
  const a4Height = 1123; // Exact standard A4 height
  const horizontalPadding = isMobile ? 16 : 40;
  const fitScale = Math.min(1.15, Math.max(0.32, (containerWidth - horizontalPadding) / a4Width));
  // Custom zoom multiplier applies seamlessly across all device viewports
  const effectiveScale = fitScale * (customZoomPercent / 100);

  // Close Zoom Menu on outside click
  const zoomMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (zoomMenuRef.current && !zoomMenuRef.current.contains(e.target)) {
        setShowZoomMenu(false);
      }
    };
    if (showZoomMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showZoomMenu]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Zoom with Ctrl, Alt, Meta, or direct touchpad pinch
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 6 : -6;
        setCustomZoomPercent(prev => Math.min(220, Math.max(30, prev + delta)));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Mouse Drag Panning across the canvas
  const handleMouseDown = (e) => {
    // Only pan if clicking on the background container (not inside an editable input)
    if (e.target === containerRef.current || e.button === 1) {
      setIsPanning(true);
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        scrollLeft: containerRef.current.scrollLeft,
        scrollTop: containerRef.current.scrollTop
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning || !containerRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    containerRef.current.scrollLeft = panStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = panStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    if (isPanning) setIsPanning(false);
  };

  // Floating Color Toolbar near Selected Text Cursor
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setSelectionBubble(prev => prev.visible ? { ...prev, visible: false } : prev);
        return;
      }

      // Check if selected range is inside the printable resume sheet
      if (previewRef?.current && previewRef.current.contains(selection.anchorNode)) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setSelectionBubble({
              visible: true,
              x: rect.left + rect.width / 2,
              y: Math.max(10, rect.top - 10),
              text: selection.toString()
            });
          }
        } catch (err) {
          // Ignore range boundary checks
        }
      } else {
        setSelectionBubble(prev => prev.visible ? { ...prev, visible: false } : prev);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, [previewRef]);

  const applySelectedColor = (colorHex) => {
    document.execCommand('foreColor', false, colorHex);
  };

  const applySelectedFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const renderTemplate = () => {
    const props = {
      resume,
      settings,
      onResumeChange: setResume
    };

    switch (settings.template) {
      case 'ats-classic':
        return <AtsClassicTemplate {...props} />;
      case 'modern':
        return <ModernTechTemplate {...props} />;
      case 'executive':
        return <ExecutiveTemplate {...props} />;
      case 'minimalist':
        return <MinimalistTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'student':
        return <StudentTemplate {...props} />;
      default:
        return <ModernTechTemplate {...props} />;
    }
  };

  return (
    <div
      className="d-flex flex-column h-100 position-relative overflow-hidden user-select-auto"
      style={{ backgroundColor: '#f1f5f9' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Floating Control Bar */}
      <div
        className="d-flex flex-wrap align-items-center justify-content-between px-2.5 px-md-4 py-2 border-bottom z-2 flex-shrink-0 gap-1.5"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          borderColor: '#cbd5e1'
        }}
      >
        {/* Quick Template Switcher Pills */}
        <div className="d-flex align-items-center gap-1 overflow-x-auto no-scrollbar py-0.5" style={{ maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
          <span className="small text-dark fw-bold d-none d-xl-inline me-1" style={{ fontSize: '11px' }}>
            Template:
          </span>
          {TEMPLATE_PILLS.map(t => {
            const isSelected = settings.template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSettings && setSettings({ ...settings, template: t.id })}
                className={`btn btn-sm rounded-pill px-2.5 py-1 text-nowrap transition ${
                  isSelected
                    ? 'btn-warning text-white fw-bold shadow-2xs'
                    : 'btn-light text-dark border'
                }`}
                style={{
                  fontSize: '11.5px',
                  backgroundColor: isSelected ? '#ff6b00' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#1e293b',
                  borderColor: isSelected ? '#ff6b00' : '#cbd5e1',
                  minHeight: '30px'
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Right: Color Swatches + Interactive Mouse Zoom Controls */}
        <div className="d-flex align-items-center gap-1.5 ms-auto">
          {/* Quick Color Swatches (Desktop only) */}
          <div className="d-none d-lg-flex align-items-center gap-1 me-1">
            {COLOR_SWATCHES.map(hex => (
              <button
                key={hex}
                type="button"
                onClick={() => setSettings && setSettings({ ...settings, primaryColor: hex })}
                style={{
                  backgroundColor: hex,
                  width: '18px',
                  height: '18px',
                  outline: settings.primaryColor === hex ? '2px solid #0f172a' : 'none',
                  outlineOffset: '1px'
                }}
                className="rounded-circle border-0 shadow-2xs cursor-pointer transition"
                title={`Set template accent color: ${hex}`}
              />
            ))}
          </div>

          {/* Mouse Drag Zoom Slider (Desktop only) */}
          <div className="d-none d-xl-flex align-items-center gap-1.5 me-1">
            <input
              type="range"
              min="30"
              max="220"
              step="5"
              value={customZoomPercent}
              onChange={e => setCustomZoomPercent(Number(e.target.value))}
              className="form-range"
              style={{ width: '85px', accentColor: '#ff6b00', cursor: 'ew-resize' }}
              title={`Drag cursor horizontally to zoom: ${customZoomPercent}%`}
            />
          </div>

          {/* Precision Step Zoom Buttons & Dropdown */}
          <div ref={zoomMenuRef} className="position-relative">
            <div
              className="d-flex align-items-center gap-1 bg-white rounded-pill px-2 py-0.5 border shadow-sm user-select-none"
              style={{ borderColor: '#cbd5e1', minHeight: '30px' }}
            >
              <button
                type="button"
                onClick={() => setCustomZoomPercent(prev => Math.max(30, Math.round(prev - 10)))}
                className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
                style={{ width: '22px', height: '22px' }}
                title="Zoom Out (Ctrl + Scroll Down)"
              >
                <ZoomOut size={13} />
              </button>

              <span
                className="small text-dark font-monospace px-1.5 fw-bold cursor-pointer user-select-none hover-text-orange transition"
                style={{ fontSize: '11.5px', minWidth: '44px', textAlign: 'center' }}
                title="Click to choose scale preset"
                onClick={() => setShowZoomMenu(!showZoomMenu)}
              >
                {Math.round(customZoomPercent)}%
              </span>

              <button
                type="button"
                onClick={() => setCustomZoomPercent(prev => Math.min(220, Math.round(prev + 10)))}
                className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
                style={{ width: '22px', height: '22px' }}
                title="Zoom In (Ctrl + Scroll Up)"
              >
                <ZoomIn size={13} />
              </button>

              <div className="vr mx-0.5 my-auto" style={{ height: '14px', color: '#cbd5e1' }} />

              <button
                type="button"
                onClick={() => setCustomZoomPercent(100)}
                className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
                style={{ width: '22px', height: '22px' }}
                title="Reset to 100% (Fit)"
              >
                <RotateCcw size={12} />
              </button>
            </div>

            {/* Quick Zoom Presets Dropdown */}
            {showZoomMenu && (
              <div
                className="position-absolute end-0 mt-1.5 glass-dropdown-light rounded-3 p-1.5 z-3 shadow-lg animate-fadeIn"
                style={{ width: '135px', zIndex: 1060 }}
              >
                <div className="px-2 py-1 text-secondary text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '0.04em' }}>
                  Scale Presets
                </div>
                {ZOOM_PRESETS.map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setCustomZoomPercent(lvl);
                      setShowZoomMenu(false);
                    }}
                    className={`btn btn-sm w-100 text-start d-flex align-items-center justify-content-between p-1.5 rounded-2 border-0 mb-0.5 transition ${
                      customZoomPercent === lvl ? 'bg-orange-subtle text-orange-dark fw-bold' : 'btn-light text-dark'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    <span>{lvl}%</span>
                    {lvl === 100 && <span className="badge bg-secondary text-white" style={{ fontSize: '8px' }}>Fit</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onDoubleClick={(e) => {
          // Double click on empty background toggles between 100% Fit and 140% Zoom
          if (e.target === containerRef.current) {
            setCustomZoomPercent(prev => (prev === 100 ? 140 : 100));
          }
        }}
        className="flex-grow-1 overflow-auto p-2 p-md-4 d-flex justify-content-center align-items-start position-relative no-scrollbar pb-5 mb-5 pb-md-4 mb-md-0"
        style={{
          cursor: isPanning ? 'grabbing' : 'default',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: isPanning ? 'auto' : 'smooth'
        }}
      >
        {/* Floating Zoom Tip (Desktop only) */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-1 rounded-pill bg-white bg-opacity-95 border shadow-sm text-dark small d-none d-md-flex align-items-center gap-1.5 z-2"
          style={{ fontSize: '11px', pointerEvents: 'none', borderColor: '#cbd5e1' }}
        >
          <MousePointer size={12} style={{ color: '#ff6b00' }} />
          <span>Click line to edit • Select text for instant colors • <kbd className="bg-light text-dark px-1 border rounded">Ctrl</kbd> + Scroll to zoom</span>
        </div>

        {/* Scaled Wrapper Container with exact bounded dimensions */}
        <div
          style={{
            width: `${a4Width * effectiveScale}px`,
            height: `${a4Height * effectiveScale + 40}px`,
            position: 'relative',
            margin: '0 auto',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: `${a4Width}px`,
              minHeight: `${a4Height}px`,
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'top left',
              transition: isPanning ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {/* Printable Sheet */}
            <div
              id="resume-print-sheet"
              ref={previewRef}
              className="resume-sheet shadow-lg"
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Selection Color Toolbar Near Cursor */}
      {selectionBubble.visible && (
        <div
          className="position-fixed bg-white rounded-pill shadow-xl border p-1 d-flex align-items-center gap-1.5 animate-fadeIn"
          style={{
            top: `${selectionBubble.y}px`,
            left: `${selectionBubble.x}px`,
            transform: 'translate(-50%, -100%)',
            borderColor: '#cbd5e1',
            boxShadow: '0 14px 35px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.04)',
            zIndex: 1070
          }}
          onMouseDown={(e) => e.preventDefault()} // Prevents selection blur
        >
          {/* Quick Color Swatches */}
          <div className="d-flex align-items-center gap-1 px-1">
            {QUICK_TEXT_COLORS.map(c => (
              <button
                key={c.hex}
                type="button"
                onClick={() => applySelectedColor(c.hex)}
                style={{
                  backgroundColor: c.hex,
                  width: '18px',
                  height: '18px'
                }}
                className="rounded-circle border-0 cursor-pointer shadow-2xs transition hover-scale"
                title={`Set selected text color: ${c.label}`}
              />
            ))}

            {/* Custom Color Input */}
            <label
              className="d-flex align-items-center justify-content-center rounded-circle border cursor-pointer m-0 p-0"
              style={{ width: '18px', height: '18px', backgroundColor: '#f8fafc', overflow: 'hidden' }}
              title="Pick custom color"
            >
              <input
                type="color"
                onChange={(e) => applySelectedColor(e.target.value)}
                style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </label>
          </div>

          <div className="vr my-auto" style={{ height: '14px', color: '#cbd5e1' }} />

          {/* Quick Formatting */}
          <div className="d-flex align-items-center gap-0.5 pe-1">
            <button
              type="button"
              onClick={() => applySelectedFormat('bold')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
              style={{ width: '22px', height: '22px' }}
              title="Bold"
            >
              <Bold size={13} />
            </button>
            <button
              type="button"
              onClick={() => applySelectedFormat('italic')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
              style={{ width: '22px', height: '22px' }}
              title="Italic"
            >
              <Italic size={13} />
            </button>
            <button
              type="button"
              onClick={() => applySelectedFormat('underline')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange d-flex align-items-center justify-content-center"
              style={{ width: '22px', height: '22px' }}
              title="Underline"
            >
              <Underline size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
