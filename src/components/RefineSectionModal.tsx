import React, { useState } from 'react';
import { X, Wand2, Sparkles, AlertCircle, Check } from 'lucide-react';
import { DokumenRPM } from '../types/rpm';

interface RefineSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  currentContent: any;
  document: DokumenRPM;
  onApplyRefinedContent: (sectionName: string, refinedData: any) => void;
}

export const RefineSectionModal: React.FC<RefineSectionModalProps> = ({
  isOpen,
  onClose,
  sectionName,
  currentContent,
  document: doc,
  onApplyRefinedContent,
}) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefine = async () => {
    if (!feedback.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/refine-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionName,
          currentContent,
          userFeedback: feedback,
          documentContext: {
            metadata: doc.metadata,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memproses perbaikan.');
      }

      onApplyRefinedContent(sectionName, data.result);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Optimalkan Bagian: {sectionName}
              </h3>
              <p className="text-xs text-slate-500">
                Instruksikan AI Gemini 3.8 Flash untuk memperdalam konten ini.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Instruksi / Masukan Spesifik Anda:
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="Contoh: Perjelas instruksi guru pada fase pembuktian, tambahkan keterkaitan dengan kearifan lokal pertanian Indonesia, atau buat pertanyaan pemantik lebih filosofis..."
            className="w-full text-xs rounded-xl border-slate-300 shadow-2xs focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500">Saran Cepat:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() =>
                setFeedback('Perdalam aspek Berkesadaran (Mindful) dengan latihan hening bernapas yang lebih spesifik.')
              }
              className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              + Perkuat Mindful
            </button>
            <button
              type="button"
              onClick={() =>
                setFeedback('Hubungkan sintaks dengan masalah nyata kearifan lokal di Indonesia agar lebih Bermakna.')
              }
              className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              + Konteks Nyata
            </button>
            <button
              type="button"
              onClick={() =>
                setFeedback('Tambahkan gamifikasi dan ice breaking ceria yang Menggembirakan (Joyful).')
              }
              className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              + Buat Lebih Joyful
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isLoading || !feedback.trim()}
            onClick={handleRefine}
            className={`px-4 py-2 text-xs font-bold rounded-lg text-white shadow-xs flex items-center gap-1.5 ${
              isLoading || !feedback.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Terapkan Perbaikan AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
