import React, { useState } from 'react';
import { DokumenRPM } from '../types/rpm';
import { 
  BookOpen, 
  Sparkles, 
  Printer, 
  FileDown, 
  Share2, 
  Check, 
  HelpCircle, 
  Heart, 
  Brain, 
  Smile, 
  Laptop, 
  ShieldCheck, 
  PenSquare,
  Wand2
} from 'lucide-react';
import { PrincipleAnalysisTable } from './PrincipleAnalysisTable';
import { printDocument, exportToWord, copyRichTextToClipboard } from '../utils/exportUtils';

interface RpmDocumentViewerProps {
  document: DokumenRPM;
  onOpenRefineModal: (sectionName: string, content: any) => void;
  onOpenClassroomMode: () => void;
}

export const RpmDocumentViewer: React.FC<RpmDocumentViewerProps> = ({
  document: doc,
  onOpenRefineModal,
  onOpenClassroomMode,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'timeline' | 'principles' | 'assessment'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const summary = `${doc.metadata.judul}\n${doc.metadata.satuanPendidikan}\nMata Pelajaran: ${doc.metadata.mataPelajaran}\nMateri: ${doc.metadata.materiPembelajaran}\n\nCapaian Pembelajaran:\n${doc.capaianPembelajaran}\n\nTujuan Pembelajaran:\n${doc.tujuanPembelajaran.join('\n')}`;
    await copyRichTextToClipboard('rpm-print-area', summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Action Sub-Bar */}
      <div className="no-print bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Dokumen Lengkap (A4 Resmi)
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'timeline'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Alur Langkah Pertemuan
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'principles'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tabel 3 Prinsip Deep Learning
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'assessment'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Asesmen & Diferensiasi
          </button>
        </div>

        {/* Quick export shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenClassroomMode}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Panduan Mengajar Guru</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Salin Dokumen"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => exportToWord(doc, 'rpm-print-area')}
            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Unduh MS Word (.doc)"
          >
            <FileDown className="w-4 h-4" />
          </button>

          <button
            onClick={printDocument}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Document Body (Print Ready Container) */}
      <div 
        id="rpm-print-area" 
        className="document-paper bg-white border border-slate-300 rounded-2xl shadow-md p-6 sm:p-12 font-sans text-slate-900 space-y-8"
      >
        {/* Kop Resmi Kementerian & Satuan Pendidikan */}
        <div className="text-center pb-6 border-b-4 border-double border-slate-900 space-y-1">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-600">
            KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH REPUBLIK INDONESIA
          </div>
          <div className="text-base sm:text-lg font-black uppercase tracking-wide text-slate-900">
            {doc.metadata.satuanPendidikan || 'SEKOLAH PENGGERAK BERKARAKTER BANGSA'}
          </div>
          <div className="text-xs text-slate-500 italic">
            Kurikulum Nasional Kemendikdasmen • Pembelajaran Mendalam (Deep Learning) Berkesadaran, Bermakna, & Menggembirakan
          </div>
        </div>

        {/* Judul Dokumen */}
        <div className="text-center space-y-1 py-2">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
            RENCANA PEMBELAJARAN MENDALAM (RPM)
          </h1>
          <p className="text-sm font-semibold text-blue-900">
            Materi: {doc.metadata.materiPembelajaran}
          </p>
        </div>

        {/* Tabel Identitas Dokumen */}
        <div className="overflow-x-auto border border-slate-300 rounded-lg">
          <table className="w-full text-xs text-left border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-50 w-1/4 border-r border-slate-200">Satuan Pendidikan</td>
                <td className="p-2.5 w-1/4 border-r border-slate-200">{doc.metadata.satuanPendidikan}</td>
                <td className="p-2.5 font-bold bg-slate-50 w-1/4 border-r border-slate-200">Jenjang / Kelas</td>
                <td className="p-2.5 w-1/4">{doc.metadata.jenjang} / {doc.metadata.kelas}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">Mata Pelajaran</td>
                <td className="p-2.5 border-r border-slate-200 font-semibold text-blue-900">{doc.metadata.mataPelajaran}</td>
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">Semester</td>
                <td className="p-2.5">{doc.metadata.semester}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">Alokasi Waktu</td>
                <td className="p-2.5 border-r border-slate-200">{doc.metadata.alokasiWaktu} ({doc.metadata.jumlahPertemuan} Pertemuan)</td>
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">Tahun Ajaran</td>
                <td className="p-2.5">{doc.metadata.tahunAjaran || '2026/2027'}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">Guru Pengampu</td>
                <td className="p-2.5 border-r border-slate-200 font-medium">{doc.metadata.namaPenyusun}</td>
                <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">NIP Guru</td>
                <td className="p-2.5">{doc.metadata.nipPenyusun || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 1. Capaian & Tujuan Pembelajaran */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-1">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              I. Capaian & Tujuan Pembelajaran Mendalam
            </h2>
            <button
              onClick={() => onOpenRefineModal('Capaian & Tujuan Pembelajaran', { cp: doc.capaianPembelajaran, tp: doc.tujuanPembelajaran })}
              className="no-print text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Capaian Pembelajaran (CP):</span>
              <p className="text-slate-700 leading-relaxed">{doc.capaianPembelajaran}</p>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1.5">Tujuan Pembelajaran (TP):</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                {doc.tujuanPembelajaran.map((tp, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">{tp}</li>
                ))}
              </ul>
            </div>

            {/* Essential Questions & Enduring Understandings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs">
                <span className="font-bold text-blue-950 block mb-1">Pertanyaan Pemantik (Essential Questions):</span>
                <ul className="space-y-1 list-decimal list-inside text-slate-700">
                  {doc.pertanyaanPemantik.map((q, idx) => (
                    <li key={idx} className="leading-relaxed">{q}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs">
                <span className="font-bold text-indigo-950 block mb-1">Pemahaman Bermakna (Enduring Understandings):</span>
                <ul className="space-y-1 list-disc list-inside text-slate-700">
                  {doc.pemahamanBermakna.map((u, idx) => (
                    <li key={idx} className="leading-relaxed">{u}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Dimensi Profil Lulusan */}
        <section className="space-y-3">
          <div className="border-b-2 border-slate-800 pb-1">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              II. Dimensi Profil Lulusan yang Ditumbuhkan
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {doc.dimensiProfilLulusan.map((dimensi, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200"
              >
                ✓ {dimensi}
              </span>
            ))}
          </div>
        </section>

        {/* 3. Pemanfaatan Teknologi Digital Interaktif */}
        <section className="space-y-3">
          <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-700" />
              III. Pemanfaatan Teknologi Digital & Alasan Pedagogis
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                  <th className="p-2.5 w-1/4 border-r border-slate-200">Media Digital Interaktif</th>
                  <th className="p-2.5 w-1/3 border-r border-slate-200">Kegunaan & Aktivitas di Kelas</th>
                  <th className="p-2.5">Alasan Pedagogis (Penguatan Deep Learning)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {doc.pemanfaatanTeknologiDigital.map((tool, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="p-2.5 font-bold text-blue-900 border-r border-slate-200 align-top">
                      {tool.namaMedia}
                    </td>
                    <td className="p-2.5 text-slate-700 border-r border-slate-200 align-top">
                      {tool.kegunaanDiKelas}
                    </td>
                    <td className="p-2.5 text-slate-700 align-top">
                      {tool.alasanPedagogis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Integrasi Al-Qur'an (Jika YA) */}
        {doc.integrasiQuran && doc.integrasiQuran.adaIntegrasi && (
          <section className="space-y-3">
            <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-purple-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-700" />
                IV. Integrasi Nilai Spiritual & Sains Al-Qur'an
              </h2>
              <span className="text-[11px] font-bold text-purple-700">
                {doc.integrasiQuran.namaSuratDanAyat}
              </span>
            </div>

            <div className="p-5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-4">
              {/* Teks Arab */}
              <div className="text-right py-2 px-4 bg-white/80 rounded-lg border border-purple-100 shadow-2xs">
                <p className="font-arabic text-xl sm:text-2xl text-slate-900 tracking-wide">
                  {doc.integrasiQuran.teksArab}
                </p>
                <div className="text-[11px] text-purple-800 font-bold mt-1">
                  ({doc.integrasiQuran.namaSuratDanAyat})
                </div>
              </div>

              {/* Terjemahan Kemenag RI */}
              <div className="text-xs sm:text-sm text-slate-700 italic border-l-4 border-purple-600 pl-3">
                <span className="font-bold text-slate-900 not-italic block mb-0.5">
                  Terjemahan Resmi Kementerian Agama RI:
                </span>
                "{doc.integrasiQuran.terjemahanKemenag}"
              </div>

              {/* Analisis Relevansi & Makna Filosofis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white/80 p-3 rounded-lg border border-purple-100 space-y-1">
                  <span className="font-bold text-purple-950 block">Analisis Relevansi Sains/Moral:</span>
                  <p className="text-slate-700 leading-relaxed">{doc.integrasiQuran.analisisRelevansi}</p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-purple-100 space-y-1">
                  <span className="font-bold text-purple-950 block">Pesan Pedagogis & Karakter Siswa:</span>
                  <p className="text-slate-700 leading-relaxed">{doc.integrasiQuran.pesanPedagogis}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Skenario Skenario Pembelajaran per Pertemuan */}
        <section className="space-y-6">
          <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              V. Skenario Pembelajaran Praktik Pedagogis per Pertemuan
            </h2>
            <button
              onClick={() => onOpenRefineModal('Skenario Langkah Pembelajaran', doc.skenarioPertemuan)}
              className="no-print text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki Langkah
            </button>
          </div>

          <div className="space-y-8">
            {doc.skenarioPertemuan.map((pertemuan) => (
              <div
                key={pertemuan.pertemuanKe}
                className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs space-y-4 p-5"
              >
                {/* Meeting Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-900 text-white uppercase tracking-wider mr-2">
                      Pertemuan {pertemuan.pertemuanKe}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {pertemuan.topikFokus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
                      Model: {pertemuan.model}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      ({pertemuan.alokasiWaktu})
                    </span>
                  </div>
                </div>

                {/* Sub-A: Memahami (Apersepsi & Pendahuluan) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200">
                    <span className="text-xs font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-blue-700" />
                      A. Memahami (Apersepsi & Pendahuluan)
                    </span>
                    <span className="text-xs font-bold text-blue-800">{pertemuan.memahami.durasiMenit} Menit</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-blue-900 block mb-1">Berkesadaran (Mindful):</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.memahami.kegiatanMindful}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-indigo-900 block mb-1">Bermakna (Meaningful):</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.memahami.pemantikMakna}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-amber-900 block mb-1">Menggembirakan (Joyful):</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.memahami.kegiatanJoyful}</p>
                    </div>
                  </div>
                </div>

                {/* Sub-B: Mengaplikasi (Kegiatan Inti Berdasarkan Sintaks Model) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-indigo-50/80 px-3 py-1.5 rounded-lg border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-700" />
                      B. Mengaplikasi (Kegiatan Inti - Sintaks {pertemuan.mengaplikasi.model})
                    </span>
                    <span className="text-xs font-bold text-indigo-800">{pertemuan.mengaplikasi.durasiMenit} Menit</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-300 rounded-lg">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                          <th className="p-2.5 w-1/4 border-r border-slate-200">Fase Sintaks Model</th>
                          <th className="p-2.5 w-3/8 border-r border-slate-200">Instruksi Praktis Guru</th>
                          <th className="p-2.5 w-3/8">Aktivitas Interaktif Siswa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {pertemuan.mengaplikasi.sintaks.map((step, sIdx) => (
                          <tr key={sIdx} className="hover:bg-slate-50/60">
                            <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200 align-top bg-slate-50/50">
                              <div>{step.fase}</div>
                              {step.alokasiMenit && (
                                <span className="text-[10px] text-slate-500 font-normal">
                                  ({step.alokasiMenit} menit)
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-slate-700 border-r border-slate-200 align-top leading-relaxed">
                              {step.instruksiGuru}
                            </td>
                            <td className="p-2.5 text-slate-700 align-top leading-relaxed">
                              {step.aktivitasSiswa}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sub-C: Merefleksi (Kegiatan Penutup) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-amber-700" />
                      C. Merefleksi (Kegiatan Penutup)
                    </span>
                    <span className="text-xs font-bold text-amber-800">{pertemuan.merefleksi.durasiMenit} Menit</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Refleksi Berkesadaran:</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.merefleksi.refleksiMindful}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Esensi Bermakna:</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.merefleksi.esensiBermakna}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Apresiasi Menggembirakan:</span>
                      <p className="text-slate-700 leading-relaxed">{pertemuan.merefleksi.apresiasiJoyful}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TABEL ANALISIS PRINSIP DEEP LEARNING (RPM) */}
        <section className="space-y-4 page-break">
          <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              VI. Tabel Analisis Prinsip Deep Learning (Mindful, Meaningful, Joyful)
            </h2>
            <button
              onClick={() => onOpenRefineModal('Tabel Analisis Prinsip', doc.tabelAnalisisPrinsip)}
              className="no-print text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> Optimalkan Analisis
            </button>
          </div>

          <PrincipleAnalysisTable data={doc.tabelAnalisisPrinsip} />
        </section>

        {/* 7. Asesmen & Rubrik Holistik */}
        <section className="space-y-4">
          <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              VII. Asesmen Pembelajaran Mendalam & Rubrik
            </h2>
          </div>

          <div className="space-y-4">
            {doc.asesmen.map((as, idx) => (
              <div key={idx} className="border border-slate-300 rounded-lg p-4 space-y-3 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                    {as.jenis}
                  </span>
                  <div className="text-[11px] text-slate-600">
                    <strong>Teknik:</strong> {as.teknik} | <strong>Instrumen:</strong> {as.instrumen}
                  </div>
                </div>

                {as.rubrikSingkat && as.rubrikSingkat.length > 0 && (
                  <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                          <th className="p-2 border-r border-slate-200 w-1/4">Kriteria Penilaian</th>
                          <th className="p-2 border-r border-slate-200 w-1/5 bg-emerald-50 text-emerald-950">Skor 4 (Sangat Baik)</th>
                          <th className="p-2 border-r border-slate-200 w-1/5 bg-blue-50 text-blue-950">Skor 3 (Baik)</th>
                          <th className="p-2 border-r border-slate-200 w-1/5 bg-amber-50 text-amber-950">Skor 2 (Cukup)</th>
                          <th className="p-2 w-1/5 bg-red-50 text-red-950">Skor 1 (Bimbingan)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {as.rubrikSingkat.map((r, rIdx) => (
                          <tr key={rIdx}>
                            <td className="p-2 font-bold text-slate-900 border-r border-slate-200 align-top">{r.kriteria}</td>
                            <td className="p-2 text-slate-700 border-r border-slate-200 align-top">{r.skor4}</td>
                            <td className="p-2 text-slate-700 border-r border-slate-200 align-top">{r.skor3}</td>
                            <td className="p-2 text-slate-700 border-r border-slate-200 align-top">{r.skor2}</td>
                            <td className="p-2 text-slate-700 align-top">{r.skor1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Catatan Diferensiasi Pembelajaran */}
        {doc.catatanDiferensiasi && (
          <section className="space-y-3">
            <div className="border-b-2 border-slate-800 pb-1">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                VIII. Catatan Diferensiasi Pembelajaran
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Diferensiasi Konten:</span>
                <p className="text-slate-700 leading-relaxed">{doc.catatanDiferensiasi.konten}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Diferensiasi Proses:</span>
                <p className="text-slate-700 leading-relaxed">{doc.catatanDiferensiasi.proses}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Diferensiasi Produk:</span>
                <p className="text-slate-700 leading-relaxed">{doc.catatanDiferensiasi.produk}</p>
              </div>
            </div>
          </section>
        )}

        {/* 9. Pengesahan Dokumen Resmi */}
        <section className="pt-8 border-t-2 border-slate-300">
          <div className="text-xs text-right text-slate-600 mb-6">
            Ditetapkan di: {doc.metadata.satuanPendidikan.split(' ')[0] || 'Kota'}, {doc.metadata.tanggalDokumen || '30 Oktober 2026'}
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs text-center">
            {/* Kepala Sekolah */}
            <div className="space-y-16">
              <div>
                <p className="text-slate-600">Mengetahui,</p>
                <p className="font-bold text-slate-900 uppercase">Kepala Sekolah</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 underline text-sm">
                  {doc.metadata.namaKepalaSekolah || 'Dr. H. Bambang Sudiro, M.Ed.'}
                </p>
                <p className="text-slate-600">
                  NIP. {doc.metadata.nipKepalaSekolah || '19700312 199412 1 002'}
                </p>
              </div>
            </div>

            {/* Guru Mata Pelajaran */}
            <div className="space-y-16">
              <div>
                <p className="text-slate-600">Penyusun,</p>
                <p className="font-bold text-slate-900 uppercase">Guru Mata Pelajaran</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 underline text-sm">
                  {doc.metadata.namaPenyusun || 'Dra. Hj. Nurul Hidayati, M.Pd.'}
                </p>
                <p className="text-slate-600">
                  NIP. {doc.metadata.nipPenyusun || '19780514 200501 2 003'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
