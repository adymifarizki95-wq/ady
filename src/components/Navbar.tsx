import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  Printer, 
  FileDown, 
  Copy, 
  Presentation, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { DokumenRPM } from '../types/rpm';
import { printDocument, exportToWord, copyRichTextToClipboard } from '../utils/exportUtils';

interface NavbarProps {
  activeTab: 'generator' | 'exemplars' | 'principles' | 'document';
  setActiveTab: (tab: 'generator' | 'exemplars' | 'principles' | 'document') => void;
  currentDoc: DokumenRPM;
  onOpenClassroomMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentDoc,
  onOpenClassroomMode,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const summary = `${currentDoc.metadata.judul}\n${currentDoc.metadata.satuanPendidikan}\nMata Pelajaran: ${currentDoc.metadata.mataPelajaran}\nMateri: ${currentDoc.metadata.materiPembelajaran}\n\nCapaian Pembelajaran:\n${currentDoc.capaianPembelajaran}\n\nTujuan Pembelajaran:\n${currentDoc.tujuanPembelajaran.join('\n')}`;
    await copyRichTextToClipboard('rpm-print-area', summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      {/* Top Banner: Kemendikdasmen RI Official Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-950 text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-400 text-blue-950 font-bold text-[10px]">
              ★
            </span>
            <span className="tracking-wide">
              KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH (KEMENDIKDASMEN) REPUBLIK INDONESIA
            </span>
            <span className="hidden sm:inline text-sky-300">|</span>
            <span className="hidden sm:inline text-sky-200 font-normal">
              Pedoman Rencana Pembelajaran Mendalam (RPM) Berkesadaran • Bermakna • Menggembirakan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-800/80 text-sky-200 px-2 py-0.5 rounded text-[11px] font-mono border border-blue-700/60">
              Model: Gemini 3.8 Flash
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('document')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Si-Deep
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Resmi Kemendikdasmen
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Generator & Desainer Dokumen Pembelajaran Mendalam (RPM)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('document')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'document'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Dokumen RPM</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Rancang RPM (AI)</span>
            </button>

            <button
              onClick={() => setActiveTab('exemplars')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'exemplars'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Pustaka</span>
              <span>Contoh RPM</span>
            </button>

            <button
              onClick={() => setActiveTab('principles')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'principles'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Prinsip</span>
              <span>Deep Learning</span>
            </button>
          </nav>

          {/* Action Tools: Print, Word, Class Mode */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={onOpenClassroomMode}
              title="Buka Mode Panduan Guru Mengajar di Kelas"
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Presentation className="w-4 h-4" />
              <span className="hidden lg:inline">Mode Guru Kelas</span>
            </button>

            <button
              onClick={handleCopy}
              title="Salin Dokumen Rapi untuk Google Docs / Word"
              className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => exportToWord(currentDoc, 'rpm-print-area')}
              title="Unduh Dokumen Format Microsoft Word (.doc)"
              className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              onClick={printDocument}
              title="Cetak Dokumen Resmi atau Simpan sebagai PDF"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
