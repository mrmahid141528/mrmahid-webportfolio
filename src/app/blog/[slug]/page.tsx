import { getPost, getPostsQuery } from "@/lib/sanity.queries";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { slug: string }
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = await client.fetch(getPostsQuery);

    // If no posts exist yet, Next.js static export will crash.
    // We return a dummy route so it builds successfully.
    if (!posts || posts.length === 0) {
        return [{ slug: 'placeholder-post' }];
    }

    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

// Generate dynamic metadata for SEO based on the blog post
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Md Mahid Raza Blog`,
        description: post.excerpt || `Read ${post.title} by Md Mahid Raza.`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.mainImage ? [post.mainImage] : [],
        },
    }
}


// Custom PortableText components for beautiful rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-[400px] my-10 rounded-2xl overflow-hidden border border-white/10">
                    {/* Sanity images come with hotspot data, but we'll use a simple img tag for now */}
                    <img
                        src={value.asset.url || value.asset._ref}
                        alt={value.alt || 'Blog Image'}
                        className="object-cover w-full h-full"
                    />
                </div>
            )
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bold mt-16 mb-6 text-white">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-4 text-white">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-4 text-white">{children}</h4>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-gray-300 text-xl">{children}</blockquote>,
        normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-300 text-lg">{children}</p>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300 text-lg">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300 text-lg">{children}</ol>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }: any) => <em className="italic text-gray-400">{children}</em>,
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a href={value.href} rel={rel} className="text-primary hover:text-accent underline underline-offset-4 transition-colors">
                    {children}
                </a>
            )
        },
    },
}


export default async function BlogPostPage({ params }: Props) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const postDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: post.mainImage ? [post.mainImage] : [],
        datePublished: post.publishedAt,
        author: {
            '@type': 'Person',
            name: post.authorName || 'Md Mahid Raza',
            url: 'https://www.mrmahid.com'
        }
    };

    return (
        <main className="flex flex-col min-h-screen pt-32 pb-24 bg-[#0F172A] relative overflow-hidden">
            {/* SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <article className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white mb-10 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to all posts
                </Link>

                {/* Header Section */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        {post.category && (
                            <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full text-primary bg-primary/10 border border-primary/20">
                                <Tag className="w-4 h-4" />
                                {post.category}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {postDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author Meta */}
                    <div className="flex items-center gap-4 border-t border-b border-white/10 py-6">
                        {post.authorImage ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                                <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
                                {post.authorName ? post.authorName[0] : 'M'}
                            </div>
                        )}
                        <div>
                            <p className="text-white font-medium">{post.authorName || 'Md Mahid Raza'}</p>
                            <p className="text-sm text-gray-400">Author & Web Designer</p>
                        </div>
                    </div>
                </header>

                {/* Main Hero Image */}
                {post.mainImage && (
                    <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-black/50">
                        <img
                            src={post.mainImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                    </div>
                )}

                {/* Portable Text Content (The robust blog body) */}
                <div className="prose prose-invert prose-lg max-w-none prose-a:text-primary hover:prose-a:text-accent prose-img:rounded-2xl">
                    <PortableText
                        value={post.body}
                        components={portableTextComponents}
                    />
                </div>

                {/* Footer Call to Action */}
                <div className="mt-24 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Want to apply these insights to your business?</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let&apos;s build a premium website that drives real results for your brand.</p>
                    <Link href="/contact" className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-accent hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                        Discuss Your Project
                    </Link>
                </div>
            </article>
        </main>
    );
}
