import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://vietnamconstructionmachine.com'),
  title: {
    default: 'Tower Crane VN - Cần trục tháp cũ chất lượng cao | 二手塔吊销售',
    template: '%s | Tower Crane VN',
  },
  description:
    'Chuyên cung cấp cần trục tháp cũ giá tốt, chất lượng đảm bảo. Professional used tower crane supplier in Vietnam. 越南二手塔吊销售，质量保证，价格优惠。',
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
    'building crane',
    'potain',
    'liebherr',
    'construction machinery',
  ],
  authors: [{ name: 'Tower Crane VN' }],
  creator: 'Tower Crane VN',
  publisher: 'Tower Crane VN',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Tower Crane VN - High Quality Used Tower Cranes',
    description: 'Specializing in quality used tower cranes at competitive prices in Vietnam. 越南专业二手塔吊供应商。',
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: ['en_US', 'zh_CN'],
    url: 'https://vietnamconstructionmachine.com',
    siteName: 'Tower Crane VN',
    images: [
      {
        url: 'https://vietnamconstructionmachine.com/products/crane-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Tower Crane VN - Used Tower Cranes for Sale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tower Crane VN - Used Tower Cranes',
    description: 'Quality used tower cranes at competitive prices in Vietnam',
  },
  alternates: {
    canonical: 'https://vietnamconstructionmachine.com',
    languages: {
      'vi-VN': 'https://vietnamconstructionmachine.com',
      'en-US': 'https://vietnamconstructionmachine.com',
      'zh-CN': 'https://vietnamconstructionmachine.com',
    },
  },
  verification: {
    google: 'your-google-verification-code', // 替换为Google Search Console验证码
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <meta name="google-site-verification" content="QU2Q8mtbhzVj8zK-LyM0LDlvkalRm2kAUQdjBKjAieY" />
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
