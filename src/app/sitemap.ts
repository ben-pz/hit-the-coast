import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routes } from '@/data/routes';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/routes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/newsletter`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/submit-event`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const routePages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}/routes/${route.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/stories/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...routePages, ...articlePages];
}
