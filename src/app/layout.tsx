'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';
import { FavoritesProvider } from '@/context/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${inter.className} max- dark:bg-gray-900 dark:text-gray-400`}
      >
        <SessionProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
            <Footer />
          </FavoritesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
