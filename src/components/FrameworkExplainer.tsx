import React from 'react';
import { 
  Heart, 
  Brain, 
  Smile, 
  CheckCircle, 
  Lightbulb, 
  Compass, 
  BookMarked,
  ArrowRight
} from 'lucide-react';

interface FrameworkExplainerProps {
  onStartGenerator: () => void;
}

export const FrameworkExplainer: React.FC<FrameworkExplainerProps> = ({ onStartGenerator }) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Hero Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase">
          <Compass className="w-3.5 h-3.5" /> Kerangka Resmi Kemendikdasmen RI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pilar Paradigma Pembelajaran Mendalam
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600">
            (Deep Learning Curriculum Framework)
          </span>
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Pembelajaran Mendalam bukan sekadar penguasaan materi tekstual (hafalan), melainkan orkestrasi pengalaman belajar yang mengakar kuat dalam batin siswa melalui tiga pilar sinergis: <strong>Berkesadaran</strong>, <strong>Bermakna</strong>, dan <strong>Menggembirakan</strong>.
        </p>
      </div>

      {/* 3 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mindful */}
        <div className="relative bg-gradient-to-b from-blue-50/70 to-white rounded-2xl p-6 border border-blue-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Pilar I</span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">Berkesadaran (Mindful)</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Menghadirkan kesadaran penuh (mindful presence) dan keheningan batin sebelum dan selama belajar. Siswa tidak terburu-buru, melainkan mengamati fenomena dengan ketajaman pancaindra, mengendalikan distraksi, dan menumbuhkan rasa syukur serta takjub ilmiah.
          </p>
          <div className="pt-2 border-t border-blue-100 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Ciri Khas di Kelas:</div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Hening bernapas sadar (Mindful breathing) 1 menit</li>
              <li>Observasi multisensori objek nyata / spesimen</li>
              <li>Muhasabah dan refleksi keheningan jurnal metakognitif</li>
            </ul>
          </div>
        </div>

        {/* Meaningful */}
        <div className="relative bg-gradient-to-b from-indigo-50/70 to-white rounded-2xl p-6 border border-indigo-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Pilar II</span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">Bermakna (Meaningful)</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Konsep yang dipelajari ditambatkan langsung pada masalah nyata (real-world problems) di sekitar siswa. Belajar bukan untuk menjawab soal ujian, melainkan untuk memahami cara kerja dunia, memecahkan persoalan hidup, dan mengabdi bagi kemanusiaan.
          </p>
          <div className="pt-2 border-t border-indigo-100 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Ciri Khas di Kelas:</div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Pertanyaan pemantik filosofis dan kontekstual</li>
              <li>Investigasi studi kasus otentik (misal: krisis pangan/kecelakaan)</li>
              <li>Transfer konsep ke pemecahan masalah keseharian</li>
            </ul>
          </div>
        </div>

        {/* Joyful */}
        <div className="relative bg-gradient-to-b from-amber-50/70 to-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pilar III</span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">Menggembirakan (Joyful)</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Membangkitkan motivasi intrinsik dan kegembiraan intelektual (intellectual joy). Kelas dipenuhi rasa ingin tahu, kolaborasi hangat antarsiswa, tantangan kreatif tanpa rasa takut dihakimi, serta perayaan atas setiap pencapaian kelompok.
          </p>
          <div className="pt-2 border-t border-amber-100 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Ciri Khas di Kelas:</div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Simulasi gamifikasi interaktif & kuis berbasis game</li>
              <li>Tantangan kolaboratif (misal: merakit kapsul penyelamat)</li>
              <li>Tepuk apresiasi kawan dan penobatan tim teladan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Pedagogical Syntaxes Guidance */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">5 Model Pedagogis Resmi & Sintaks Baku Kemendikdasmen</h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Standar Supervisi Akademik</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Discovery */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-blue-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">1</span>
              Discovery Learning (Penemuan Mandiri)
            </div>
            <p className="text-xs text-slate-600">
              Sintaks Baku: <em>Stimulation</em> → <em>Problem Statement</em> → <em>Data Collection</em> → <em>Data Processing</em> → <em>Verification</em> → <em>Generalization</em>.
            </p>
            <p className="text-xs text-slate-500">Sangat efektif untuk materi biologi, fisika, kimia, dan konsep sains alam yang butuh pembuktian empiris.</p>
          </div>

          {/* PBL */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-indigo-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-bold">2</span>
              Problem Based Learning / PBL (Pemecahan Masalah)
            </div>
            <p className="text-xs text-slate-600">
              Sintaks Baku: <em>Orientasi Siswa pada Masalah</em> → <em>Organisasi Belajar</em> → <em>Penyelidikan Mandiri/Kelompok</em> → <em>Pengembangan & Penyajian Solusi</em> → <em>Analisis & Evaluasi</em>.
            </p>
            <p className="text-xs text-slate-500">Ideal untuk isu sosial, dilema etika/akhlak, sains lingkungan, dan ekonomi kontekstual.</p>
          </div>

          {/* PjBL */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-sky-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs flex items-center justify-center font-bold">3</span>
              Project Based Learning / PjBL (Berbasis Proyek Nyata)
            </div>
            <p className="text-xs text-slate-600">
              Sintaks Baku: <em>Pertanyaan Mendasar</em> → <em>Mendesain Rencana Proyek</em> → <em>Menyusun Jadwal</em> → <em>Monitoring Kemajuan</em> → <em>Menguji Hasil/Presentasi</em> → <em>Evaluasi Pengalaman</em>.
            </p>
            <p className="text-xs text-slate-500">Unggul untuk pembuatan karya rekayasa (STEM), inovasi digital, karya seni, atau aksi sosial.</p>
          </div>

          {/* GBL */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-amber-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">4</span>
              Game-Based Learning / GBL (Pembelajaran Berbasis Permainan)
            </div>
            <p className="text-xs text-slate-600">
              Sintaks Baku: <em>Pengenalan Misi/Tantangan</em> → <em>Pemahaman Aturan & Mekanika</em> → <em>Eksplorasi Strategi</em> → <em>Kompetisi Sehat/Kolaborasi</em> → <em>Debriefing Kognitif</em>.
            </p>
            <p className="text-xs text-slate-500">Memicu dopamin belajar tinggi untuk materi matematika, bahasa, kuis konsep, dan simulasi strategi.</p>
          </div>

          {/* Station Learning */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 md:col-span-2">
            <div className="font-bold text-emerald-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">5</span>
              Station Learning (Pembelajaran Stasiun Rotasi Dinamis)
            </div>
            <p className="text-xs text-slate-600">
              Sintaks Baku: <em>Orientasi Peta Stasiun</em> → <em>Eksplorasi Station 1 (Konsep/Digital)</em> → <em>Station 2 (Eksperimen/Praktikum)</em> → <em>Station 3 (Studi Kasus/Dilema)</em> → <em>Station 4 (Produk Kreatif)</em> → <em>Pleno Refleksi</em>.
            </p>
            <p className="text-xs text-slate-500">Mencegah kebosanan dengan pergerakan fisik aktif, memungkinkan diferensiasi konten secara simultan.</p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-900/10">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
            <Lightbulb className="w-4 h-4" /> Siap Merancang untuk Supervisi Akademik?
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">Rancang Dokumen RPM Pembelajaran Mendalam Sekarang</h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Gunakan asisten kecerdasan kurikulum resmi dengan AI Gemini 3.8 Flash untuk menyusun skenario presisi, tabel analisis 3 prinsip, integrasi Al-Qur'an, dan teknologi interaktif.
          </p>
        </div>
        <button
          onClick={onStartGenerator}
          className="shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-2"
        >
          <span>Mulai Rancang RPM</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
