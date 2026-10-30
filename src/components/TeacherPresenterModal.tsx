import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Brain, 
  Smile, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DokumenRPM } from '../types/rpm';

interface TeacherPresenterModalProps {
  document: DokumenRPM;
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherPresenterModal: React.FC<TeacherPresenterModalProps> = ({
  document: doc,
  isOpen,
  onClose,
}) => {
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState<'memahami' | 'mengaplikasi' | 'merefleksi'>('memahami');
  const [syntaxStepIndex, setSyntaxStepIndex] = useState(0);

  // 60-second mindfulness timer
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen) return null;

  const currentMeeting = doc.skenarioPertemuan[selectedMeetingIndex] || doc.skenarioPertemuan[0];
  const syntaxSteps = currentMeeting.mengaplikasi.sintaks || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              CLASS
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Mode Fasilitator Kelas: {doc.metadata.materiPembelajaran}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {doc.metadata.mataPelajaran} • {doc.metadata.kelas} • Model: {currentMeeting.model}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Meeting selector tabs */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
              {doc.skenarioPertemuan.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedMeetingIndex(idx);
                    setCurrentStage('memahami');
                    setSyntaxStepIndex(0);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    selectedMeetingIndex === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pertemuan {p.pertemuanKe}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStage('memahami')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                currentStage === 'memahami'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-blue-300" />
              <span>1. Memahami (Apersepsi & Mindful)</span>
            </button>

            <button
              onClick={() => setCurrentStage('mengaplikasi')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                currentStage === 'mengaplikasi'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-indigo-300" />
              <span>2. Mengaplikasi (Inti Sintaks)</span>
            </button>

            <button
              onClick={() => setCurrentStage('merefleksi')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                currentStage === 'merefleksi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Smile className="w-3.5 h-3.5 text-amber-300" />
              <span>3. Merefleksi (Penutup & Apresiasi)</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            {currentMeeting.alokasiWaktu}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STAGE 1: MEMAHAMI */}
          {currentStage === 'memahami' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Mindfulness Timer Widget */}
              <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 p-5 rounded-2xl border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-blue-400" />
                    Latihan Hening Berkesadaran (Mindful Breathing)
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Pandu Siswa Menghadirkan Kesadaran Penuh & Bernapas Tenang
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    "Ajak siswa meletakkan gawai, memejamkan mata 1 menit, menarik napas lembut, dan menyadari rasa syukur atas nikmat akal dan oksigen hari ini."
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-2xl font-mono font-bold text-amber-300 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                    00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                  </div>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-transform hover:scale-105"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(60);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Activities cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-blue-400 uppercase">Apersepsi Berkesadaran:</div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.memahami.apersepsi}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase">Pemantik Makna:</div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.memahami.pemantikMakna}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase">Ice Breaking Joyful:</div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.memahami.kegiatanJoyful}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStage('mengaplikasi')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2"
                >
                  <span>Lanjut ke Kegiatan Inti ({currentMeeting.mengaplikasi.model})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: MENGAPLIKASI (INTI SINTAKS) */}
          {currentStage === 'mengaplikasi' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Sintaks: {currentMeeting.mengaplikasi.model}
                  </span>
                  <span className="text-xs text-slate-400">
                    (Langkah {syntaxStepIndex + 1} dari {syntaxSteps.length})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={syntaxStepIndex === 0}
                    onClick={() => setSyntaxStepIndex((prev) => Math.max(0, prev - 1))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={syntaxStepIndex === syntaxSteps.length - 1}
                    onClick={() => setSyntaxStepIndex((prev) => Math.min(syntaxSteps.length - 1, prev + 1))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Detail Card */}
              {syntaxSteps[syntaxStepIndex] && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/40">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">
                      Fase Sintaks
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {syntaxSteps[syntaxStepIndex].fase}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-sky-400 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        Instruksi Praktis Guru:
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {syntaxSteps[syntaxStepIndex].instruksiGuru}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Aktivitas Interaktif Siswa:
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {syntaxSteps[syntaxStepIndex].aktivitasSiswa}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStage('memahami')}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Kembali ke Apersepsi
                </button>

                <div className="flex items-center gap-2">
                  {syntaxStepIndex < syntaxSteps.length - 1 ? (
                    <button
                      onClick={() => setSyntaxStepIndex((prev) => prev + 1)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Langkah Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStage('merefleksi')}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Lanjut ke Penutup & Refleksi</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: MEREFLEKSI */}
          {currentStage === 'merefleksi' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-2">
                <span className="text-xs font-bold uppercase text-amber-400 block">
                  Penutup & Apresiasi Menggembirakan
                </span>
                <h3 className="text-base font-bold text-white">
                  Menyimpulkan Esensi Makna & Memberikan Apresiasi Positif
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-blue-400 uppercase">
                    Refleksi Berkesadaran Siswa:
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.merefleksi.refleksiMindful}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase">
                    Esensi Materi Bermakna:
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.merefleksi.esensiBermakna}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2 md:col-span-2">
                  <div className="text-xs font-bold text-amber-400 uppercase">
                    Apresiasi Menggembirakan (Joyful Celebration):
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentMeeting.merefleksi.apresiasiJoyful}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStage('mengaplikasi')}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Kembali ke Kegiatan Inti
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Selesai & Tutup Mode Kelas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
