import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Triggers standard browser print dialog configured for high-res PDF generation
 * This is universally recognized as the best method for 100% crisp vector fonts and functional clickable links.
 */
export function printResume() {
  window.print();
}

/**
 * Directly captures the resume DOM element into a downloadable PDF file
 */
export async function downloadDirectPdf(elementId, candidateName = 'Resume') {
  const element = document.getElementById(elementId);
  if (!element) {
    printResume();
    return;
  }

  try {
    // Temporarily ensure full scale capture
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const cleanName = candidateName.replace(/\s+/g, '_');
    pdf.save(`${cleanName}_Resume.pdf`);
  } catch (err) {
    console.error('Error generating direct PDF canvas, falling back to browser print:', err);
    printResume();
  }
}
