"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Home, Cpu, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Scheduler", href: "/scheduler", icon: Cpu },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - Visible on both mobile and desktop */}
        <Link href="/" className="flex items-center space-x-2">
          <Cpu className="h-6 w-6 text-emerald-500" />
          <span className="font-bold text-xl text-white hidden sm:block">CPU Scheduler</span>
          <span className="font-bold text-xl text-white sm:hidden">Scheduler</span>
        </Link>

        {/* Spacer to push navigation to the right */}
        <div className="flex-grow"></div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-white hover:text-emerald-500 hover:bg-white/10 px-4 py-2 flex items-center"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
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
            <SheetContent 
              side="right" 
              className="w-full sm:w-4/5 bg-black/20 backdrop-blur-md border-l border-white/10 p-0"
            >
              <div className="flex flex-col h-full pt-8 pb-4 bg-transparent">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 px-4 mb-8" 
                  onClick={() => setIsOpen(false)}
                >
                  <Cpu className="h-6 w-6 text-emerald-500" />
                  <span className="font-bold text-xl text-white">CPU Scheduler</span>
                </Link>
                <nav className="flex flex-col space-y-1 px-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "text-white hover:text-emerald-500 hover:bg-white/10 justify-start px-4 py-3 text-lg rounded-lg flex items-center"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
