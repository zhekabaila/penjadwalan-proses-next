"use client";

import { motion } from "motion/react";
import { ArrowLeft, AlertCircle, Cpu } from "lucide-react";
import { GlassButton } from "../../components/ui/glass-button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export function NotFoundContent() {
  const [cpuCores, setCpuCores] = useState<number>(0);
  const [memory, setMemory] = useState<string>("0 MB");
  const [processes, setProcesses] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState<number>(0);

  useEffect(() => {
    if (navigator.hardwareConcurrency) {
      setCpuCores(navigator.hardwareConcurrency);
    }

    const updateMemory = () => {
      if ('memory' in performance && (performance as any).memory) {
        const memoryInfo = (performance as any).memory;
        const usedMemoryMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
        setMemory(`${usedMemoryMB} MB`);
      } else {
        const simulatedMemory = Math.floor(Math.random() * 100) + 150;
        setMemory(`${simulatedMemory} MB`);
      }
    };

    const updateProcesses = () => {
      const baseProcesses = 35;
      const variation = Math.floor(Math.random() * 15);
      setProcesses(baseProcesses + variation);
    };

    const updateCpuUsage = () => {
      const usage = Math.floor(Math.random() * 40) + 30;
      setCpuUsage(usage);
    };

    updateMemory();
    updateProcesses();
    updateCpuUsage();

    const interval = setInterval(() => {
      updateMemory();
      updateProcesses();
      updateCpuUsage();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-lg mx-auto text-center relative z-10 px-2">
        <Card className="relative overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-3xl p-3 sm:p-4 md:p-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block mb-1"
            >
              <div className="relative">
                <Cpu className="w-10 h-10 sm:w-16 sm:h-16 text-emerald-500 mx-auto" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-white mb-2 sm:mb-4 text-2xl sm:text-4xl font-bold">
                <span>404</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                <AlertCircle className="w-3 h-3 sm:w-5 sm:h-5 text-emerald-400" />
                <h2 className="text-white text-xs sm:text-base">Proses Tidak Ditemukan</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-300 mb-1 sm:mb-2 text-sm sm:text-sm max-w-md mx-auto">
                Halaman yang Anda cari telah di-terminated atau tidak ada dalam antrian sistem. 
                Mungkin halaman tersebut sedang mengalami deadlock atau sudah selesai dieksekusi.
              </p>
              <p className="text-gray-400 text-xs sm:text-xs mb-2 sm:mb-4">
                Error Code: <span className="text-emerald-400 font-mono">PAGE_NOT_IN_QUEUE</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-4"
            >
              <div className="text-center flex-shrink-0">
                <div className="text-[0.6rem] sm:text-sm text-gray-400 mb-0.5 sm:mb-1">CPU Cores</div>
                <div className="flex items-center justify-center gap-1">
                  <motion.div
                    animate={{
                      backgroundColor: ["#10b981", "#059669", "#10b981"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="w-1.5 h-1.5 rounded-full"
                  />
                  <span className="text-emerald-400 text-[0.6rem] sm:text-sm font-mono">
                    {cpuCores > 0 ? cpuCores : "N/A"}
                  </span>
                </div>
              </div>
              
              <div className="w-px h-4 sm:h-8 bg-emerald-500/20 hidden sm:block"></div>
              <div className="h-px w-6 sm:hidden bg-emerald-500/20"></div>

              <div className="text-center flex-shrink-0">
                <div className="text-[0.6rem] sm:text-sm text-gray-400 mb-0.5 sm:mb-1">CPU Usage</div>
                <motion.div 
                  key={cpuUsage}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-[0.6rem] sm:text-sm font-mono"
                >
                  {cpuUsage}%
                </motion.div>
              </div>

              <div className="w-px h-4 sm:h-8 bg-emerald-500/20 hidden sm:block"></div>
              <div className="h-px w-6 sm:hidden bg-emerald-500/20"></div>
              
              <div className="text-center flex-shrink-0">
                <div className="text-[0.6rem] sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Memory</div>
                <motion.div 
                  key={memory}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-[0.6rem] sm:text-sm font-mono"
                >
                  {memory}
                </motion.div>
              </div>

              <div className="w-px h-4 sm:h-8 bg-emerald-500/20 hidden sm:block"></div>
              <div className="h-px w-6 sm:hidden bg-emerald-500/20"></div>
              
              <div className="text-center flex-shrink-0">
                <div className="text-[0.6rem] sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Processes</div>
                <motion.div 
                  key={processes}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-[0.6rem] sm:text-sm font-mono"
                >
                  {processes}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
              <span className="text-emerald-400 text-[0.6rem] sm:text-xs">Live System Stats</span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full max-w-xs mx-auto"
            >
              <GlassButton 
                onClick={handleGoHome} 
                className="justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Proses</span>
              </GlassButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 pt-2 border-t border-emerald-500/20"
            >
              <div className="text-xs text-gray-400 mb-3">Ready Queue:</div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="w-10 h-10 border border-emerald-500/30 bg-emerald-500/10 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-emerald-400 text-xs font-mono">P{index + 1}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ delay: 1.3 }}
                  className="w-10 h-10 border-2 border-dashed border-red-500/30 bg-red-500/5 rounded-lg flex items-center justify-center"
                >
                  <span className="text-red-400 text-xs font-mono">×</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
