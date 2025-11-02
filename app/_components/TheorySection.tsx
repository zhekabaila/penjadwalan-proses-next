"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { parseTheoryContent } from "../(user)/_constants/theory-data";

export default function TheorySection() {
  const sections = parseTheoryContent();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto py-24 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-bold text-center mb-8 text-white"
      >
        Teori Algoritma Penjadwalan
      </motion.h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
          >
            <AccordionItem value={section.id} className="border border-emerald-500/30 rounded-xl bg-black/30 backdrop-blur-md overflow-hidden">
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-neutral-200">
                <span className="text-lg font-semibold">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 border-t border-emerald-500/20 bg-black/20">
                <div className="space-y-3">
                  {section.content.split('\n\n').map((part, idx) => {
                    // Check if this part is a "Kelebihan" or "Kekurangan" section
                    if (part.startsWith('Kelebihan:') || part.startsWith('Kekurangan:')) {
                      const [label, ...rest] = part.split(':');
                      return (
                        <div key={idx} className="flex">
                          <span className="font-semibold text-emerald-400 min-w-[100px]">{label}:</span>
                          <span className="text-white pl-2">{rest.join(':')}</span>
                        </div>
                      );
                    }
                    
                    // For regular paragraphs
                    return (
                      <p key={idx} className="text-white">
                        {part.split(/(\*\*.*?\*\*)/g).map((segment, i) => {
                          if (segment.startsWith('**') && segment.endsWith('**')) {
                            const text = segment.slice(2, -2);
                            return <u key={i} className="text-emerald-400">{text}</u>;
                          }
                          return <span key={i}>{segment}</span>;
                        })}
                      </p>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
