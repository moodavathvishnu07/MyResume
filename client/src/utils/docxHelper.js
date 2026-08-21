import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ExternalHyperlink,
  AlignmentType,
  BorderStyle
} from 'docx';
import { saveAs } from 'file-saver';
import { sanitizeUrl } from '../components/Preview/templates/ResumeLink';

/**
 * Generates a high-quality, ATS-friendly Word DOCX resume with live clickable hyperlinks
 */
export async function exportResumeToDocx(resume) {
  const p = resume.personalInfo || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const children = [];

  // Helper for section headings
  const createSectionHeader = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: 'ff6b00',
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 24,
          color: 'ff6b00',
          font: 'Calibri'
        })
      ]
    });
  };

  // 1. Header: Full Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: p.fullName || 'Candidate Name',
          bold: true,
          size: 36,
          font: 'Calibri',
          color: '1a1a1a'
        })
      ]
    })
  );

  // Job Title
  if (p.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: p.jobTitle,
            size: 24,
            italics: true,
            color: '555555',
            font: 'Calibri'
          })
        ]
      })
    );
  }

  // Contact Info Row with Clickable Hyperlinks
  const contactRuns = [];
  if (p.location) {
    contactRuns.push(new TextRun({ text: p.location, size: 20, font: 'Calibri' }));
  }

  if (p.email) {
    if (contactRuns.length > 0) contactRuns.push(new TextRun({ text: '  •  ', size: 20, color: '888888' }));
    const cleanEmail = sanitizeUrl(`mailto:${p.email}`);
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: p.email,
            size: 20,
            color: 'ff6b00',
            underline: {},
            font: 'Calibri'
          })
        ],
        link: cleanEmail
      })
    );
  }

  if (p.phone) {
    if (contactRuns.length > 0) contactRuns.push(new TextRun({ text: '  •  ', size: 20, color: '888888' }));
    const cleanPhone = sanitizeUrl(`tel:${p.phone.replace(/[^0-9+]/g, '')}`);
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: p.phone,
            size: 20,
            color: 'ff6b00',
            underline: {},
            font: 'Calibri'
          })
        ],
        link: cleanPhone
      })
    );
  }

  if (p.linkedin) {
    if (contactRuns.length > 0) contactRuns.push(new TextRun({ text: '  •  ', size: 20, color: '888888' }));
    const cleanLinkedin = sanitizeUrl(p.linkedin);
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'LinkedIn',
            size: 20,
            color: 'ff6b00',
            underline: {},
            font: 'Calibri'
          })
        ],
        link: cleanLinkedin
      })
    );
  }

  if (p.github) {
    if (contactRuns.length > 0) contactRuns.push(new TextRun({ text: '  •  ', size: 20, color: '888888' }));
    const cleanGithub = sanitizeUrl(p.github);
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'GitHub',
            size: 20,
            color: 'ff6b00',
            underline: {},
            font: 'Calibri'
          })
        ],
        link: cleanGithub
      })
    );
  }

  if (p.website) {
    if (contactRuns.length > 0) contactRuns.push(new TextRun({ text: '  •  ', size: 20, color: '888888' }));
    const cleanWebsite = sanitizeUrl(p.website);
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'Portfolio',
            size: 20,
            color: 'ff6b00',
            underline: {},
            font: 'Calibri'
          })
        ],
        link: cleanWebsite
      })
    );
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 180 },
      children: contactRuns
    })
  );

  // 2. Summary
  if (p.summary) {
    children.push(createSectionHeader('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({
            text: p.summary,
            size: 21,
            font: 'Calibri',
            color: '333333'
          })
        ]
      })
    );
  }

  // 3. Work Experience
  if (exp.length > 0 && exp.some(e => e.role || e.company)) {
    children.push(createSectionHeader('Work Experience'));
    exp.forEach(item => {
      if (!item.role && !item.company) return;
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: item.role || 'Role',
              bold: true,
              size: 22,
              font: 'Calibri',
              color: '111111'
            }),
            new TextRun({
              text: item.company ? `  —  ${item.company}` : '',
              bold: true,
              size: 22,
              font: 'Calibri',
              color: 'ff6b00'
            }),
            new TextRun({
              text: `  (${item.startDate || ''} – ${item.endDate || (item.current ? 'Present' : '')}${item.location ? ` | ${item.location}` : ''})`,
              size: 19,
              italics: true,
              color: '666666',
              font: 'Calibri'
            })
          ]
        })
      );

      (item.bullets || []).forEach(bullet => {
        if (!bullet.trim()) return;
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 40 },
            children: [
              new TextRun({
                text: bullet,
                size: 20,
                font: 'Calibri',
                color: '333333'
              })
            ]
          })
        );
      });
    });
  }

  // 4. Skills
  if (skills.length > 0 && skills.some(s => s.items?.length > 0)) {
    children.push(createSectionHeader('Technical & Professional Skills'));
    skills.forEach(group => {
      if (!group.items || group.items.length === 0) return;
      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: `${group.category || 'Skills'}: `,
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '222222'
            }),
            new TextRun({
              text: group.items.join(', '),
              size: 21,
              font: 'Calibri',
              color: '444444'
            })
          ]
        })
      );
    });
  }

  // 5. Projects
  if (projects.length > 0 && projects.some(pr => pr.name)) {
    children.push(createSectionHeader('Key Projects'));
    projects.forEach(proj => {
      if (!proj.name) return;
      const projRuns = [
        new TextRun({
          text: proj.name,
          bold: true,
          size: 22,
          font: 'Calibri'
        })
      ];

      if (proj.techStack) {
        projRuns.push(
          new TextRun({
            text: `  [${proj.techStack}]`,
            italics: true,
            size: 19,
            color: '666666',
            font: 'Calibri'
          })
        );
      }

      if (proj.link) {
        projRuns.push(new TextRun({ text: '  —  ', size: 19, color: '888888' }));
        const cleanProjLink = sanitizeUrl(proj.link);
        projRuns.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: 'View Project Link',
                size: 19,
                color: 'ff6b00',
                underline: {},
                font: 'Calibri'
              })
            ],
            link: cleanProjLink
          })
        );
      }

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: projRuns
        })
      );

      (proj.bullets || []).forEach(b => {
        if (!b.trim()) return;
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 40 },
            children: [
              new TextRun({
                text: b,
                size: 20,
                font: 'Calibri',
                color: '333333'
              })
            ]
          })
        );
      });
    });
  }

  // 6. Education
  if (edu.length > 0 && edu.some(e => e.degree || e.school)) {
    children.push(createSectionHeader('Education'));
    edu.forEach(item => {
      if (!item.degree && !item.school) return;
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 30 },
          children: [
            new TextRun({
              text: item.degree || 'Degree',
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '111111'
            }),
            new TextRun({
              text: item.school ? `  —  ${item.school}` : '',
              bold: true,
              size: 21,
              font: 'Calibri',
              color: 'ff6b00'
            }),
            new TextRun({
              text: `  (${item.startDate || ''} – ${item.endDate || 'Present'}${item.score ? ` | GPA: ${item.score}` : ''})`,
              size: 19,
              italics: true,
              color: '666666',
              font: 'Calibri'
            })
          ]
        })
      );
    });
  }

  // 7. Certifications
  if (certs.length > 0 && certs.some(c => c.name)) {
    children.push(createSectionHeader('Certifications'));
    certs.forEach(c => {
      if (!c.name) return;
      const certRuns = [
        new TextRun({
          text: `•  ${c.name}`,
          bold: true,
          size: 20,
          font: 'Calibri'
        }),
        new TextRun({
          text: c.issuer ? ` — ${c.issuer}` : '',
          size: 20,
          font: 'Calibri',
          color: '555555'
        })
      ];

      if (c.link) {
        certRuns.push(new TextRun({ text: '  [', size: 19, color: '888888' }));
        const cleanCertLink = sanitizeUrl(c.link);
        certRuns.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: 'Verify Credential',
                size: 19,
                color: 'ff6b00',
                underline: {},
                font: 'Calibri'
              })
            ],
            link: cleanCertLink
          })
        );
        certRuns.push(new TextRun({ text: ']', size: 19, color: '888888' }));
      }

      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: certRuns
        })
      );
    });
  }

  // 8. Languages & Achievements
  if (achievements.length > 0 || languages.length > 0) {
    if (achievements.length > 0 && achievements.some(a => a.title)) {
      children.push(createSectionHeader('Honors & Achievements'));
      achievements.forEach(a => {
        if (!a.title) return;
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: `•  ${a.title}`,
                bold: true,
                size: 20,
                font: 'Calibri'
              }),
              new TextRun({
                text: a.issuer ? ` (${a.issuer}, ${a.date || ''}): ` : ': ',
                size: 19,
                font: 'Calibri',
                color: '666666'
              }),
              new TextRun({
                text: a.description || '',
                size: 19,
                font: 'Calibri',
                color: '444444'
              })
            ]
          })
        );
      });
    }

    if (languages.length > 0 && languages.some(l => l.language)) {
      children.push(createSectionHeader('Languages'));
      const langStr = languages.filter(l => l.language).map(l => `${l.language} (${l.proficiency})`).join('  •  ');
      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: langStr,
              size: 20,
              font: 'Calibri',
              color: '333333'
            })
          ]
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${(p.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.docx`;
  saveAs(blob, filename);
}
