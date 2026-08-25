import type {
  AnalyticsConfig,
  CommentConfig,
  ExperienceConfig,
  FeedConfig,
  GithubConfig,
  Link,
  PinnedProjectsConfig,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  TagsConfig,
} from '~/types'

export const SITE: Site = {
  title: 'Mulyana',
  description: 'Frontend developer. I build Linkreator at MEA Digital Marketing, and my own small products on the side.',
  website: 'https://mmulyana.com/',
  lang: 'en',
  base: '/',
  author: 'mmulyana',
  ogImage: '/og-image.webp',
  transition: false,
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tutorials',
    url: '/tutorials',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Readme',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
]

/**
 * Pinned projects configuration
 * @description Shows projects with `pinned: true` in their frontmatter
 */
export const PINNED_PROJECTS_CONFIG: PinnedProjectsConfig = {
  ENABLED: true,
  LABEL: 'Pinned Projects',
  ICON: 'icon-[ph--heart-fill]',
}

/**
 * Feed configuration
 * @description The home feed merges the `projects`, `tutorials`, `posts` collections and the experience config; every key maps to an item type
 * @description FEATURED is the hand-picked list, written as `<type>:<id>`; the array order is the display order, and unknown ids warn at build time
 */
export const FEED_CONFIG: FeedConfig = {
  ENABLED: true,
  EMPTY_TEXT: 'Nothing here yet.',
  // To feature something, add '<type>:<id>' below.
  // - project:<id>    -> the folder name in src/content/projects/<id>/
  // - tutorial:<id>   -> the folder name in src/content/tutorials/<id>/
  // - blog:<id>       -> the folder name in src/content/posts/<id>/
  // - experience:<id> -> the `id` field of an item in EXPERIENCE_CONFIG.ITEMS below
  FEATURED: ['project:my-note', 'tutorial:setup-vps-with-docker'],
  TABS: [
    { key: 'featured', label: 'Featured', icon: 'icon-[ph--star-bold]' },
    { key: 'project', label: 'Projects', icon: 'icon-[ph--cube-bold]' },
    { key: 'tutorial', label: 'Tutorial', icon: 'icon-[ph--graduation-cap-bold]' },
    { key: 'blog', label: 'Post', icon: 'icon-[ph--article-bold]' },
    { key: 'experience', label: 'Experience', icon: 'icon-[ph--briefcase-bold]' },
  ],
}

/**
 * Work experience configuration
 * @description Flows into the home feed as `experience` items, sorted by `startDate` alongside everything else
 */
export const EXPERIENCE_CONFIG: ExperienceConfig = {
  ENABLED: true,
  PRESENT_TEXT: 'Present',
  ITEMS: [
    {
      id: 'mea-digital',
      role: 'Frontend Developer',
      company: 'MEA Digital Marketing',
      companyUrl: '',
      logo: '/logos/mea.png',
      startDate: '2025-12-01',
      description: '',
      highlights: [
        'Built a physical products feature for Linkreator, previously limited to digital only products. Creators/Seller can now list and sell physical goods directly on the platform.',
        "Built new landing page builder components (CTA buttons, countdown timers, pop-ups), giving creators more building blocks to customize their pages.",
      ],
      skills: ['Next.js', 'TypeScript'],
    },
    {
      id: 'self-employed-fullstack',
      role: 'Fullstack Developer (Freelance)',
      company: 'Self Employed',
      companyUrl: '',
      logo: '',
      startDate: '2025-12-01',
      description: 'Building an ERP system for a client.',
      highlights: [
        'Built a procurement module with purchase requests, purchase orders, an approval workflow, and warehouse stock integration.',
      ],
      skills: ['Next.js', 'Ruby on Rails', 'Docker'],
    },
    {
      id: 'self-employed-frontend',
      role: 'Frontend Developer (Freelance)',
      company: 'Self Employed',
      companyUrl: '',
      logo: '',
      startDate: '2024-09-01',
      endDate: '2025-12-01',
      description: 'Building an ERP system for a client.',
      highlights: ['Built the frontend for a warehouse module, covering stock in/out, disposal, and stock opname features.'],
      skills: ['Next.js'],
    },
    {
      id: 'rakamin-academy',
      role: 'Frontend Engineer (Intern)',
      company: 'Rakamin Academy',
      companyUrl: '',
      logo: '/logos/rakamin.png',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      highlights: [
        'Replaced page navigation with an inline panel for candidate review, so recruiters review faster without opening a new page per candidate.',
        'Improved bug reporting by adding photo evidence, stored in S3 and shared to Slack, making issues easier to verify.',
      ],
      skills: ['React.js', 'TypeScript'],
    },
    {
      id: 'bitkreasi',
      role: 'Software Engineer (Intern)',
      company: 'Bitkreasi',
      companyUrl: '',
      logo: '/logos/bitkreasi.png',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      highlights: [
        'Built village profile modules for Asadesa, a village management platform, covering village identity, government structure, and institution data.',
      ],
      skills: ['Next.js', 'Node.js'],
    },
    {
      id: 'black-wolf-tech',
      role: 'Frontend Developer (Freelance)',
      company: 'Black Wolf Tech Indonesia',
      companyUrl: '',
      logo: '',
      startDate: '2023-08-01',
      endDate: '2023-12-01',
      description: 'Built features for ngajiaja.com, a web-based educational platform.',
      highlights: [
        'Teacher onboarding flow, covering registration and verification.',
        'Blog functionality with CRUD post management.',
        'Admin dashboard for monitoring student data.',
      ],
      skills: ['shadcn/ui', 'React Query'],
    },
    {
      id: 'kecilin',
      role: 'Frontend Developer (Intern)',
      company: 'KECILIN',
      companyUrl: '',
      logo: '/logos/kecilin.png',
      startDate: '2023-07-01',
      endDate: '2023-10-01',
      highlights: [
        'Built a reusable Laravel-based starter template to speed up delivery for future projects.',
        'Revamped the Kecilin.id landing page.',
      ],
      skills: ['Livewire', 'Node.js'],
    },
  ],
}

/**
 * SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - Skills showcase data
 * @property {string} SKILLS_DATA.direction - Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - Skills icon
 * @property {string} SKILLS_DATA.skills.name - Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'JavaScript',
          icon: 'icon-[skill-icons--javascript]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
          name: 'CSS',
          icon: 'icon-[skill-icons--css]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },
        {
          name: 'HTML',
          icon: 'icon-[skill-icons--html]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[skill-icons--typescript]',
          url: 'https://www.typescriptlang.org/',
        },
        {
          name: 'Vue',
          icon: 'icon-[skill-icons--vuejs-dark]',
          url: 'https://vuejs.org/',
        },
        {
          name: 'Sass',
          icon: 'icon-[skill-icons--sass]',
          url: 'https://sass-lang.com/',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Astro',
          icon: 'icon-[skill-icons--astro]',
          url: 'https://astro.build/',
        },
        {
          name: 'Node.js',
          icon: 'icon-[skill-icons--nodejs-dark]',
          url: 'https://nodejs.org/',
        },
        {
          name: 'React',
          icon: 'icon-[skill-icons--react-dark]',
          url: 'https://react.dev/',
        },
        {
          name: 'Next.js',
          icon: 'icon-[skill-icons--nextjs-dark]',
          url: 'https://nextjs.org/',
        },
        {
          name: 'Tailwind CSS',
          icon: 'icon-[skill-icons--tailwindcss-dark]',
          url: 'https://tailwindcss.com/',
        },
        {
          name: 'Vite',
          icon: 'icon-[skill-icons--vite-dark]',
          url: 'https://vitejs.dev/',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Ubuntu',
          icon: 'icon-[skill-icons--ubuntu-dark]',
          url: 'https://ubuntu.com/',
        },
        {
          name: 'Git',
          icon: 'icon-[skill-icons--git]',
          url: 'https://git-scm.com/',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[skill-icons--mongodb]',
          url: 'https://www.mongodb.com/',
        },
        {
          name: 'Vercel',
          icon: 'icon-[skill-icons--vercel-dark]',
          url: 'https://vercel.com/',
        },
        {
          name: 'VS Code',
          icon: 'icon-[skill-icons--vscode-dark]',
          url: 'https://code.visualstudio.com/',
        },
        {
          name: 'Obsidian',
          icon: 'icon-[skill-icons--obsidian-dark]',
          url: 'https://obsidian.md/',
        },
      ],
    },
  ],
}

/**
 * GitHub configuration
 *
 * @property {boolean} ENABLED - Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GitHub username
 * @property {boolean} TOOLTIP_ENABLED - Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: false,
  GITHUB_USERNAME: 'mmulyana',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by Mulyana',
  author: 'Mulyana',
  introduce: '',
  homePageConfig: {
    size: 2,
    type: 'minimal',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
  recommendText: 'REC',
  wordCountView: true,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: false,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'gitalk-comment',
    owner: 'Dnzzk2',
    admin: ['Dnzzk2'],
    language: 'en-US',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'The examples of my projects.',
  introduce: 'The examples of my projects.',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: 'Here I will record some photos taken in daily life.',
  introduce: 'Here I will record some photos taken in daily life.',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: {
    enabled: true,
  },
  umami: {
    enabled: false,
    websiteId: 'Your websiteId in umami',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}
