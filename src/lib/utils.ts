import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

// Sort posts by date (newest first)
export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return posts.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

// Date format type
export type DateFormat = 'default' | 'dot' | 'short' | 'iso' | 'feed' | 'month'

// Date formatting function
export const formatDate = (date: Date, format: DateFormat = 'default'): string => {
  switch (format) {
    case 'dot':
      // 2020.03.03 format
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}.${month}.${day}`

    case 'short':
      // Mar 3, 2020 format
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

    case 'feed':
      // Mar 3, 20 format (feed cards)
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      })

    case 'month':
      // Mar 2020 format (work history)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })

    case 'iso':
      // 2020-03-03 format
      return date.toISOString().split('T')[0]

    case 'default':
    default:
      // March 3, 2020 format (default)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
  }
}
