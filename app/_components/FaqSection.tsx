"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";
import { parseFaqContent } from "../(user)/_constants/faq-data";

// Helper function to process text with bold formatting
const processTextWithBold = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/g).map((segment, i) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      const content = segment.slice(2, -2);
      return <u key={i} className="text-emerald-400">{content}</u>;
    }
    return <span key={i}>{segment}</span>;
  });
};

export default function FaqSection() {
  const faqs = parseFaqContent();

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
        Pertanyaan yang Sering Diajukan
      </motion.h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
          >
            <AccordionItem value={faq.id} className="border border-emerald-500/30 rounded-xl bg-black/30 backdrop-blur-md overflow-hidden">
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-neutral-200">
                <span className="text-lg font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 border-t border-emerald-500/20 bg-black/20">
                <div className="space-y-3 text-white">
                  {faq.answer.split('\n\n').map((paragraph, idx) => {
                    // Check if paragraph contains list items
                    if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                      const lines = paragraph.split('\n');
                      return (
                        <div key={idx} className="space-y-2">
                          {lines.map((line, lineIdx) => {
                            if (line.trim().startsWith('- ')) {
                              return (
                                <div key={lineIdx} className="flex">
                                  <span className="text-emerald-400 min-w-[20px]">•</span>
                                  <span className="text-white pl-2">
                                    {processTextWithBold(line.substring(2))} {/* Remove "- " prefix and process bold text */}
                                  </span>
                                </div>
                              );
                            } else if (line.trim() !== '') {
                              return <p key={lineIdx} className="text-white mb-2">{processTextWithBold(line)}</p>;
                            }
                            return null;
                          })}
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-white">
                        {processTextWithBold(paragraph)}
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
