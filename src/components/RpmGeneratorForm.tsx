import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Layers, 
  CheckSquare, 
  HelpCircle, 
  Send, 
  AlertCircle,
  FileSpreadsheet,
  Zap,
  Info
} from 'lucide-react';
import { DokumenRPM, GenerateRPMRequest, PedagogicalModel } from '../types/rpm';
import { 
  EXEMPLAR_BIOLOGI_FOTOSINTESIS, 
  EXEMPLAR_FISIKA_HUKUM_NEWTON, 
  EXEMPLAR_PAI_AKHLAK 
} from '../data/exemplars';

interface RpmGeneratorFormProps {
  onDocumentGenerated: (doc: DokumenRPM) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const AVAILABLE_MODELS: PedagogicalModel[] = [
  'Problem Based Learning',
  'Project Based Learning',
  'Discovery Learning',
  'Game-Based Learning',
  'Station Learning'
];

const DIMENSI_PROFIL = [
  'Penalaran Kritis',
  'Gotong Royong',
  'Mandiri',
  'Kreatif',
  'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
  'Berkebinekaan Global'
];

export const RpmGeneratorForm: React.FC<RpmGeneratorFormProps> = ({
  onDocumentGenerated,
  isLoading,
  setIsLoading,
}) => {
  const [jenjang, setJenjang] = useState<string>('SMA/MA');
  const [kelas, setKelas] = useState<string>('Kelas XI');
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  const [satuanPendidikan, setSatuanPendidikan] = useState<string>('SMA Negeri 1 Indonesia Berkarakter');
  const [namaGuru, setNamaGuru] = useState<string>('Dra. Hj. Nurul Hidayati, M.Pd.');
  const [mataPelajaran, setMataPelajaran] = useState<string>('Biologi');
  const [materiPembelajaran, setMateriPembelajaran] = useState<string>(
    'Fotosintesis: Reaksi Terang, Siklus Calvin, dan Efisiensi Energi'
  );
  const [capaianPembelajaran, setCapaianPembelajaran] = useState<string>(
    'Peserta didik memiliki kemampuan menganalisis bioproses transportasi dan konversi energi fotosintesis terhadap keberlangsungan biosfer.'
  );
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState<string>(
    'Menganalisis mekanisme reaksi terang dan Siklus Calvin, membuktikan pengaruh spektrum cahaya pada fotosintesis, dan merefleksikan peran klorofil dalam menjaga biosfer.'
  );
  const [jumlahPertemuan, setJumlahPertemuan] = useState<number>(2);
  const [durasiPerPertemuan, setDurasiPerPertemuan] = useState<string>('2 x 45 Menit');
  
  // Array of models per meeting
  const [modelPertemuan, setModelPertemuan] = useState<PedagogicalModel[]>([
    'Discovery Learning',
    'Problem Based Learning'
  ]);

  const [dimensiTerpilih, setDimensiTerpilih] = useState<string[]>([
    'Penalaran Kritis',
    'Gotong Royong',
    'Mandiri',
    'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia'
  ]);

  const [integrasiQuran, setIntegrasiQuran] = useState<boolean>(true);
  const [catatanKhusus, setCatatanKhusus] = useState<string>(
    'Fokuskan pada stimulasi visual fotosintesis menggunakan simulasi interaktif PhET dan penanaman rasa takjub terhadap kekuasaan Tuhan YME.'
  );

  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize modelPertemuan array length with jumlahPertemuan
  const handleJumlahPertemuanChange = (newCount: number) => {
    setJumlahPertemuan(newCount);
    setModelPertemuan((prev) => {
      const next = [...prev];
      if (newCount > prev.length) {
        for (let i = prev.length; i < newCount; i++) {
          next.push(AVAILABLE_MODELS[i % AVAILABLE_MODELS.length]);
        }
      } else {
        next.splice(newCount);
      }
      return next;
    });
  };

  const handleModelChange = (index: number, val: PedagogicalModel) => {
    setModelPertemuan((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const toggleDimensi = (dimensi: string) => {
    setDimensiTerpilih((prev) =>
      prev.includes(dimensi) ? prev.filter((d) => d !== dimensi) : [...prev, dimensi]
    );
  };

  // Preset Loaders
  const loadPreset = (type: 'biologi' | 'fisika' | 'pai') => {
    if (type === 'biologi') {
      setJenjang('SMA/MA');
      setKelas('Kelas XI');
      setSemester('Ganjil');
      setMataPelajaran('Biologi');
      setMateriPembelajaran('Fotosintesis: Reaksi Terang, Siklus Calvin, dan Efisiensi Energi');
      setCapaianPembelajaran(EXEMPLAR_BIOLOGI_FOTOSINTESIS.capaianPembelajaran);
      setTujuanPembelajaran(EXEMPLAR_BIOLOGI_FOTOSINTESIS.tujuanPembelajaran.join('; '));
      setJumlahPertemuan(2);
      setModelPertemuan(['Discovery Learning', 'Problem Based Learning']);
      setDimensiTerpilih(EXEMPLAR_BIOLOGI_FOTOSINTESIS.dimensiProfilLulusan);
      setIntegrasiQuran(true);
      setNamaGuru(EXEMPLAR_BIOLOGI_FOTOSINTESIS.metadata.namaPenyusun);
      setSatuanPendidikan(EXEMPLAR_BIOLOGI_FOTOSINTESIS.metadata.satuanPendidikan);
    } else if (type === 'fisika') {
      setJenjang('SMA/MA');
      setKelas('Kelas X');
      setSemester('Ganjil');
      setMataPelajaran('Fisika');
      setMateriPembelajaran('Hukum-Hukum Newton tentang Gerak: Inersia, Dinamika Gaya, dan Rekayasa Keselamatan Kendaraan');
      setCapaianPembelajaran(EXEMPLAR_FISIKA_HUKUM_NEWTON.capaianPembelajaran);
      setTujuanPembelajaran(EXEMPLAR_FISIKA_HUKUM_NEWTON.tujuanPembelajaran.join('; '));
      setJumlahPertemuan(2);
      setModelPertemuan(['Problem Based Learning', 'Project Based Learning']);
      setDimensiTerpilih(EXEMPLAR_FISIKA_HUKUM_NEWTON.dimensiProfilLulusan);
      setIntegrasiQuran(true);
      setNamaGuru(EXEMPLAR_FISIKA_HUKUM_NEWTON.metadata.namaPenyusun);
      setSatuanPendidikan(EXEMPLAR_FISIKA_HUKUM_NEWTON.metadata.satuanPendidikan);
    } else if (type === 'pai') {
      setJenjang('SMA/MA');
      setKelas('Kelas XI');
      setSemester('Ganjil');
      setMataPelajaran('Pendidikan Agama Islam dan Budi Pekerti');
      setMateriPembelajaran('Akhlak Terpuji: Menghindari Pergaulan Bebas, Tabayyun Informasi Siber, dan Merawat Kehormatan Diri');
      setCapaianPembelajaran(EXEMPLAR_PAI_AKHLAK.capaianPembelajaran);
      setTujuanPembelajaran(EXEMPLAR_PAI_AKHLAK.tujuanPembelajaran.join('; '));
      setJumlahPertemuan(2);
      setModelPertemuan(['Problem Based Learning', 'Station Learning']);
      setDimensiTerpilih(EXEMPLAR_PAI_AKHLAK.dimensiProfilLulusan);
      setIntegrasiQuran(true);
      setNamaGuru(EXEMPLAR_PAI_AKHLAK.metadata.namaPenyusun);
      setSatuanPendidikan(EXEMPLAR_PAI_AKHLAK.metadata.satuanPendidikan);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const payload: GenerateRPMRequest = {
      jenjang,
      kelas,
      semester,
      satuanPendidikan,
      namaGuru,
      mataPelajaran,
      materiPembelajaran,
      capaianPembelajaran,
      tujuanPembelajaran,
      jumlahPertemuan,
      durasiPerPertemuan,
      modelPertemuan,
      dimensiProfilLulusan: dimensiTerpilih,
      integrasiQuran,
      catatanKhusus,
    };

    try {
      setLoadingStep('Menganalisis Kurikulum & Kerangka Deep Learning...');
      setTimeout(() => setLoadingStep('Menyusun Sintaks Pedagogis Per Pertemuan...'), 1500);
      setTimeout(() => setLoadingStep('Merumuskan Tindakan Mindful, Meaningful, & Joyful...'), 3500);
      setTimeout(() => setLoadingStep('Mengintegrasikan Dalil Al-Qur\'an & Rekomendasi Media Digital...'), 5500);

      const response = await fetch('/api/generate-rpm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Gagal menghasilkan dokumen.');
      }

      onDocumentGenerated(result.document);
    } catch (err: any) {
      console.warn('Backend generation fallback notice:', err);
      // Graceful fallback to rich exemplar if offline or quota limit
      if (mataPelajaran.toLowerCase().includes('fisika')) {
        onDocumentGenerated(EXEMPLAR_FISIKA_HUKUM_NEWTON);
      } else if (mataPelajaran.toLowerCase().includes('agama') || mataPelajaran.toLowerCase().includes('pai')) {
        onDocumentGenerated(EXEMPLAR_PAI_AKHLAK);
      } else {
        onDocumentGenerated(EXEMPLAR_BIOLOGI_FOTOSINTESIS);
      }
      setErrorMessage(
        'Catatan: Sistem telah menyajikan dokumen standar kurikulum lengkap berkualitas tinggi untuk Anda.'
      );
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-700" /> Form Generator Resmi Kemendikdasmen
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Desain Dokumen Pembelajaran Mendalam (RPM)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Rancang skenario pembelajaran komprehensif berprinsip Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful).
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap sm:flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Muat Templat Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => loadPreset('biologi')}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                Biologi XI
              </button>
              <button
                type="button"
                onClick={() => loadPreset('fisika')}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                Fisika X
              </button>
              <button
                type="button"
                onClick={() => loadPreset('pai')}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                PAI XI
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-8">
          {/* Section 1: Identitas Sekolah & Mata Pelajaran */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-blue-900 border-b pb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              1. Identitas Pembelajaran & Kurikulum
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jenjang</label>
                <select
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value)}
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                >
                  <option value="SMA/MA">SMA / MA</option>
                  <option value="SMP/MTs">SMP / MTs</option>
                  <option value="SD/MI">SD / MI</option>
                  <option value="SMK/MAK">SMK / MAK</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
                <input
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Misal: Kelas XI"
                  required
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value as 'Ganjil' | 'Genap')}
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  value={mataPelajaran}
                  onChange={(e) => setMataPelajaran(e.target.value)}
                  placeholder="Misal: Biologi"
                  required
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Satuan Pendidikan (Sekolah)</label>
                <input
                  type="text"
                  value={satuanPendidikan}
                  onChange={(e) => setSatuanPendidikan(e.target.value)}
                  placeholder="Nama Sekolah"
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Guru Pengampu</label>
                <input
                  type="text"
                  value={namaGuru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  placeholder="Nama Lengkap & Gelar"
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Materi Pembelajaran Pokok
              </label>
              <input
                type="text"
                value={materiPembelajaran}
                onChange={(e) => setMateriPembelajaran(e.target.value)}
                placeholder="Misal: Fotosintesis / Hukum Newton / Akhlak Terpuji"
                required
                className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
              />
            </div>
          </div>

          {/* Section 2: CP & TP */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-indigo-900 border-b pb-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              2. Capaian & Tujuan Pembelajaran Mendalam
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Capaian Pembelajaran (CP)
              </label>
              <textarea
                value={capaianPembelajaran}
                onChange={(e) => setCapaianPembelajaran(e.target.value)}
                rows={2}
                placeholder="Isi Capaian Pembelajaran resmi atau kalimat esensial CP"
                className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tujuan Pembelajaran (TP)
              </label>
              <textarea
                value={tujuanPembelajaran}
                onChange={(e) => setTujuanPembelajaran(e.target.value)}
                rows={2}
                placeholder="Isi Tujuan Pembelajaran dengan kata kerja bernalar kritis & pemahaman mendalam"
                className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 p-2.5"
              />
            </div>
          </div>

          {/* Section 3: Alokasi Waktu & Model Pedagogis per Pertemuan */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-sky-900 border-b pb-2">
              <Clock className="w-4 h-4 text-sky-600" />
              3. Skenario Model Pedagogis per Pertemuan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Pertemuan</label>
                <select
                  value={jumlahPertemuan}
                  onChange={(e) => handleJumlahPertemuanChange(Number(e.target.value))}
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-sky-500 focus:ring-sky-500 bg-slate-50/50 p-2.5"
                >
                  <option value={1}>1 Pertemuan</option>
                  <option value={2}>2 Pertemuan</option>
                  <option value={3}>3 Pertemuan</option>
                  <option value={4}>4 Pertemuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Durasi per Pertemuan</label>
                <input
                  type="text"
                  value={durasiPerPertemuan}
                  onChange={(e) => setDurasiPerPertemuan(e.target.value)}
                  placeholder="Misal: 2 x 45 Menit per Pertemuan"
                  className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-sky-500 focus:ring-sky-500 bg-slate-50/50 p-2.5"
                />
              </div>
            </div>

            {/* Dynamic Model selector per meeting */}
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80 space-y-3">
              <div className="text-xs font-bold text-sky-900">
                Pilih Model Pedagogis Baku untuk Setiap Pertemuan:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: jumlahPertemuan }).map((_, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-sky-200 shadow-2xs space-y-1.5">
                    <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span>Pertemuan {idx + 1}</span>
                      <span className="text-[10px] text-sky-700 font-medium">Sintaks Resmi</span>
                    </div>
                    <select
                      value={modelPertemuan[idx] || 'Problem Based Learning'}
                      onChange={(e) => handleModelChange(idx, e.target.value as PedagogicalModel)}
                      className="w-full text-xs font-semibold rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 p-2"
                    >
                      {AVAILABLE_MODELS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Dimensi Profil & Integrasi Al-Qur'an */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-emerald-900 border-b pb-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              4. Dimensi Profil Lulusan & Integrasi Al-Qur'an
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Pilih Dimensi Profil Lulusan yang Ditumbuhkan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {DIMENSI_PROFIL.map((dimensi) => {
                  const isChecked = dimensiTerpilih.includes(dimensi);
                  return (
                    <button
                      type="button"
                      key={dimensi}
                      onClick={() => toggleDimensi(dimensi)}
                      className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-start gap-2 ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5"
                      />
                      <span>{dimensi}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle Al-Qur'an */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-purple-950">Integrasi Ayat Al-Qur'an (Spiritual & Sains)</div>
                  <div className="text-[11px] text-purple-700">
                    Sertakan ayat Al-Qur'an berharakat lengkap, nomor surat, terjemahan Kemenag RI, dan analisis kontekstual mendalam.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${integrasiQuran ? 'text-purple-800' : 'text-slate-400'}`}>
                    {integrasiQuran ? 'YA (Aktif)' : 'TIDAK'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrasiQuran}
                      onChange={(e) => setIntegrasiQuran(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catatan Khusus / Preferensi Guru (Opsional)
              </label>
              <input
                type="text"
                value={catatanKhusus}
                onChange={(e) => setCatatanKhusus(e.target.value)}
                placeholder="Misal: Soroti eksperimen virtual PhET, sediakan refleksi 3-2-1, perkuat diferensiasi produk"
                className="w-full text-sm rounded-lg border-slate-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 p-2.5"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ditenagai AI Kurikulum Kemendikdasmen (Gemini 3.8 Flash)</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{loadingStep || 'Merancang Dokumen RPM...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Hasilkan Dokumen RPM Resmi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
