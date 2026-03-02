import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export function generateStaticParams() {
    // Allows the /studio page to be statically exported
    return [{ index: [] }]
}

export default function StudioPage() {
    return <NextStudio config={config} />
}
