import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

/**
 * دالة مساعدة لإنشاء SEO Metadata مخصصة لأي صفحة في المشروع
 */
export function constructMetadata({
  title = 'FleetTrack — نظام إدارة الأسطول وتتبع المركبات',
  description = 'نظام إلكتروني احترافي لإدارة الأسطول ومتابعة السائقين وتتبع المركبات بشكل حي ومباشر.',
  image = '/icons/og-image.png',
  canonical = '/',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      'تتبع المركبات',
      'تطبيق السائق',
      'إدارة الأسطول',
      'تتبع GPS',
      'البث اللحظي للرحلات',
      'Fleet Management',
      'Driver Tracking App',
      'PWA Tracking',
    ],
    authors: [{ name: 'FleetTrack Team' }],
    creator: 'FleetTrack',
    publisher: 'FleetTrack',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'FleetTrack',
      locale: 'ar_EG',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Metadata جاهزة مخصصة لصفحة تتبع السائق
 */
export const trackingPageMetadata = constructMetadata({
  title: 'تطبيق السائق — تتبع المركبات والبث اللحظي | FleetTrack',
  description:
    'تطبيق محاكاة السائق لتتبع الموقع اللحظي للمركبات عبر الـ GPS ورصد حركة الأسطول وبث الإحداثيات مباشرة مع دعم الـ PWA.',
  canonical: '/tracking',
});