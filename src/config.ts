import type {
  AnalyticsConfig,
  CommentConfig,
  CvConfig,
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
  SocialPreviewConfig,
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

// note: single source for the home feed, /cv and /cv.pdf
export const EXPERIENCE_CONFIG: ExperienceConfig = {
  ENABLED: true,
  PRESENT_TEXT: 'Present',
  ITEMS: [
    {
      id: 'mea-digital',
      role: 'Junior Frontend Developer',
      company: 'MEA Digital Marketing',
      companyDescription: 'An all-in-one platform for creating landing pages, selling products, and etc',
      workMode: 'Hybrid',
      companyUrl: '',
      logo: '/logos/mea.png',
      startDate: '2025-12-01',
      highlights: [
        'Built a physical products feature for Linkreator, previously limited to digital only products. Creators/Sellers can now list and sell physical goods directly on the platform.',
        'Built new landing page builder components (CTA buttons, countdown timers, pop-ups), giving creators more building blocks to customize their pages.',
      ],
      skills: ['Next.js', 'TypeScript'],
    },
    {
      id: 'digirupa-fullstack',
      role: 'Freelance Fullstack Engineer',
      company: 'Digirupa Studio',
      companyDescription: 'IT team delivering business digitalization projects through optimized freelance collaboration.',
      workMode: 'Remote',
      companyUrl: '',
      logo: '',
      startDate: '2025-12-01',
      highlights: [
        'Developed a procurement module with purchase request and purchase order creation, approval workflow, and warehouse stock integration',
      ],
      skills: ['Next.js', 'Ruby on Rails', 'Postgres', 'Docker'],
    },
    {
      id: 'digirupa-frontend',
      role: 'Freelance Frontend Engineer',
      company: 'Digirupa Studio',
      companyDescription: 'IT team delivering business digitalization projects through optimized freelance collaboration.',
      workMode: 'Remote',
      companyUrl: '',
      logo: '',
      startDate: '2024-09-01',
      endDate: '2025-12-01',
      highlights: ['Built frontend for warehouse module, including stock in/out, disposal, and stock opname features'],
      skills: ['Next.js', 'TypeScript'],
    },
    {
      id: 'rakamin-academy',
      role: 'Intern Frontend Engineer',
      company: 'Rakamin',
      companyDescription: 'An education and hiring platform from Indonesia.',
      workMode: 'Remote',
      companyUrl: '',
      logo: '/logos/rakamin.png',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      highlights: [
        'Improved candidate review experience by replacing page navigation with an inline panel, so recruiters no longer need to open a new page for each candidate and can review faster',
        'Improved bug reporting by adding photo evidence (stored in S3, shared to Slack), making issues easier for the team to understand and verify',
      ],
      skills: ['React.js', 'TypeScript', 'Vite'],
    },
    {
      id: 'bitkreasi',
      role: 'Intern Software Engineer',
      company: 'Bitkreasi',
      companyDescription: 'Software house.',
      workMode: 'Remote',
      companyUrl: '',
      logo: '/logos/bitkreasi.png',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      highlights: [
        'Built village profile modules for Asadesa, village management platform, covering village identity, government structure, and institution data',
      ],
      skills: ['Next.js', 'Express.js', 'TypeScript'],
    },
    {
      id: 'black-wolf-tech',
      role: 'Freelance Frontend Developer',
      company: 'Black Wolf Tech Indonesia',
      companyDescription: 'Software house.',
      workMode: 'Remote',
      companyUrl: '',
      logo: '',
      startDate: '2023-08-01',
      endDate: '2023-12-01',
      description: 'Built web application for https://ngajiaja.com, a web-based educational platform',
      highlights: [
        'Teacher onboarding flow, covering registration and verification',
        'Blog functionality with CRUD post management',
        'Admin dashboard for monitoring student data',
      ],
      skills: ['React.js', 'Vite'],
    },
    {
      id: 'kecilin',
      role: 'Intern Frontend Developer',
      company: 'Kecilin',
      companyDescription: 'Compression technology provider.',
      workMode: 'Hybrid',
      companyUrl: '',
      logo: '/logos/kecilin.png',
      startDate: '2023-07-01',
      endDate: '2023-10-01',
      highlights: [
        'Built reusable Laravel-based starter template to speed up delivery for future project',
        'Revamped the Kecilin.id landing page',
      ],
      skills: ['Laravel', 'Livewire', 'Node.js'],
    },
  ],
}

// note: experience comes from EXPERIENCE_CONFIG, projects from src/content/projects/
export const CV_CONFIG: CvConfig = {
  title: 'CV',
  description: 'Curriculum vitae of Muhamad Mulyana, frontend developer.',
  name: 'Muhamad Mulyana',
  location: 'Jawa Barat, Indonesia',
  email: 'mulyan.t20@gmail.com',
  links: ['https://mmulyana.com', 'https://www.linkedin.com/in/mmulyana', 'https://github.com/mmulyana'],
  summary:
    'Frontend developer with 3+ years of experience building web products with React.js, Next.js, and TypeScript, including 1+ year of fullstack work. Currently building Linkreator at MEA Digital Marketing and, as a freelancer, an ERP system covering procurement, warehouse, and point of sales.',
  projects: ['my-note', 'my-todo'],
  skills: [
    {
      label: 'Programming',
      items: [
        'React.js', 'Next.js', 'React Native', 'Expo', 'Vue.js', 'Nest.js', 'Go', 'GraphQL', 'Javascript', 'Typescript',
        'HTML', 'CSS', 'Tailwind', 'React Query', 'Laravel', 'MySQL', 'Rest API', 'Zustand', 'Redux', 'Redux toolkit',
      ],
    },
    {
      label: 'Tools & Workflow',
      items: ['Git', 'Github', 'Gitlab', 'NPM', 'PNPM', 'Yarn', 'Vite', 'Webpack', 'Postman', 'Figma'],
    },
  ],
  education: [
    {
      school: 'Ahmad Dahlan University',
      location: 'Yogyakarta, Indonesia',
      major: 'Informatics Engineering Major',
      gpa: '3.61/4.00',
      startYear: 2020,
      endYear: 2025,
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

/**
 * Social preview cards configuration
 * @description Hover preview content shown under each social pill on the profile header. Edit here to adjust.
 */
export const SOCIAL_PREVIEW_CONFIG: SocialPreviewConfig = {
  x: {
    enabled: false, // no preview image yet — hidden for now, along with the pill button
    avatar: '/avatar.svg',
    name: 'Mulyana',
    verified: true,
    handle: '@mmulyana',
    bio: 'Frontend Engineer building polished web products. Side projects: My Note & My Todo.',
    following: 128,
    followers: 342,
  },
  linkedin: {
    enabled: true,
    avatar: '/img/linkedin.jpg',
    name: 'Mulyana',
    headline: 'Frontend Developer at MEA digital marketing | React.js, Next.js',
    location: 'Indonesia',
    connections: '495',
  },
  github: {
    enabled: true,
    avatar: '/img/github.jpg',
    name: 'Mulyana',
    username: 'mmulyana',
    bio: 'Software Engineer Wannabe🚀',
    repositories: 53,
    followers: 40,
    following: 17,
  },
  threads: {
    enabled: true,
    avatar: '/img/threads.jpg',
    name: 'Mulyana',
    handle: '@mmulyana_',
    bio: 'return <></>',
    followers: 55,
  },
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
