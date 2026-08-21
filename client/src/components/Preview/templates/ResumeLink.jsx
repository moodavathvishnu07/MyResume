import React from 'react';

/**
 * Robust URL sanitizer for links (handles accidental spaces, missing protocols, prefixes)
 */
export function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  
  let cleaned = rawUrl.trim();
  
  // Remove leading prefixes like "LinkedIn:", "Github:", "Portfolio:", "Website:", "URL:"
  cleaned = cleaned.replace(/^(linkedin|github|portfolio|website|url|site)\s*:\s*/i, '');
  
  // Remove internal spaces around protocol slashes e.g. "https:// linkedin.com" -> "https://linkedin.com"
  cleaned = cleaned.replace(/^(https?:\/+\s*)/i, (match) => {
    return match.toLowerCase().startsWith('https') ? 'https://' : 'http://';
  });
  
  // Remove any remaining accidental spaces
  cleaned = cleaned.replace(/\s+/g, '');
  
  if (!cleaned) return '';

  if (cleaned.startsWith('mailto:') || cleaned.startsWith('tel:')) {
    return cleaned;
  }

  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }

  return cleaned;
}

/**
 * Clickable Link Helper Component for Resume Previews and Exports
 */
export function ResumeLink({ href, children, className = '', style = {}, title }) {
  if (!href || !href.trim()) return <span>{children}</span>;

  const targetUrl = sanitizeUrl(href);
  if (!targetUrl) return <span>{children}</span>;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`resume-clickable-link ${className}`}
      style={{
        color: 'inherit',
        textDecoration: 'none',
        wordBreak: 'break-word',
        cursor: 'pointer',
        ...style
      }}
      title={title || `Open ${targetUrl}`}
      onClick={(e) => {
        // Prevent accidental parent handlers while allowing normal link opening
        e.stopPropagation();
      }}
    >
      {children}
    </a>
  );
}
