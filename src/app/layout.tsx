import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arsena Luciendra - Full Stack Developer & Cloud Builder',
  description: 'Personal portfolio of Arsena Luciendra, a 17-year-old full stack developer and cloud builder from Indonesia. Building SenaCloud.',
  keywords: ['developer', 'cloud', 'portfolio', 'senacloud', 'arsena'],
  authors: [{ name: 'Arsena Luciendra' }],
  openGraph: {
    title: 'Arsena Luciendra - Full Stack Developer & Cloud Builder',
    description: 'Personal portfolio of Arsena Luciendra',
    url: 'https://sena.manus.space',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Arsenadev/dat3/main/uploads/62f7c7-1780923571052.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://raw.githubusercontent.com/Arsenadev/dat3/main/uploads/62f7c7-1780923571052.jpg" />
      </head>
      <body>
        <Suspense fallback={<div className="bg-primary min-h-screen" />}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
