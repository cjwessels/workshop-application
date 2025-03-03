import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from '@/components/main-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Management System',
  description: 'Manage job cards, quotes, and invoices efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav />
          </div>
        </div>
        <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
      </body>
    </html>
  );
}