"use client";
import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 w-full">
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex flex-col items-center md:items-start space-y-2">
              <span className="font-bold text-xl text-white">CPU Scheduler</span>
              <p className="text-gray-400 text-sm max-w-xs">
                Visualisasikan dan pahami berbagai algoritma penjadwalan CPU yang digunakan dalam sistem operasi
              </p>
            </Link>
          </div>

          {/* GitHub Link */}
          <div>
            <Link 
              href="https://github.com/zhekabaila/penjadwalan-proses-next/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
            >
              <Github className="h-5 w-5 mr-2" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CPU Scheduler Visualization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
