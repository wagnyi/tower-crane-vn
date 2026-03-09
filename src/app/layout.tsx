import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Tower Crane VN - Cần trục tháp cũ chất lượng cao',
    template: '%s | Tower Crane VN',
  },
  description:
    'Chuyên cung cấp cần trục tháp cũ giá tốt, chất lượng đảm bảo. Tower cranes for sale in Vietnam.',
  keywords: [
    'cần trục tháp',
    'tower crane',
    '塔吊',
    'cần trục cũ',
    'used tower crane',
    '二手塔吊',
    'máy xây dựng',
    'construction equipment',
    'Vietnam',
    'Việt Nam',
  ],
  authors: [{ name: 'Tower Crane VN' }],
  openGraph: {
    title: 'Tower Crane VN - High Quality Used Tower Cranes',
    description: 'Specializing in quality used tower cranes at competitive prices in Vietnam.',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
