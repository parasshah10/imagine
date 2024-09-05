'use client'

import { ThemeProvider } from 'next-themes'
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative flex min-h-screen flex-col bg-neutral-50 dark:bg-amoled-black overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}