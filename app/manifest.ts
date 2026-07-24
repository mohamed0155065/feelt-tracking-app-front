import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FleetTrack - إدارة الأسطول وتتبع السائقين',
    short_name: 'FleetTrack',
    description: 'نظام إلكتروني احترافي لإدارة الأسطول ومتابعة السائقين وتتبع المركبات بشكل حي ومباشر.',
    start_url: '/tracking',
    display: 'standalone',
    background_color: '#0C1426',
    theme_color: '#0C1426',
    orientation: 'portrait',
    dir: 'rtl',
    lang: 'ar',
    icons: [
      {
        src: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}