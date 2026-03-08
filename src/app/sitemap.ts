import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { getPostsQuery } from '@/lib/sanity.queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.mrmahid.com';

    // Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/contact',
        '/privacy-policy',
        '/terms-and-conditions',
        '/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        // Dynamic Blog Post Routes
        const posts = await client.fetch(getPostsQuery);
        const dynamicRoutes = posts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.publishedAt || new Date()).toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        return [...staticRoutes, ...dynamicRoutes];
    } catch (error) {
        console.error("Error generating sitemap dynamic routes:", error);
        return staticRoutes;
    }
}
