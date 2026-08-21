import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Opens native browser print dialog configured for high-res vector PDF generation.
 */
export function printResume() {
  window.print();
}

/**
 * Captures the resume DOM element into a downloadable PDF file with clickable links.
 * Clones the element into a clean, unscaled container to ensure 100% pixel-perfect high-DPI capture.
 *
 * @param {string} elementId - ID of the resume print sheet DOM node (e.g. 'resume-print-sheet')
 * @param {string} candidateName - Name of the candidate for filename
 */
export async function downloadDirectPdf(elementId = 'resume-print-sheet', candidateName = 'Resume') {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    printResume();
    return;
  }

  // Create an off-screen clone container at exact standard A4 width (794px)
  const cloneWrapper = document.createElement('div');
  cloneWrapper.style.position = 'fixed';
  cloneWrapper.style.top = '-9999px';
  cloneWrapper.style.left = '-9999px';
  cloneWrapper.style.width = '794px';
  cloneWrapper.style.zIndex = '-1000';
  cloneWrapper.style.backgroundColor = '#ffffff';

  const clonedElement = sourceElement.cloneNode(true);
  clonedElement.style.transform = 'none';
  clonedElement.style.margin = '0';
  clonedElement.style.boxShadow = 'none';
  clonedElement.style.width = '794px';
  clonedElement.style.minHeight = '1123px';

  cloneWrapper.appendChild(clonedElement);
  document.body.appendChild(cloneWrapper);

  try {
    // Collect all links in the cloned element to embed clickable annotations in jsPDF
    const linkElements = Array.from(clonedElement.querySelectorAll('a[href]'));
    const sourceRect = clonedElement.getBoundingClientRect();

    const linksData = linkElements.map(link => {
      const rect = link.getBoundingClientRect();
      return {
        url: link.href,
        x: rect.left - sourceRect.left,
        y: rect.top - sourceRect.top,
        width: rect.width,
        height: rect.height
      };
    });

    // High resolution canvas capture (scale 2.5 for 300 DPI crispness)
    const canvas = await html2canvas(clonedElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Standard A4 dimensions in mm
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const imgWidth = a4WidthMm;
    const imgHeight = (canvas.height * a4WidthMm) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const scaleFactorMm = a4WidthMm / canvas.width;

    // Handle single page vs multi-page
    let heightLeft = imgHeight;
    let position = 0;
    const pageHeightCanvas = (canvas.width * a4HeightMm) / a4WidthMm;

    // Add first page
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

    // Embed clickable link annotations for page 1
    linksData.forEach(l => {
      const linkX = (l.x * 2.5) * scaleFactorMm;
      const linkY = ((l.y * 2.5) + position) * scaleFactorMm;
      const linkW = (l.width * 2.5) * scaleFactorMm;
      const linkH = (l.height * 2.5) * scaleFactorMm;
      if (linkY >= 0 && linkY <= a4HeightMm) {
        pdf.link(linkX, linkY, linkW, linkH, { url: l.url });
      }
    });

    heightLeft -= a4HeightMm;

    // Additional pages if needed
    while (heightLeft > 5) {
      position = position - a4HeightMm;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

      // Embed link annotations for current page
      linksData.forEach(l => {
        const linkX = (l.x * 2.5) * scaleFactorMm;
        const linkY = ((l.y * 2.5) * scaleFactorMm) + position;
        const linkW = (l.width * 2.5) * scaleFactorMm;
        const linkH = (l.height * 2.5) * scaleFactorMm;
        if (linkY >= 0 && linkY <= a4HeightMm) {
          pdf.link(linkX, linkY, linkW, linkH, { url: l.url });
        }
      });

      heightLeft -= a4HeightMm;
    }

    const cleanName = (candidateName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
    pdf.save(`${cleanName}_MeraResume.pdf`);
  } catch (err) {
    console.error('Error generating direct PDF canvas, falling back to browser print:', err);
    printResume();
  } finally {
    // Clean up cloned DOM
    if (document.body.contains(cloneWrapper)) {
      document.body.removeChild(cloneWrapper);
    }
  }
}
