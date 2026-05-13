import { MetadataRoute } from 'next'
import { COUNTRIES } from '@/lib/countries'
import { WORLD_UNIS } from '@/lib/globalUnis'
import { GLOBAL_SCALES } from '@/lib/globalScales'
import { UNIS } from '@/lib/unis'
import { getSortedPostsData } from '@/lib/posts'

const BASE = 'https://surviveuni.online'
const now = new Date()

const TOOL_SLUGS = [
  'gpa-calculator', 
  'cgpa-calculator', 
  'attendance-tracker', 
  'merit-calculator', 
  'deadlines', 
  'scholarships'
]

export default function sitemap(): MetadataRoute.Sitemap {

  // ── Static pages ──────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: now, changeFrequency: 'weekly' as const,  priority: 1.0 },
    { url: `${BASE}/about`,              lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/contact`,            lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE}/privacy-policy`,     lastModified: now, changeFrequency: 'yearly' as const,  priority: 0.3 },
    { url: `${BASE}/guides`,             lastModified: now, changeFrequency: 'weekly' as const,  priority: 0.8 },
    { url: `${BASE}/scholarships`,       lastModified: now, changeFrequency: 'weekly' as const,  priority: 0.9 },
    { url: `${BASE}/deadlines`,          lastModified: now, changeFrequency: 'weekly' as const,  priority: 0.9 },
    
    // Generic tool indexes
    { url: `${BASE}/tools/gpa-calculator`,        lastModified: now, changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${BASE}/tools/cgpa-calculator`,       lastModified: now, changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${BASE}/tools/aggregate-calculator`,  lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
    { url: `${BASE}/tools/attendance-tracker`,    lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
    { url: `${BASE}/tools/safe-bunk`,             lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE}/tools/compare`,               lastModified: now, changeFrequency: 'monthly' as const, priority: 0.80 },
    { url: `${BASE}/tools/pass-predictor`,        lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE}/tools/cgpa-to-percentage`,    lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
    { url: `${BASE}/tools/marks-to-gpa`,          lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE}/tools/ibcc-calculator`,       lastModified: now, changeFrequency: 'monthly' as const, priority: 0.80 },
    
    // Global GPA index
    { url: `${BASE}/global/gpa-calculator`,       lastModified: now, changeFrequency: 'monthly' as const, priority: 0.95 },
  ]

  // ── Country hub & sub-pages ───────────────────────────────────
  const countryRoutes: MetadataRoute.Sitemap = COUNTRIES.flatMap(c => [
    { url: `${BASE}/${c.id}`,              lastModified: now, changeFrequency: 'weekly' as const,  priority: 0.97 },
    { url: `${BASE}/${c.id}/scholarships`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
    { url: `${BASE}/${c.id}/deadlines`,    lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
  ])

  // ── University Pages & Tools (Global + Pakistan) ──────────────
  const allUnis = [
    ...WORLD_UNIS.map(u => ({ id: u.id, country: u.country })),
    ...UNIS.map(u => ({ id: u.id, country: 'pakistan' }))
  ]

  const uniRoutes: MetadataRoute.Sitemap = allUnis.flatMap(uni => [
    // Main university page
    { url: `${BASE}/${uni.country}/${uni.id}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.95 },
    // Specific tool pages for each university
    ...TOOL_SLUGS.map(tool => ({
      url: `${BASE}/${uni.country}/${uni.id}/${tool}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.97,
    })),
  ])

  // ── Global grading scale pages ────────────────────────────────
  const globalScaleRoutes: MetadataRoute.Sitemap = GLOBAL_SCALES.flatMap(scale => [
    { url: `${BASE}/global/gpa-calculator/${scale.id}`,  lastModified: now, changeFrequency: 'monthly' as const, priority: 0.93 },
    { url: `${BASE}/${scale.id}-gpa-calculator`,         lastModified: now, changeFrequency: 'monthly' as const, priority: 0.90 },
  ])

  // ── Blog posts from content/guides ────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = getSortedPostsData()
    blogRoutes = posts.map(post => ({
      url: `${BASE}/guides/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.80,
    }))
  } catch (err) {
    console.error("Sitemap generation error for guides:", err)
  }

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...uniRoutes,
    ...globalScaleRoutes,
    ...blogRoutes,
  ]
}
