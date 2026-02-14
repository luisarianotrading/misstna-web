import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'MissTNA Trading - Dashboard Profesional',
    description: 'Método educativo exclusivo para trading con bots automatizados. Acceso al dashboard en tiempo real de ETFs, SPY y Stocks.',
    keywords: ['trading', 'bots', 'dashboard', 'análisis técnico', 'algoritmos'],
    authors: [{ name: 'Luisa Riaño', url: 'https://misstna.app' }],
    openGraph: {
        title: 'MissTNA - Trading Profesional',
        description: 'Plataforma educativa de trading con bots automatizados',
        url: 'https://misstna.vercel.app',
        siteName: 'MissTNA',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
