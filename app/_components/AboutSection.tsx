"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import {
  BarChart3,    // Icon untuk Gantt Chart
  GitCompareArrows, // Icon untuk Perbandingan
  CheckCircle,    // Icon untuk Validasi
  Lightbulb,      // Icon untuk Filosofi
} from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
      title: "Pemahaman Gantt Chart",
      description: "Daripada menggambarnya baris demi baris, Anda bisa langsung melihat bagaimana Gantt Chart terbentuk secara dinamis dan memahami 'convoy effect' pada FCFS secara visual.",
    },
    {
      icon: <GitCompareArrows className="h-8 w-8 text-emerald-500" />,
      title: "Perbandingan Algoritma",
      description: "Masukkan satu set proses, lalu jalankan di FCFS, SJF, dan RR. Web ini memungkinkan Anda membandingkan hasil *waiting time* rata-rata secara berdampingan.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-500" />,
      title: "Validasi & Pengecekan Mandiri",
      description: "Gunakan simulator ini sebagai 'kunci jawaban' terpercaya untuk tugas Anda. Jika perhitungan Anda berbeda, Anda bisa melacak kembali langkah demi langkah.",
    }
  ];

  return (
    <section id="about" className="w-full py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* === BAGIAN JUDUL UTAMA === */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
          >
            Mengubah Teori Abstrak Menjadi Pemahaman Konkret
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Pernah menatap soal penjadwalan CPU dan bingung mulai dari mana? 
            Proyek ini ada untuk menjembatani teori dan pemahaman praktis Anda.
          </motion.p>
        </div>

        {/* === BAGIAN 3 PILAR PEMAHAMAN (Grid of Cards) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 overflow-hidden group h-full">
                <CardHeader className="items-center text-center">
                  <div className="bg-emerald-500/10 p-3 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-300 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* === BAGIAN FILOSOFI (Styling disesuaikan dengan tema konsisten) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-black/30 backdrop-blur-md border border-emerald-500/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Lightbulb className="h-16 w-16 md:h-16 md:w-16 text-emerald-500" />
            <div>
              <h3 className="font-semibold text-white text-lg mb-2">Filosofi Proyek Ini</h3>
              <p className="text-gray-300">
                Kami percaya cara terbaik untuk mempelajari konsep teknis adalah 
                dengan <strong className="text-emerald-400">&quot;melakukannya&quot;</strong> dan <strong className="text-emerald-400">&quot;melihatnya&quot;</strong>. Tujuan kami 
                bukan agar Anda melihat jawaban akhir, tapi agar Anda 
                memahami <em className="text-emerald-400">mengapa</em> itulah jawabannya.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}