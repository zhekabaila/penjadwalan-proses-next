// FAQ content data for the FaqSection component
export const faqContent = `Draf FAQ (Fokus Fitur)

1. Apa tujuan dari visualisasi ini?
**Visualisasi** ini dirancang untuk membantu memahami cara algoritma penjadwalan **CPU** bekerja dalam sistem operasi. Dengan visualisasi Gantt Chart dan input dinamis, kamu bisa melihat urutan eksekusi proses, waktu tunggu, dan turnaround time secara **real-time**.

2. Apa itu Gantt Chart yang ditampilkan di hasil visualisasi?

**Gantt Chart** adalah visualisasi utama dari simulasi ini. Ini adalah diagram batang horizontal yang menunjukkan proses mana yang sedang dieksekusi oleh CPU pada rentang waktu tertentu.

3. Apa itu "Nilai Kwanta" dan mengapa saya harus mengisinya?

**"Nilai Kwanta"** (atau Time Quantum) adalah jatah waktu maksimum yang diberikan kepada setiap proses untuk berjalan di CPU sebelum CPU beralih ke proses berikutnya. Ini adalah konsep inti dari algoritma **Round Robin (RR)**.

4. Bagaimana cara menggunakan visualisasi ini?
- Masukkan daftar proses pada input **(biasanya berupa nama proses dan nilai burst time)**.
- Tentukan **nilai kwanta** (untuk algoritma Round Robin).
- Klik tombol **"Jalankan Visualisasi"**.
- Lihat hasilnya dalam bentuk **Gantt Chart** dan tabel metrik (waiting time, turnaround time, dll).

5. Apakah saya bisa mengganti nilai kwanta setelah memasukkan data?
**Tentu saja!** Kamu dapat:

- Mengubah **nilai kwanta** kapan saja,
- Lalu klik **"Mulai Visualisasi"** untuk melihat bagaimana perubahan kwanta memengaruhi eksekusi dan metrik performa.`;

// Type definition for the FAQ sections
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Function to parse the FAQ content into items
export const parseFaqContent = (): FaqItem[] => {
  // Remove the header and split by question numbers
  const contentWithoutHeader = faqContent.replace(/^Draf FAQ \(Fokus Fitur\)(\s*\n)+/, '');
  
  // Split the content by question numbers followed by a period and space
  const faqParts = contentWithoutHeader.split(/\n\s*\n(?=\d+\.\s)/);
  
  return faqParts.map((part, index) => {
    const trimmedPart = part.trim();
    if (trimmedPart) {
      // Extract the question and answer
      const lines = trimmedPart.split('\n');
      if (lines.length > 0) {
        // Extract the question by removing the number prefix
        const question = lines[0].replace(/^\d+\.\s*/, '').trim();
        
        // The answer is the rest of the content
        const answer = lines.slice(1).join('\n').trim();
        
        return { 
          id: `faq-${index + 1}`, 
          question, 
          answer 
        };
      }
    }
    return null;
  }).filter((faqItem): faqItem is FaqItem => faqItem !== null);
};