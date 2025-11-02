// Theory content data for the TheorySection component
export const theoryContent = `FCFS (First-Come, First-Served)
**FCFS** adalah **algoritma penjadwalan CPU** yang paling sederhana. **Proses** yang datang pertama akan dilayani pertama, mirip dengan antrian di kehidupan nyata.
Kelebihan: Mudah dipahami dan diimplementasikan, tidak ada **starvation** karena semua **proses** akan mendapat giliran.
Kekurangan: **Waktu tunggu** rata-rata bisa sangat tinggi, terutama jika **proses panjang** datang lebih dulu (**convoy effect**).

Round Robin (RR)
**Round Robin** adalah **algoritma** yang membuat komputer Anda terasa bisa **multitasking**. Logikanya seperti sekelompok teman yang bermain game bergantian, di mana setiap orang mendapat jatah waktu yang sama, misalnya 5 menit. Dalam RR, setiap **proses** mendapat "jatah waktu" **CPU** yang disebut **Time Quantum**.
Jika **proses** selesai sebelum waktunya habis, Maka akan dilanjutkan **Proses** selanjutnya, namun jika waktunya habis tapi **proses** belum selesai, **proses** itu akan dihentikan sementara dan dipindah ke antrean paling belakang untuk menunggu giliran berikutnya.

Shortest-Job-First (SJF)
Logika **SJF** ini ibarat antrean di kasir yang punya kebijakan "Siapa yang belanjanya paling sedikit, boleh maju duluan."
**Algoritma** ini sangat efisien karena **CPU** akan selalu memilih dan mengerjakan tugas (**proses**) yang diperkirakan paling ringan atau paling cepat selesai. Hasilnya? **Waktu tunggu** rata-rata untuk semua **proses** menjadi sangat singkat, membuat keseluruhan sistem terasa cepat.`;

// Type definition for the theory sections
export interface Section {
  id: string;
  title: string;
  content: string;
}

// Function to parse the theory content into sections
export const parseTheoryContent = (): Section[] => {
  // Split content by algorithm sections
  const algorithms = theoryContent.split(/\n\n(?=[A-Z])/);
  
  return algorithms.map((algorithm, index) => {
    const lines = algorithm.split('\n');
    if (lines[0]) {
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      return { id: `item-${index + 1}`, title, content };
    }
    return null;
  }).filter((section): section is Section => section !== null);
};