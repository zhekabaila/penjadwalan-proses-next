'use client'

import { useState } from 'react'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navItems = [
  { title: 'Home', href: '/#home' },
  { title: 'About', href: '/#about' },
  { title: 'Feature', href: '/#features' },
  { title: 'Demo', href: '/#demo' },
]

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - Visible on both mobile and desktop */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.webp" alt="TurboSched Logo" width={512} height={512} quality={100} loading='eager' className="h-6 w-6"/>
          <span className="font-bold text-xl text-white hidden sm:block">TurboSched</span>
          <span className="font-bold text-xl text-white sm:hidden">TurboSched</span>
        </Link>

        {/* Spacer to push navigation to the right */}
        <div className="flex-grow"></div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isExternalLink = !item.href.startsWith('/#');
            const handleClick = (e: React.MouseEvent) => {
              if (!isExternalLink && typeof window !== 'undefined') {
                e.preventDefault();
                const targetId = item.href.split('#')[1];
                if (targetId) {
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                    // Update URL hash without causing a page reload
                    window.history.pushState({}, '', item.href);
                  }
                }
              }
            };

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'text-white hover:text-emerald-500 hover:bg-white/10 px-4 py-2'
                )}>
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Navigation - Hidden on larger screens */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md text-white hover:bg-white/10 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-4/5 bg-black/20 backdrop-blur-md border-l border-white/10 p-0">
              <div className="flex flex-col h-full pt-8 pb-4 bg-transparent">
                <Link href="/" className="flex items-center space-x-2 px-4 mb-8" onClick={() => setIsOpen(false)}>
                  <Image src="/images/logo.webp" alt="TurboSched Logo" width={24} height={24} className="h-6 w-6"/>
                  <span className="font-bold text-xl text-white">TurboSched</span>
                </Link>
                <nav className="flex flex-col space-y-1 px-4">
                  {navItems.map((item) => {
                    const isExternalLink = !item.href.startsWith('/#');
                    const handleClick = (e: React.MouseEvent) => {
                      if (!isExternalLink && typeof window !== 'undefined') {
                        e.preventDefault();
                        const targetId = item.href.split('#')[1];
                        if (targetId) {
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            targetElement.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                            // Update URL hash without causing a page reload
                            window.history.pushState({}, '', item.href);
                          }
                        }
                      }
                      setIsOpen(false); // Close the mobile menu after click
                    };

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'text-white hover:text-emerald-500 hover:bg-white/10 justify-start px-4 py-3 text-lg rounded-lg'
                        )}
                        onClick={handleClick}>
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}