import { getCollection, type CollectionEntry } from 'astro:content'
import { EXPERIENCE_CONFIG, FEED_CONFIG } from '~/config'
import { formatDate } from '~/lib/utils'
import type { FeedItem } from '~/types'

// Sort posts by date (newest first)
export function postsSort<T extends CollectionEntry<'posts'> | CollectionEntry<'tutorials'>>(posts: T[]): T[] {
  return posts.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

// Get all non-draft posts, sorted by date
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft))
}

// Get all visible posts (non-draft and non-hidden)
export async function getVisiblePosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft && !post.data.hidden))
}

// Get all pinned posts
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getVisiblePosts()
  const pinnedPosts = allPosts.filter((post) => post.data.pinned)
  return postsSort(pinnedPosts)
}

// Get the latest N posts
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getVisiblePosts()
  return allPosts.slice(0, size)
}

// Get tags
export async function getAllTags(): Promise<Record<string, number>> {
  const allPosts = await getVisiblePosts()
  const tags = allPosts.flatMap((post) => post.data.tags || [])
  return tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

// Get projects
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getCollection('projects')
  return allProjects.filter((project) => !project.data.draft && !project.data.hidden)
}

// Get all visible tutorials
export async function getVisibleTutorials(): Promise<CollectionEntry<'tutorials'>[]> {
  const allTutorials = await getCollection('tutorials')
  const tutorials = allTutorials.filter((tutorial) => !tutorial.data.draft && !tutorial.data.hidden)
  return postsSort(tutorials)
}

// Pinned projects, sorted by ascending order
export async function getPinnedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter((project) => project.data.pinned).sort((a, b) => a.data.order - b.data.order)
}

// Parse YYYY-MM-DD in local time so a timezone shift can't push it into the previous month
function parseLocalDate(value: string): Date {
  return new Date(value.includes('T') ? value : `${value}T00:00:00`)
}

// Turn the configured work history into feed items
function getExperienceFeed(): FeedItem[] {
  if (!EXPERIENCE_CONFIG.ENABLED) return []

  return EXPERIENCE_CONFIG.ITEMS.map((item) => {
    const start = parseLocalDate(item.startDate)
    const end = item.endDate ? parseLocalDate(item.endDate) : undefined

    return {
      id: `experience:${item.id}`,
      type: 'experience' as const,
      title: item.role,
      subtitle: item.company,
      description: item.description,
      bullets: item.highlights,
      skills: item.skills,
      logo: item.logo,
      url: item.companyUrl || undefined,
      date: start,
      endDate: end,
      dateLabel: `${formatDate(start, 'month')} — ${end ? formatDate(end, 'month') : EXPERIENCE_CONFIG.PRESENT_TEXT}`,
    }
  })
}

// Home feed: projects + tutorials + posts + experience, newest first
export async function getVisibleFeed(): Promise<FeedItem[]> {
  const [projects, tutorials, posts] = await Promise.all([getAllProjects(), getVisibleTutorials(), getVisiblePosts()])

  const items: FeedItem[] = [
    ...projects.map((project) => ({
      id: `project:${project.id}`,
      type: 'project' as const,
      title: project.data.name,
      description: project.data.description,
      date: project.data.date,
      // The card itself only links out when there's a write-up to read; Website/GitHub
      // become their own buttons so all three can coexist without nesting anchors.
      url: project.data.hasDetail ? `/projects/${project.id}` : undefined,
      icon: project.data.icon,
      thumbnail: project.data.thumbnail,
      skills: project.data.stack,
      website: project.data.website,
      githubUrls: project.data.githubUrls,
    })),
    ...tutorials.map((tutorial) => ({
      id: `tutorial:${tutorial.id}`,
      type: 'tutorial' as const,
      title: tutorial.data.title,
      description: tutorial.data.description,
      date: tutorial.data.updatedDate ?? tutorial.data.pubDate,
      url: `/tutorials/${tutorial.id}`,
      cover: tutorial.data.cover,
    })),
    ...posts.map((post) => ({
      id: `blog:${post.id}`,
      type: 'blog' as const,
      title: post.data.title,
      description: post.data.description,
      date: post.data.updatedDate ?? post.data.pubDate,
      url: `/posts/${post.id}`,
      cover: post.data.cover,
    })),
    ...getExperienceFeed(),
  ]

  // Undated items (projects) sink to the bottom
  items.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))

  // Flag the hand-picked items; `order` drives their sequence under the Featured tab
  const featuredOrder = new Map(FEED_CONFIG.FEATURED.map((id, index) => [id, index]))
  for (const item of items) {
    const order = featuredOrder.get(item.id)
    if (order === undefined) continue
    item.featured = true
    item.order = order
  }

  // A typo would silently vanish, so surface it at build time
  const missing = FEED_CONFIG.FEATURED.filter((id) => !items.some((item) => item.id === id))
  if (missing.length > 0) {
    console.warn(`[feed] FEATURED id not found: ${missing.join(', ')}`)
  }

  return items
}
