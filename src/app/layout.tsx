import type { Metadata } from 'next';
import { Providers } from './providers';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Miss TNA Software & Strategy LLC - Consultoría Profesional de Trading',
  description: 'Plataforma de trading profesional con $50M+ AUM. Consultoría especializada, análisis de algoritmos, gestión de riesgo y soporte técnico para instituciones y traders profesionales.',
  keywords: 'trading, bots, consultoría, análisis, algoritmos, gestión de portafolios',
  openGraph: {
    title: 'Miss TNA Software & Strategy LLC',
    description: 'Consultoría profesional de trading con tecnología avanzada',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
