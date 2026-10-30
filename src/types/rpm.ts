export type PedagogicalModel = 
  | 'Problem Based Learning'
  | 'Project Based Learning'
  | 'Discovery Learning'
  | 'Game-Based Learning'
  | 'Station Learning';

export interface SkenarioLangkah {
  fase: string;
  instruksiGuru: string;
  aktivitasSiswa: string;
  alokasiMenit?: number;
}

export interface SkenarioPertemuan {
  pertemuanKe: number;
  model: PedagogicalModel;
  alokasiWaktu: string;
  topikFokus: string;
  tujuanKhusus: string[];
  memahami: {
    prinsip: 'Berkesadaran (Mindful) & Bermakna (Meaningful)';
    apersepsi: string;
    kegiatanMindful: string;
    pemantikMakna: string;
    kegiatanJoyful: string;
    durasiMenit: number;
  };
  mengaplikasi: {
    model: PedagogicalModel;
    sintaks: SkenarioLangkah[];
    durasiMenit: number;
  };
  merefleksi: {
    refleksiMindful: string;
    esensiBermakna: string;
    apresiasiJoyful: string;
    tindakLanjut: string;
    durasiMenit: number;
  };
}

export interface DeepLearningPrincipleAnalysis {
  kategori: 'Berkesadaran (Mindful)' | 'Bermakna (Meaningful)' | 'Menggembirakan (Joyful)';
  tindakanKonkritSiswa: string;
  aspekBermaknaCaraMencapai: string;
  dampakEmosionalSisiMenggembirakan: string;
}

export interface QuranicIntegration {
  adaIntegrasi: boolean;
  namaSuratDanAyat: string;
  teksArab: string;
  terjemahanKemenag: string;
  analisisRelevansi: string; // Analisis spiritual/sains/moral terhadap materi
  pesanPedagogis: string;
}

export interface DigitalTechTool {
  namaMedia: string; // misal: PhET Interactive Simulations, GeoGebra 3D, Canva for Education
  kegunaanDiKelas: string;
  alasanPedagogis: string; // Alasan pedagogis mengapa media ini meningkatkan deep learning
}

export interface AsesmenDetail {
  jenis: 'Formatif Berkesadaran' | 'Kinerja / Proyek Otentik' | 'Sumatif Esensial';
  teknik: string;
  instrumen: string;
  rubrikSingkat: {
    kriteria: string;
    skor4: string; // Sangat Baik
    skor3: string; // Baik
    skor2: string; // Cukup
    skor1: string; // Perlu Bimbingan
  }[];
}

export interface DokumenRPM {
  id: string;
  metadata: {
    judul: string;
    satuanPendidikan: string;
    jenjang: string;
    kelas: string;
    semester: 'Ganjil' | 'Genap';
    mataPelajaran: string;
    materiPembelajaran: string;
    alokasiWaktu: string;
    jumlahPertemuan: number;
    tahunAjaran: string;
    namaPenyusun: string;
    nipPenyusun?: string;
    namaKepalaSekolah?: string;
    nipKepalaSekolah?: string;
    tanggalDokumen: string;
  };
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  pertanyaanPemantik: string[];
  pemahamanBermakna: string[];
  dimensiProfilLulusan: string[];
  pemanfaatanTeknologiDigital: DigitalTechTool[];
  integrasiQuran: QuranicIntegration;
  skenarioPertemuan: SkenarioPertemuan[];
  tabelAnalisisPrinsip: DeepLearningPrincipleAnalysis[];
  asesmen: AsesmenDetail[];
  catatanDiferensiasi: {
    konten: string;
    proses: string;
    produk: string;
  };
}

export interface GenerateRPMRequest {
  jenjang: string;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  mataPelajaran: string;
  materiPembelajaran: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  jumlahPertemuan: number;
  durasiPerPertemuan: string;
  modelPertemuan: PedagogicalModel[];
  dimensiProfilLulusan: string[];
  integrasiQuran: boolean;
  satuanPendidikan?: string;
  namaGuru?: string;
  catatanKhusus?: string;
}
