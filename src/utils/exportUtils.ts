import { DokumenRPM } from '../types/rpm';

export function printDocument() {
  window.print();
}

export function copyRichTextToClipboard(htmlElementId: string, plainSummary: string): Promise<boolean> {
  return new Promise((resolve) => {
    const el = document.getElementById(htmlElementId);
    if (!el) {
      navigator.clipboard.writeText(plainSummary);
      resolve(true);
      return;
    }

    try {
      // Try copying rich HTML so when pasted to MS Word or Google Docs, tables and formatting remain intact
      const blobHtml = new Blob([el.innerHTML], { type: 'text/html' });
      const blobText = new Blob([plainSummary], { type: 'text/plain' });
      const clipboardItem = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });

      navigator.clipboard.write([clipboardItem]).then(() => {
        resolve(true);
      }).catch(() => {
        // Fallback to plain text
        navigator.clipboard.writeText(plainSummary);
        resolve(true);
      });
    } catch {
      navigator.clipboard.writeText(plainSummary);
      resolve(true);
    }
  });
}

export function exportToWord(doc: DokumenRPM, htmlElementId: string) {
  const el = document.getElementById(htmlElementId);
  const content = el ? el.innerHTML : '';

  const header = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${doc.metadata.judul}</title>
    <style>
      body { font-family: 'Calibri', 'Times New Roman', sans-serif; font-size: 11pt; line-height: 1.35; color: #111; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th, td { border: 1px solid #444; padding: 6px 10px; font-size: 10pt; text-align: left; vertical-align: top; }
      th { background-color: #f2f2f2; font-weight: bold; }
      h1 { font-size: 16pt; text-align: center; margin-bottom: 4px; text-transform: uppercase; }
      h2 { font-size: 13pt; margin-top: 18px; margin-bottom: 6px; border-bottom: 1.5px solid #333; padding-bottom: 3px; }
      h3 { font-size: 11pt; margin-top: 12px; margin-bottom: 4px; color: #1e3a8a; }
      .arabic { font-family: 'Amiri', 'Traditional Arabic', serif; font-size: 16pt; direction: rtl; text-align: right; line-height: 2; }
      .text-center { text-align: center; }
      .meta-table td { border: none; padding: 3px 6px; }
    </style>
  </head>
  <body>
    ${content}
  </body>
  </html>`;

  const blob = new Blob(['\ufeff', header], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const filename = `RPM_${doc.metadata.mataPelajaran.replace(/\s+/g, '_')}_${doc.metadata.kelas.replace(/\s+/g, '_')}_${doc.metadata.materiPembelajaran.substring(0, 20).replace(/\s+/g, '_')}.doc`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
