import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Palette, Bold, Italic, Underline } from 'lucide-react';

const QUICK_COLORS = [
  { hex: '#0f172a', label: 'Dark Slate' },
  { hex: '#ff6b00', label: 'Sunset Orange' },
  { hex: '#0071e3', label: 'Apple Blue' },
  { hex: '#1e3a8a', label: 'Deep Navy' },
  { hex: '#047857', label: 'Emerald Green' },
  { hex: '#e11d48', label: 'Rose Red' },
  { hex: '#7c3aed', label: 'Violet Purple' },
  { hex: '#d97706', label: 'Golden Amber' }
];

/**
 * High-performance inline editable text component with rock-solid caret preservation
 */
export function EditableText({
  value = '',
  onChange,
  as: Component = 'span',
  placeholder = 'Click to edit...',
  className = '',
  style = {},
  multiline = false
}) {
  const elementRef = useRef(null);
  const isFocusedRef = useRef(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  // Initialize and synchronize text content via direct DOM manipulation to prevent cursor jump
  useLayoutEffect(() => {
    if (elementRef.current) {
      // Only sync from props if the user is NOT actively typing in this element
      const isCurrentlyActive = document.activeElement === elementRef.current;
      if (!isCurrentlyActive) {
        if (elementRef.current.innerText !== (value || '')) {
          elementRef.current.innerText = value || '';
        }
      }
    }
  }, [value]);

  const handleFocus = () => {
    isFocusedRef.current = true;
    updateToolbarPosition();
    setShowToolbar(true);
  };

  const updateToolbarPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setToolbarPos({
        top: Math.max(10, rect.top - 42),
        left: Math.max(10, rect.left)
      });
    }
  };

  const handleInput = (e) => {
    if (onChange) {
      const currentText = e.currentTarget.innerText;
      onChange(currentText);
    }
    updateToolbarPosition();
  };

  const handleBlur = (e) => {
    isFocusedRef.current = false;
    // Delay hiding toolbar so user can click color swatches
    setTimeout(() => {
      if (!isFocusedRef.current) {
        setShowToolbar(false);
      }
    }, 250);

    if (onChange) {
      const finalVal = e.currentTarget.innerText.trim();
      onChange(finalVal);
    }
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const applyColor = (colorHex) => {
    if (elementRef.current) {
      elementRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        document.execCommand('foreColor', false, colorHex);
      } else {
        elementRef.current.style.color = colorHex;
      }
      if (onChange) {
        onChange(elementRef.current.innerText);
      }
    }
  };

  const applyFormat = (command) => {
    if (elementRef.current) {
      elementRef.current.focus();
      document.execCommand(command, false, null);
      if (onChange) {
        onChange(elementRef.current.innerText);
      }
    }
  };

  return (
    <>
      <Component
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={handleFocus}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`inline-editable-text ${className}`}
        style={{
          outline: 'none',
          cursor: 'text',
          minWidth: '20px',
          display: Component === 'span' ? 'inline-block' : undefined,
          ...style
        }}
        data-placeholder={placeholder}
        title="Click to edit text & customize line color"
      />

      {/* Floating Line Color & Formatting Bar */}
      {showToolbar && (
        <div
          className="position-fixed bg-white rounded-pill shadow-lg border p-1 d-flex align-items-center gap-1.5 z-3 animate-fadeIn"
          style={{
            top: `${toolbarPos.top}px`,
            left: `${toolbarPos.left}px`,
            borderColor: 'rgba(15, 23, 42, 0.15)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-100%)',
            marginTop: '-4px'
          }}
          onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking toolbar
        >
          {/* Quick Color Swatches */}
          <div className="d-flex align-items-center gap-1 px-1">
            {QUICK_COLORS.map(c => (
              <button
                key={c.hex}
                type="button"
                onClick={() => applyColor(c.hex)}
                style={{
                  backgroundColor: c.hex,
                  width: '16px',
                  height: '16px'
                }}
                className="rounded-circle border-0 cursor-pointer shadow-2xs hover-scale"
                title={`Text Color: ${c.label}`}
              />
            ))}

            {/* Custom Color Input */}
            <label
              className="d-flex align-items-center justify-content-center rounded-circle border cursor-pointer m-0 p-0"
              style={{ width: '16px', height: '16px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}
              title="Custom Text Color"
            >
              <input
                type="color"
                onChange={(e) => applyColor(e.target.value)}
                style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </label>
          </div>

          <div className="vr my-auto" style={{ height: '14px' }} />

          {/* Quick Formats */}
          <div className="d-flex align-items-center gap-0.5 pe-1">
            <button
              type="button"
              onClick={() => applyFormat('bold')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange"
              style={{ width: '20px', height: '20px' }}
              title="Bold"
            >
              <Bold size={11} />
            </button>
            <button
              type="button"
              onClick={() => applyFormat('italic')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange"
              style={{ width: '20px', height: '20px' }}
              title="Italic"
            >
              <Italic size={11} />
            </button>
            <button
              type="button"
              onClick={() => applyFormat('underline')}
              className="btn btn-sm btn-link p-0 text-dark hover-text-orange"
              style={{ width: '20px', height: '20px' }}
              title="Underline"
            >
              <Underline size={11} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
