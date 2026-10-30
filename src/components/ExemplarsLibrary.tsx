import React from 'react';
import { DokumenRPM } from '../types/rpm';
import { ALL_EXEMPLARS } from '../data/exemplars';
import { Award, BookOpen, Layers, ArrowRight, CheckCircle2, Heart, Brain, Smile } from 'lucide-react';

interface ExemplarsLibraryProps {
  onSelectDoc: (doc: DokumenRPM) => void;
  selectedDocId: string;
}

export const ExemplarsLibrary: React.FC<ExemplarsLibraryProps> = ({
  onSelectDoc,
  selectedDocId,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-amber-700" /> Koleksi Dokumen Teladan Resmi
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Pustaka Exemplar RPM Pembelajaran Mendalam
        </h2>
        <p className="text-sm text-slate-600">
          Koleksi Rencana Pembelajaran Mendalam (RPM) berstandar supervisi akademik Kemendikdasmen RI yang siap ditelaah, dimodifikasi, dan dicetak.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ALL_EXEMPLARS.map((doc) => {
          const isSelected = doc.id === selectedDocId;
          return (
            <div
              key={doc.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md bg-white'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {doc.metadata.jenjang} • {doc.metadata.kelas}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Dokumen Aktif
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                    {doc.metadata.materiPembelajaran}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 mt-1">
                    {doc.metadata.mataPelajaran} • {doc.metadata.alokasiWaktu}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {doc.capaianPembelajaran}
                </p>

                {/* Pedagogical Models badges */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="text-[11px] font-bold text-slate-500">Model Pedagogis:</div>
                  <div className="flex flex-wrap gap-1">
                    {doc.skenarioPertemuan.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-800 border border-indigo-200"
                      >
                        P{p.pertemuanKe}: {p.model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3 Principles summary mini pills */}
                <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-600 font-semibold">
                  <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    <Heart className="w-3 h-3" /> Mindful
                  </span>
                  <span className="flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    <Brain className="w-3 h-3" /> Meaningful
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    <Smile className="w-3 h-3" /> Joyful
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectDoc(doc)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{isSelected ? 'Buka Dokumen Aktif' : 'Pilih & Pelajari RPM Ini'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
