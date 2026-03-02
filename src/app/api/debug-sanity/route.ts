import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const rawPosts = await client.fetch(`*[_type == "post"]`, undefined, { next: { revalidate: 0 } });
        return NextResponse.json({
            count: rawPosts.length,
            posts: rawPosts
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
