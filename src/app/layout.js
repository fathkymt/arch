// src/app/layout.js
import localFont from 'next/font/local';
import ClientLayout from '../components/layout/ClientLayout';
import './globals.css';

const questrial = localFont({
  src: '../../public/fonts/Questrial-Regular.ttf',
  variable: '--font-questrial',
});

export const metadata = {
  title: 'ES+Partners | Mimarlık',
  description: 'Modern tasarımla geleneksel ahşap dokunuşunu birleştiren mimarlık ofisi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${questrial.variable}`}>
      <body suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}