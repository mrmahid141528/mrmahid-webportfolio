import { groq } from 'next-sanity'
import { client } from './sanity'

// Query to get all blog posts for the cards
export const getPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": categories[0]->title,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "authorName": author->name
  }
`

// Query to get a single post full details
export const getSinglePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "authorBio": author->bio,
    "category": categories[0]->title
  }
`

// Fetch functions
export async function getPosts() {
  return client.fetch(getPostsQuery, {}, { next: { revalidate: 0 } })
}

export async function getPost(slug: string) {
  return client.fetch(getSinglePostQuery, { slug }, { next: { revalidate: 0 } })
}
