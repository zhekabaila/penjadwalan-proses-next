'use client'

import { DemoProcessTable } from './DemoProcessTable'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { motion } from 'motion/react'

export default function DemoSection() {
  const tabs = [
    { value: 'fcfs', label: 'First-Come, First-Served' },
    { value: 'sjf', label: 'Shortest Job First' },
    { value: 'roundrobin', label: 'Round Robin' },
  ]

  return (
    <motion.section
      id="demo"
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Visualisasi Algoritma Penjadwalan Proses
          </h2>
          <p className="mt-4 text-base text-gray-300 md:text-lg">
            Eksplorasi interaktif hasil simulasi TurboSched untuk berbagai strategi antrian proses.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="fcfs" className="mx-auto mt-12 w-full max-w-5xl">
            <div className="relative -mx-4 overflow-x-auto pb-4 md:mx-0 p-2 sm:p-0">
              <TabsList className="grid h-auto w-full min-w-max grid-cols-1 gap-3 rounded-xl border border-emerald-500/30 bg-black/20 p-1 backdrop-blur-sm sm:auto-cols-fr sm:grid-flow-col sm:p-2">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className="flex w-full items-start gap-2 rounded-lg border border-transparent bg-transparent px-4 py-3 text-left text-sm font-semibold text-gray-300 transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-950/40 hover:text-white data-[state=active]:border-emerald-500/50 data-[state=active]:bg-emerald-950/60 data-[state=active]:shadow-sm data-[state=active]:text-emerald-400"
                  >
                    <span className="text-base font-semibold">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value="fcfs" className="mt-8 border-none bg-transparent p-0 shadow-none backdrop-blur-0">
              <DemoProcessTable algorithm="fcfs" />
            </TabsContent>
            <TabsContent value="sjf" className="mt-8 border-none bg-transparent p-0 shadow-none backdrop-blur-0">
              <DemoProcessTable algorithm="sjf" />
            </TabsContent>
            <TabsContent value="roundrobin" className="mt-8 border-none bg-transparent p-0 shadow-none backdrop-blur-0">
              <DemoProcessTable algorithm="roundrobin" />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.section>
  )
}
