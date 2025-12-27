import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Hanan Nasir | ML Engineer & Data Scientist',
  description: 'Machine Learning Engineer portfolio showcasing ML projects, algorithms, and data science expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f]">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}