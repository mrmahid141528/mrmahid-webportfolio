import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import { getPosts } from '@/lib/sanity.queries';
import BlogCardWrapper from './BlogCardWrapper'; // We will create this client component for animations
import Link from 'next/link';

const categoryColors: Record<string, string> = {
    Business: 'text-primary bg-primary/10',
    Design: 'text-accent bg-accent/10',
    'Case Study': 'text-secondary bg-secondary/10',
};

// Fallback gradients based on index
const gradients = [
    'from-primary to-accent',
    'from-accent to-secondary',
    'from-secondary to-primary',
];

export default async function BlogSection() {
    // 1. Fetch posts from Sanity (happens on the server)
    const posts = await getPosts();

    return (
        <section id="blog" className="relative py-32 bg-[#0F172A] z-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Header - Handled by client wrapper for animation */}
                <BlogCardWrapper type="header">
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Blog</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Thoughts &{' '}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Insights
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg mx-auto">
                        Tips on web design, digital growth, and how to help local businesses win online.
                    </p>
                </BlogCardWrapper>

                {/* Blog Cards Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any, index: number) => {
                            const postDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                            });

                            return (
                                <BlogCardWrapper key={post._id} type="card" index={index}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col cursor-hover hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-500 hover:-translate-y-2 h-full"
                                    >
                                        {/* Top Gradient Bar */}
                                        <div className={`h-1 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {/* Optional Image Area */}
                                        {post.mainImage && (
                                            <div className="h-48 w-full overflow-hidden border-b border-white/10">
                                                <img
                                                    src={post.mainImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            {/* Meta */}
                                            <div className="flex items-center justify-between mb-5">
                                                <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${post.category ? categoryColors[post.category] || categoryColors['Business'] : categoryColors['Business']}`}>
                                                    <Tag className="w-3 h-3" />
                                                    {post.category || 'Article'}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                                {post.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                                                <span className="text-xs text-gray-500">{postDate}</span>
                                                <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-white transition-colors">
                                                    Read More
                                                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </BlogCardWrapper>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State if no posts are found
                    <div className="text-center py-20 border border-white/10 rounded-2xl glass-panel bg-white/5">
                        <Tag className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No posts yet</h3>
                        <p className="text-gray-400">Content is being crafted in the Sanity Studio. Stay tuned!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
