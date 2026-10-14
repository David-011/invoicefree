import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://invoicefree-five.vercel.app',
      lastModified: '2026-10-14',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://invoicefree-five.vercel.app/privacy',
      lastModified: '2026-10-14',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://invoicefree-five.vercel.app/terms',
      lastModified: '2026-10-14',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
