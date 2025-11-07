import { DemoProcessTable } from './DemoProcessTable'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function DemoSection() {
  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Visualisasi Algoritma Penjadwalan Proses
        </h2>
        <Tabs defaultValue="fcfs" className="w-full max-w-4xl mx-auto ">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 h-auto bg-transparent border-emerald-500/30">
            <TabsTrigger value="fcfs" className="data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-green-500 data-[state=active]:text-green-500">First-Come, First-Served</TabsTrigger>
            <TabsTrigger value="sjf" className="data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-green-500 data-[state=active]:text-green-500">Shortest Job First</TabsTrigger>
            <TabsTrigger value="roundrobin" className="data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-green-500 data-[state=active]:text-green-500">Round Robin</TabsTrigger>
          </TabsList>
          <TabsContent value="fcfs">
            <div className="mt-6 bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 rounded-xl p-4">
              <DemoProcessTable algorithm="fcfs" />
            </div>
          </TabsContent>
          <TabsContent value="sjf">
            <div className="mt-6 bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 rounded-xl p-4">
              <DemoProcessTable algorithm="sjf" />
            </div>
          </TabsContent>
          <TabsContent value="roundrobin">
            <div className="mt-6 bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 rounded-xl p-4">
              <DemoProcessTable algorithm="roundrobin" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
