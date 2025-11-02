"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, BarChart3, Calendar, Monitor } from "lucide-react";
import { motion } from "motion/react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-emerald-500" />,
      title: "Fitur Website Lengkap",
      description: "Antarmuka pengguna yang intuitif dan responsif untuk memahami konsep manajemen proses CPU."
    },
    {
      icon: <Cpu className="h-8 w-8 text-emerald-500" />,
      title: "Visualisasi Manajemen Proses",
      description: "Simulasi interaktif yang menunjukkan bagaimana proses dikelola dan dijalankan pada CPU secara real-time."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
      title: "Gantt Chart",
      description: "Representasi grafis dari jadwal proses yang menunjukkan kapan setiap proses berjalan dalam waktu."
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-500" />,
      title: "Analisis Waktu Proses",
      description: "Visualisasi waktu tunggu, waktu gilir, dan metrik kinerja lainnya untuk setiap algoritma penjadwalan."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fitur-Fitur Utama</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Eksplorasi berbagai aspek manajemen proses CPU melalui visualisasi interaktif dan alat analisis canggih
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <Card 
                className="bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 overflow-hidden group h-full"
              >
                <CardHeader className="items-center">
                  <div className="bg-emerald-500/10 p-3 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-300 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-center">{feature.title}</CardTitle>
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
      </div>
    </section>
  );
}
