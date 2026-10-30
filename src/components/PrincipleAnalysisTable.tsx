import React from 'react';
import { DeepLearningPrincipleAnalysis } from '../types/rpm';
import { Heart, Brain, Smile, Sparkles } from 'lucide-react';

interface PrincipleAnalysisTableProps {
  data: DeepLearningPrincipleAnalysis[];
  isEditable?: boolean;
  onEdit?: (index: number, updatedItem: DeepLearningPrincipleAnalysis) => void;
}

export const PrincipleAnalysisTable: React.FC<PrincipleAnalysisTableProps> = ({
  data,
}) => {
  const getBadgeStyle = (kategori: string) => {
    if (kategori.includes('Berkesadaran') || kategori.includes('Mindful')) {
      return {
        bg: 'bg-blue-50 text-blue-900 border-blue-200',
        icon: <Heart className="w-4 h-4 text-blue-600 inline mr-1.5 shrink-0" />,
        headerBg: 'bg-blue-900 text-white',
      };
    }
    if (kategori.includes('Bermakna') || kategori.includes('Meaningful')) {
      return {
        bg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
        icon: <Brain className="w-4 h-4 text-indigo-600 inline mr-1.5 shrink-0" />,
        headerBg: 'bg-indigo-900 text-white',
      };
    }
    return {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      icon: <Smile className="w-4 h-4 text-amber-600 inline mr-1.5 shrink-0" />,
      headerBg: 'bg-amber-800 text-white',
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Tabel Analisis Prinsip Pembelajaran Mendalam (Deep Learning RPM)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Integrasi 3 Prinsip: Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful) dalam Aktivitas Siswa.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-xs bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider w-1/4 border-r border-slate-700">
                Prinsip Deep Learning
              </th>
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider w-1/4 border-r border-slate-700">
                Tindakan Konkrit Siswa
              </th>
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider w-1/4 border-r border-slate-700">
                Aspek Bermakna / Cara Mencapainya
              </th>
              <th className="py-3 px-3.5 font-bold uppercase tracking-wider w-1/4">
                Dampak Emosional & Sisi Menggembirakan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((item, index) => {
              const style = getBadgeStyle(item.kategori);
              return (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  {/* Column 1: Kategori */}
                  <td className={`p-3.5 align-top font-bold border-r border-slate-200 ${style.bg}`}>
                    <div className="flex items-start gap-1.5">
                      {style.icon}
                      <div>
                        <div className="text-xs font-extrabold">{item.kategori}</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-normal italic">
                          {item.kategori.includes('Mindful')
                            ? 'Keheningan, Fokus & Regulasi Diri'
                            : item.kategori.includes('Meaningful')
                            ? 'Pemahaman Esensial & Konteks Riil'
                            : 'Motivasi Intrinsik & Kebersamaan'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Tindakan Konkrit Siswa */}
                  <td className="p-3.5 align-top border-r border-slate-200 text-slate-800 leading-relaxed">
                    <div className="font-semibold text-slate-900 mb-1">Aktivitas Siswa:</div>
                    {item.tindakanKonkritSiswa}
                  </td>

                  {/* Column 3: Aspek Bermakna / Cara Mencapainya */}
                  <td className="p-3.5 align-top border-r border-slate-200 text-slate-800 leading-relaxed bg-slate-50/40">
                    <div className="font-semibold text-slate-900 mb-1">Alasan Pedagogis:</div>
                    {item.aspekBermaknaCaraMencapai}
                  </td>

                  {/* Column 4: Dampak Emosional & Sisi Menggembirakan */}
                  <td className="p-3.5 align-top text-slate-800 leading-relaxed bg-amber-50/20">
                    <div className="font-semibold text-amber-950 mb-1">Dampak Afektif & Mental:</div>
                    {item.dampakEmosionalSisiMenggembirakan}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
