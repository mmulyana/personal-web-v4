import { getEntry } from 'astro:content'
import { CV_CONFIG, EXPERIENCE_CONFIG } from '~/config'
import { parseLocalDate } from '~/lib/data'
import { formatDate } from '~/lib/utils'
import type { CvConfig, ExperienceItem } from '~/types'

export type CvRole = Pick<ExperienceItem, 'role' | 'description' | 'highlights' | 'skills'> & {
  start: Date
  end?: Date
  dateLabel: string
}

export type CvCompany = Pick<ExperienceItem, 'company' | 'companyDescription' | 'workMode' | 'companyUrl'> & {
  roles: CvRole[]
}

export type CvProject = { name: string; description: string; website?: string; stack?: string[] }

export type CvData = Omit<CvConfig, 'title' | 'description' | 'projects'> & {
  companies: CvCompany[]
  projects: CvProject[]
}

// note: shared by /cv and /cv.pdf
export async function getCvData(): Promise<CvData> {
  const { title: _title, description: _description, projects: projectIds, ...rest } = CV_CONFIG

  const companies = EXPERIENCE_CONFIG.ITEMS.reduce<CvCompany[]>((groups, item) => {
    const start = parseLocalDate(item.startDate)
    const end = item.endDate ? parseLocalDate(item.endDate) : undefined
    const role: CvRole = {
      role: item.role,
      description: item.description,
      highlights: item.highlights,
      skills: item.skills,
      start,
      end,
      dateLabel: `${formatDate(start, 'month')} – ${end ? formatDate(end, 'month') : EXPERIENCE_CONFIG.PRESENT_TEXT}`,
    }

    const last = groups.at(-1)
    if (last?.company === item.company) last.roles.push(role)
    else
      groups.push({
        company: item.company,
        companyDescription: item.companyDescription,
        workMode: item.workMode,
        companyUrl: item.companyUrl,
        roles: [role],
      })
    return groups
  }, [])

  const projects = await Promise.all(
    projectIds.map(async (id) => {
      const entry = await getEntry('projects', id)
      if (!entry) throw new Error(`CV_CONFIG.projects: no project "${id}" in src/content/projects/`)
      const { name, description, website, stack } = entry.data
      return { name, description, website, stack }
    })
  )

  return { ...rest, companies, projects }
}

