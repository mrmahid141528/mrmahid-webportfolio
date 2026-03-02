import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // `false` if you want to ensure fresh data always
})

// Helper to generate image URLs from Sanity image assets
const builder = createImageUrlBuilder({ projectId, dataset })
export const urlFor = (source: any) => builder.image(source)
