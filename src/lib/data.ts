import { getCollection, type CollectionEntry } from 'astro:content'

// 文章按时间排序
export function postsSort<T extends CollectionEntry<'posts'> | CollectionEntry<'tutorials'>>(posts: T[]): T[] {
  return posts.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

// 获取所有非草稿文章，按时间排序
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft))
}

// 获取所有可见文章（非草稿且非隐藏）
export async function getVisiblePosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft && !post.data.hidden))
}

// 获取所有置顶文章
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getVisiblePosts()
  const pinnedPosts = allPosts.filter((post) => post.data.pinned)
  return postsSort(pinnedPosts)
}

// 获取最新的固定数量的文章
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getVisiblePosts()
  return allPosts.slice(0, size)
}

// 获取标签
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

// 获取project
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getCollection('projects')
  return allProjects.filter((project) => !project.data.draft && !project.data.hidden)
}

// 获取所有可见教程
export async function getVisibleTutorials(): Promise<CollectionEntry<'tutorials'>[]> {
  const allTutorials = await getCollection('tutorials')
  const tutorials = allTutorials.filter((tutorial) => !tutorial.data.draft && !tutorial.data.hidden)
  return postsSort(tutorials)
}
