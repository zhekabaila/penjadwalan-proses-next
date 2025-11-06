import { DemoProcessTable } from './DemoProcessTable'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function DemoSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Visualisasi Algoritma Penjadwalan Proses
        </h2>
        <Tabs defaultValue="fcfs" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="fcfs">First-Come, First-Served</TabsTrigger>
            <TabsTrigger value="sjf">Shortest Job First</TabsTrigger>
            <TabsTrigger value="priority">Priority</TabsTrigger>
            <TabsTrigger value="roundrobin">Round Robin</TabsTrigger>
          </TabsList>
          <TabsContent value="fcfs">
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-white">
              <DemoProcessTable algorithm="fcfs" />
            </div>
          </TabsContent>
          <TabsContent value="sjf">
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-white">
              <DemoProcessTable algorithm="sjf" />
            </div>
          </TabsContent>
          <TabsContent value="priority">
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-white">
              <DemoProcessTable algorithm="priority" />
            </div>
          </TabsContent>
          <TabsContent value="roundrobin">
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-white">
              <DemoProcessTable algorithm="roundrobin" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
