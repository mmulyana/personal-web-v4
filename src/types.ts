import type { ImageMetadata } from 'astro'

/**
 * Site basic information type
 * @description Contains site title and description
 * @property {string} title - Site title
 * @property {string} base - Site base path
 * @property {string} description - Site description
 * @property {string} author - Author name
 * @property {string} website - Website address
 * @property {string} ogImage - OGP image address
 * @property {boolean} transition - Whether to enable transition animation
 */
export type Site = {
  title: string
  base: string
  description: string
  lang: string
  author: string
  website: string
  ogImage: string
  transition: boolean
}

/**
 * Cover image layout type
 * @description Possible values: 'left' and 'right'
 */
export type CoverLayout = 'left' | 'right'

/**
 * PostCardType
 * @description Possible values: 'compact', 'image' and 'timeLine'
 */
export type PostCardType = 'compact' | 'image' | 'time-line' | 'minimal' | 'cover'

/**
 * Post card page configuration interface
 * @description Used to configure how post cards are displayed on pages
 * @property {PostCardType} type - Card display type
 * @property {number} size - Number of items per page
 * @property {CoverLayout} coverLayout - Cover image layout position
 */
export interface PostCardPageConfig {
  type: PostCardType
  size: number
  coverLayout?: CoverLayout
}

export type PostType = 'metaOnly' | 'coverSplit' | 'coverTop'

/**
 * Post configuration interface
 * @description Used to configure global settings for blog posts
 * @property {string} title - Post title
 * @property {string} description - Post description
 * @property {string} introduce - Post introduce
 * @property {string} author - Author name
 * @property {PostCardPageConfig} homePageConfig - Home page posts display configuration
 * @property {PostCardPageConfig} postPageConfig - Posts list page display configuration
 * @property {PostCardPageConfig} tagsPageConfig - Post display configuration for tags page
 * @property {boolean} ogImageUseCover - Whether to use the article cover image as the OGP image
 * @property {boolean} imageDarkenInDark - Whether to darken images in dark mode
 * @property {string} readMoreText - "Read more" button text
 * @property {string} prevPageText - Previous page button text
 * @property {string} nextPageText - Next page button text
 * @property {string} tocText - Table of contents text
 * @property {string} backToPostsText - Back to posts list button text
 * @property {string} nextPostText - Next post button text
 * @property {string} prevPostText - Previous post button text
 */
export interface PostConfig {
  title: string
  description: string
  introduce: string
  author: string
  homePageConfig: PostCardPageConfig
  postPageConfig: PostCardPageConfig
  tagsPageConfig: PostCardPageConfig
  postType: PostType
  ogImageUseCover: boolean
  imageDarkenInDark: boolean
  readMoreText: string
  prevPageText: string
  nextPageText: string
  tocText: string
  backToPostsText: string
  nextPostText: string
  prevPostText: string
  recommendText: string
  wordCountView: boolean
}

/**
 * Tags configuration interface
 * @property {string} title - Tags page title
 * @property {string} description - Tags page description
 * @property {string} introduce - Tags page introduce
 */
export interface TagsConfig {
  title: string
  description: string
  introduce: string
}

export interface Skill {
  icon: string
  name: string
  url?: string
}

export interface SkillData {
  direction: 'left' | 'right'
  skills: Skill[]
}

/**
 * SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - Skills showcase data
 * @property {string} SKILLS_DATA.direction - Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - Skills icon
 * @property {string} SKILLS_DATA.skills.name - Skills name
 */
export interface SkillsShowcaseConfig {
  SKILLS_ENABLED: boolean
  SKILLS_DATA: SkillData[]
}

/**
 * GitHub configuration type
 * @property {boolean} ENABLED - Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GitHub username
 * @property {boolean} TOOLTIP_ENABLED - Whether to enable Github Tooltip features
 */
export type GithubConfig = {
  ENABLED: boolean
  GITHUB_USERNAME: string
  TOOLTIP_ENABLED: boolean
}

/**
 * Link type
 * @property {string} name - Link display name
 * @property {string} url - Link URL
 */
export type Link = {
  name: string
  url: string
}

/**
 * Social media link type
 * @property {string} name - Platform name
 * @property {string} url - Profile URL
 * @property {string} icon - Icon class name
 * @property {number} [count] - Optional count
 * @property {string} [label] - Text shown on the pill button
 */
export type SocialLink = {
  name: string
  url: string
  icon: string
  count?: number
  label?: string
}

/**
 * Project configuration interface
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} introduce - Project introduce
 */
export interface ProjectConfig {
  title: string
  description: string
  introduce: string
}

// Project icon type
export type IconType = 'icon' | 'image'

/**
 * Polaroid photo variant types
 * @description Defines polaroid photo styles for different aspect ratios
 * - 1x1: Square ratio
 * - 4x5: Standard polaroid ratio
 * - 4x3: Landscape ratio
 * - 9x16: Portrait ratio
 */
export type PolaroidVariant = '1x1' | '4x5' | '4x3' | '9x16'

/**
 * Photo configuration interface
 * @property {string | ImageMetadata} src - Image path
 * @property {string} alt - Image description
 * @property {number} width - Image width
 * @property {number} height - Image height
 * @property {PolaroidVariant} variant - Polaroid photo variant
 * @property {string} location - Shooting location
 * @property {string} date - Shooting date
 * @property {string} camera - Shooting equipment
 * @property {string} description - Image description
 */
export interface Photo {
  src: string | ImageMetadata
  alt: string
  width: number
  height: number
  variant: PolaroidVariant
  location?: string
  date?: string
  camera?: string
  description?: string
}

/**
 * Photos page configuration interface
 * @property {string} title - Page title
 * @property {string} description - Page description
 * @property {string} introduce - Page introduction
 */
export interface PhotosConfig {
  title: string
  description: string
  introduce: string
}

export type TimelineIconType = 'emoji' | 'icon' | 'color' | 'number' | 'image'

export interface PhotoData {
  title: string
  icon: {
    type: TimelineIconType
    value: string // emoji | icon-name | color-class | number | image-url
    fallback?: string // Fallback display
  }
  description?: string
  date: string
  photos: Photo[]
  travel?: string
}

export interface GitalkConfig {
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
  language?: string
  perPage?: number
  pagerDirection?: 'last' | 'first'
  createIssueManually?: boolean
  distractionFreeMode?: boolean
  enableHotKey?: boolean
}

export interface AnalyticsConfig {
  vercount?: {
    enabled: boolean
  }
  umami?: {
    enabled: boolean
    websiteId: string
    serverUrl: string
  }
  google?: {
    enabled: boolean
    id: string
  }
}

export interface CommentConfig {
  enabled: boolean
  system: 'gitalk' | 'artalk' | 'waline' | 'none'
  gitalk?: GitalkConfig
}

export type FeedType = 'project' | 'tutorial' | 'blog' | 'experience'

export type FeedTab = {
  key: 'featured' | FeedType
  label: string
  icon: string
}

/**
 * Home feed item
 * @description Normalized from the `projects`, `tutorials`, `posts` collections and the experience config
 * @description Every optional field is a slot: the card renders whichever ones the item actually fills
 */
export type FeedItem = {
  // `<type>:<collection id>`, the same shape used in FEED_CONFIG.FEATURED
  id: string
  type: FeedType
  title: string
  description?: string
  // Secondary line under the title, e.g. a company name
  subtitle?: string
  // Bullet points, rendered as a dotted list
  bullets?: string[]
  // Small pill tags, e.g. tech stack used
  skills?: string[]
  // `date` is optional for projects; such items hide the date and sort last
  date?: Date
  // Overrides the date shown top right, e.g. "Jan 2025 — Present"
  dateLabel?: string
  // Experience only: raw end date so the "X yrs Y mos" duration can be computed
  // client-side (undefined = ongoing, duration counts up to "now" without a rebuild)
  endDate?: Date
  url?: string
  // Post cover, rendered full width
  cover?: ImageMetadata
  // Project icon, a small tile beside the title
  icon?: ImageMetadata
  // Project only: background thumbnail, half-width behind the card text
  thumbnail?: ImageMetadata
  // Image path under public/, for config-driven items (skips astro:assets)
  logo?: string
  // Project only: rendered as separate action buttons alongside `url`
  website?: string
  githubUrls?: string[]
  // Whether the item shows up under the Featured tab
  featured?: boolean
  // Position inside the Featured tab, taken from the index in FEED_CONFIG.FEATURED
  order?: number
}
export interface FeedConfig {
  ENABLED: boolean
  TABS: FeedTab[]
  // Hand-picked items; the array order is the order shown under the Featured tab
  FEATURED: string[]
  EMPTY_TEXT: string
}

/**
 * A single job entry
 * @description Dates are `YYYY-MM-DD`; leave `endDate` empty for an ongoing role
 */
export interface ExperienceItem {
  // Referenced from FEED_CONFIG.FEATURED as `experience:<id>`
  id: string
  role: string
  company: string
  companyUrl?: string
  // A path under public/
  logo?: string
  startDate: string
  endDate?: string
  description?: string
  highlights?: string[]
  skills?: string[]
}

export interface ExperienceConfig {
  ENABLED: boolean
  PRESENT_TEXT: string
  ITEMS: ExperienceItem[]
}

export interface PinnedProjectsConfig {
  ENABLED: boolean
  LABEL: string
  ICON: string
}

/**
 * Social preview card variants
 * @description Which platform-styled hover preview to render under a social pill
 */
export type SocialPreviewVariant = 'x' | 'linkedin' | 'github' | 'threads'

export interface SocialPreviewXData {
  enabled: boolean
  avatar: string
  name: string
  verified: boolean
  handle: string
  bio: string
  following: number
  followers: number
}

export interface SocialPreviewLinkedinData {
  enabled: boolean
  avatar: string
  name: string
  headline: string
  location: string
  connections: string
}

export interface SocialPreviewGithubData {
  enabled: boolean
  avatar: string
  name: string
  username: string
  bio: string
  repositories: number
  followers: number
  following: number
}

export interface SocialPreviewThreadsData {
  enabled: boolean
  avatar: string
  name: string
  handle: string
  bio: string
  followers: number
}

/**
 * Social preview cards configuration
 * @description Hover preview content shown under each social pill on the profile header
 */
export interface SocialPreviewConfig {
  x: SocialPreviewXData
  linkedin: SocialPreviewLinkedinData
  github: SocialPreviewGithubData
  threads: SocialPreviewThreadsData
}
