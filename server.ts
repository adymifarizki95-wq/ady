import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { DokumenRPM, GenerateRPMRequest } from './src/types/rpm.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const KEMENDIKDASMEN_SYSTEM_INSTRUCTION = `Anda adalah ahli kurikulum resmi Indonesia Kemendikdasmen (Kementerian Pendidikan Dasar dan Menengah) yang sangat berpengalaman dalam mendesain Pembelajaran Mendalam (Deep Learning) menggunakan kerangka resmi nasional dengan prinsip: Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful).

Tugas Anda adalah menghasilkan skenario Pembelajaran Mendalam (RPM) profesional, mendalam, kaya rincian kontekstual, dan lengkap yang siap pakai, sesuai dengan karakter jenjang dan materi, tanpa poin generik, dan berkualitas tinggi untuk supervisi akademik.

PERSYARATAN KONTEN SKENARIO PENGALAMAN BELAJAR:
1. LANGKAH SKENARIO PEMBELAJARAN PER PERTEMUAN:
   a. Memahami (Apersepsi & Pendahuluan):
      - Menerapkan prinsip Berkesadaran (Mindful - hening cipta/fokus nafas/kehadiran utuh), Bermakna (Meaningful - kaitan fenomena nyata), dan Menggembirakan (Joyful - aktivitas energik/pemantik rasa ingin tahu).
   b. Mengaplikasi (Kegiatan Inti Sesuai Sintaks Model Pedagogis):
      - Jika Discovery Learning: Stimulation -> Problem Statement -> Data Collection -> Data Processing -> Verification -> Generalization.
      - Jika PjBL: Pertanyaan Mendasar -> Desain Proyek -> Menyusun Jadwal -> Monitoring -> Presentasi/Uji Hasil -> Evaluasi.
      - Jika PBL: Orientasi Masalah -> Organisasi Belajar -> Investigasi Kelompok/Data -> Pengembangan Solusi -> Presentasi & Refleksi.
      - Jika GBL: Pengenalan Tantangan -> Aturan Permainan -> Eksplorasi -> Kompetisi/Kolaborasi -> Evaluasi.
      - Jika Station Learning: Orientasi Stasiun -> Station 1 -> Station 2 -> Station 3 -> Station 4 -> Pleno Refleksi.
      (Wajib mencantumkan instruksi praktis guru yang hidup dan aktivitas konkret interaktif siswa).
   c. Merefleksi (Kegiatan Penutup):
      - Melakukan refleksi mendalam berkesadaran, penyimpulan esensi materi bermakna, dan apresiasi menggembirakan.

2. PEMANFAATAN TEKNOLOGI DIGITAL:
   - Tentukan media digital interaktif yang kontekstual (misal: GeoGebra, PhET, Canva, Padlet, Quizizz, Google Docs, Physics Toolbox, dll.) lengkap dengan alasan pedagogisnya mengapa media tersebut memperdalam deep learning.

3. INTEGRASI AL-QUR'AN (JIKA YA):
   - Tuliskan teks ayat Arab lengkap dengan harakat, nama surat & nomor ayat (misal: QS. Luqman: 13-14), terjemahan Kemenag RI, serta analisis mendalam relevansi spiritual/sains/moralnya terhadap materi.

4. TABEL ANALISIS PRINSIP DEEP LEARNING (RPM):
   Hasilkan tabel khusus berisi 3 Kategori Prinsip Deep Learning secara berturut-turut:
   a. Berkesadaran (Mindful):
      - Tindakan Konkrit Siswa: Cuplikan aktivitas nyata saat siswa fokus, hening reflektif, atau mengamati objek secara penuh perhatian.
      - Aspek Bermakna / Cara Mencapainya: Alasan pedagogis mengapa tindakan tersebut melatih keheningan mental & penalaran kritis.
      - Dampak Emosional & Sisi Menggembirakan: Dampak keheningan batin, ketenangan, dan kesiapan mental siswa.
   b. Bermakna (Meaningful):
      - Tindakan Konkrit Siswa: Aktivitas di mana siswa menghubungkan konsep dengan masalah nyata kehidupan sehari-hari atau riset mandiri.
      - Aspek Bermakna / Cara Mencapainya: Penjelasan esensi pemahaman mendalam (deep understanding), bukan sekadar hafalan.
      - Dampak Emosional & Sisi Menggembirakan: Kepuasan intelek saat berhasil menemukan jawaban atas fenomena nyata.
   c. Menggembirakan (Joyful):
      - Tindakan Konkrit Siswa: Aktivitas kolaboratif, presentasi kreatif, eksperimen kelompok, atau edukatif game.
      - Aspek Bermakna / Cara Mencapainya: Cara interaksi dan tantangan kelompok membangun motivasi intrinsik.
      - Dampak Emosional & Sisi Menggembirakan: Rasa senang, kebanggaan kelompok, dan kecintaan dalam belajar (intrinsic joy).

5. ASESMEN & DIFERENSIASI:
   - Asesmen Formatif Berkesadaran & Asesmen Kinerja/Produk Otentik dengan rubrik skor 4-3-2-1.
   - Catatan diferensiasi konten, proses, dan produk.

6. BAHASA DAN FORMAT:
   - Gunakan Bahasa Indonesia formal, EYD, mendalam, inspiratif, kontekstual, tanpa kata generik atau placeholder kosong.
   - Hasilkan format JSON valid tanpa tanda markdown tambahan di sekitarnya.`;

// API Endpoint to Generate Full RPM Document
app.post('/api/generate-rpm', async (req: Request, res: Response) => {
  try {
    const data: GenerateRPMRequest = req.body;

    if (!data.mataPelajaran || !data.materiPembelajaran) {
      return res.status(400).json({ error: 'Mata Pelajaran dan Materi Pembelajaran wajib diisi.' });
    }

    const userPrompt = `
Hasilkan Dokumen Pembelajaran Mendalam (RPM) lengkap sesuai Master Prompt Skeleton:
- Jenjang: ${data.jenjang || 'SMA/MA'}
- Kelas: ${data.kelas || 'Kelas XI'}
- Semester: ${data.semester || 'Ganjil'}
- Satuan Pendidikan: ${data.satuanPendidikan || 'SMA Negeri 1 Indonesia Berkarakter'}
- Nama Guru: ${data.namaGuru || 'Guru Mata Pelajaran, S.Pd., M.Pd.'}
- Mata Pelajaran: ${data.mataPelajaran}
- Materi Pembelajaran: ${data.materiPembelajaran}
- Capaian Pembelajaran (CP): ${data.capaianPembelajaran || 'Peserta didik mampu menganalisis konsep mendalam materi terkait dan menerapkannya dalam konteks nyata'}
- Tujuan Pembelajaran (TP): ${data.tujuanPembelajaran || 'Peserta didik mampu menalar kritis, menginvestigasi fenomena nyata, dan merefleksikan esensi konsep'}
- Jumlah Pertemuan: ${data.jumlahPertemuan || 2} kali
- Durasi: ${data.durasiPerPertemuan || '2 x 45 Menit per Pertemuan'}
- Skenario Praktik Pedagogis per Pertemuan:
${(data.modelPertemuan || ['Problem Based Learning', 'Project Based Learning'])
  .map((m, idx) => `  * Pertemuan ${idx + 1}: menggunakan model [${m}]`)
  .join('\n')}
- Dimensi Profil Lulusan yang dipilih: ${(data.dimensiProfilLulusan || ['Penalaran Kritis', 'Gotong Royong', 'Mandiri']).join(', ')}
- Integrasi Ayat Al-Qur'an: ${data.integrasiQuran ? 'YA (Tuliskan teks Arab berharakat rapi, nama surat & ayat, terjemahan resmi Kemenag RI, dan analisis mendalam)' : 'TIDAK'}
${data.catatanKhusus ? `- Catatan Khusus Guru: ${data.catatanKhusus}` : ''}

PENTING:
Pastikan menghasilkan respon JSON murni yang sesuai dengan struktur berikut:
{
  "id": "rpm-unique-id",
  "metadata": {
    "judul": "string",
    "satuanPendidikan": "string",
    "jenjang": "string",
    "kelas": "string",
    "semester": "Ganjil" | "Genap",
    "mataPelajaran": "string",
    "materiPembelajaran": "string",
    "alokasiWaktu": "string",
    "jumlahPertemuan": number,
    "tahunAjaran": "2026/2027",
    "namaPenyusun": "string",
    "nipPenyusun": "string",
    "namaKepalaSekolah": "string",
    "nipKepalaSekolah": "string",
    "tanggalDokumen": "string"
  },
  "capaianPembelajaran": "string",
  "tujuanPembelajaran": ["string", "string", ...],
  "pertanyaanPemantik": ["string", "string", ...],
  "pemahamanBermakna": ["string", "string", ...],
  "dimensiProfilLulusan": ["string", "string", ...],
  "pemanfaatanTeknologiDigital": [
    {
      "namaMedia": "string",
      "kegunaanDiKelas": "string",
      "alasanPedagogis": "string"
    }
  ],
  "integrasiQuran": {
    "adaIntegrasi": boolean,
    "namaSuratDanAyat": "string",
    "teksArab": "string",
    "terjemahanKemenag": "string",
    "analisisRelevansi": "string",
    "pesanPedagogis": "string"
  },
  "skenarioPertemuan": [
    {
      "pertemuanKe": 1,
      "model": "string",
      "alokasiWaktu": "string",
      "topikFokus": "string",
      "tujuanKhusus": ["string", "string"],
      "memahami": {
        "prinsip": "Berkesadaran (Mindful) & Bermakna (Meaningful)",
        "apersepsi": "string",
        "kegiatanMindful": "string",
        "pemantikMakna": "string",
        "kegiatanJoyful": "string",
        "durasiMenit": 15
      },
      "mengaplikasi": {
        "model": "string",
        "sintaks": [
          {
            "fase": "string (nama fase sintaks resmi)",
            "instruksiGuru": "string",
            "aktivitasSiswa": "string",
            "alokasiMenit": number
          }
        ],
        "durasiMenit": 65
      },
      "merefleksi": {
        "refleksiMindful": "string",
        "esensiBermakna": "string",
        "apresiasiJoyful": "string",
        "tindakLanjut": "string",
        "durasiMenit": 10
      }
    }
  ],
  "tabelAnalisisPrinsip": [
    {
      "kategori": "Berkesadaran (Mindful)",
      "tindakanKonkritSiswa": "string",
      "aspekBermaknaCaraMencapai": "string",
      "dampakEmosionalSisiMenggembirakan": "string"
    },
    {
      "kategori": "Bermakna (Meaningful)",
      "tindakanKonkritSiswa": "string",
      "aspekBermaknaCaraMencapai": "string",
      "dampakEmosionalSisiMenggembirakan": "string"
    },
    {
      "kategori": "Menggembirakan (Joyful)",
      "tindakanKonkritSiswa": "string",
      "aspekBermaknaCaraMencapai": "string",
      "dampakEmosionalSisiMenggembirakan": "string"
    }
  ],
  "asesmen": [
    {
      "jenis": "Formatif Berkesadaran" | "Kinerja / Proyek Otentik" | "Sumatif Esensial",
      "teknik": "string",
      "instrumen": "string",
      "rubrikSingkat": [
        {
          "kriteria": "string",
          "skor4": "string",
          "skor3": "string",
          "skor2": "string",
          "skor1": "string"
        }
      ]
    }
  ],
  "catatanDiferensiasi": {
    "konten": "string",
    "proses": "string",
    "produk": "string"
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: KEMENDIKDASMEN_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text || '';
    let parsedDoc: DokumenRPM;
    try {
      parsedDoc = JSON.parse(textOutput);
      if (!parsedDoc.id) {
        parsedDoc.id = 'rpm-' + Date.now();
      }
    } catch (parseError) {
      console.error('Failed to parse JSON directly, extracting code blocks:', textOutput);
      const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedDoc = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Format respon AI tidak dapat diproses.');
      }
    }

    return res.json({ success: true, document: parsedDoc });
  } catch (error: any) {
    console.error('Error generating RPM:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Terjadi kendala saat merancang RPM dengan Gemini API.',
    });
  }
});

// Refine section endpoint
app.post('/api/refine-section', async (req: Request, res: Response) => {
  try {
    const { sectionName, currentContent, userFeedback, documentContext } = req.body;

    const prompt = `Anda adalah ahli kurikulum Kemendikdasmen RI untuk Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful).
Perbaiki atau kembangkan bagian "${sectionName}" dari Dokumen RPM berikut:

Konteks Dokumen:
- Mata Pelajaran: ${documentContext?.metadata?.mataPelajaran || ''}
- Materi: ${documentContext?.metadata?.materiPembelajaran || ''}
- Jenjang/Kelas: ${documentContext?.metadata?.jenjang || ''} ${documentContext?.metadata?.kelas || ''}

Konten Bagian Saat Ini:
${JSON.stringify(currentContent, null, 2)}

Permintaan Perbaikan Guru:
"${userFeedback}"

Berikan hasil revisi yang mendalam, kontekstual, elegan, dan siap diterapkan dalam format JSON dengan key "refinedContent" yang memiliki struktur sama dengan konten saat ini.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: KEMENDIKDASMEN_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed.refinedContent || parsed });
  } catch (err: any) {
    console.error('Error in refine-section:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Setup Vite in Dev or Static files in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Si-Deep Kemendikdasmen Server running at http://localhost:${port}`);
  });
}

startServer();
