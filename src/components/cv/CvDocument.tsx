import { Fragment } from 'react'
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { CvData } from '~/lib/cv'
import { formatDuration } from '~/lib/duration'

// note: lower BASE if the PDF spills to 2 pages
const BASE = 9.25
const MUTED = '#333333'

const s = StyleSheet.create({
  page: { paddingVertical: 26, paddingHorizontal: 32, fontFamily: 'Helvetica', fontSize: BASE, lineHeight: 1.3, color: '#000000' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 17, lineHeight: 1.1 },
  contact: { marginTop: 3, color: MUTED },
  link: { color: '#1a4fd6', textDecoration: 'none' },
  section: { marginTop: 9 },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: BASE + 1.5,
    borderBottomWidth: 0.75,
    borderBottomColor: '#000000',
    paddingBottom: 1.5,
    marginBottom: 3,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  grow: { flex: 1, paddingRight: 8 },
  bold: { fontFamily: 'Helvetica-Bold' },
  italic: { fontFamily: 'Helvetica-Oblique' },
  meta: { fontFamily: 'Helvetica-Bold', fontSize: BASE - 0.5 },
  company: { marginTop: 4 },
  role: { marginTop: 1 },
  bullet: { flexDirection: 'row', paddingLeft: 6 },
  dot: { width: 9 },
  stack: { color: MUTED },
})

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.dot}>•</Text>
      <Text style={{ flex: 1 }}>{children}</Text>
    </View>
  )
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

export default function CvDocument({ data }: { data: CvData }) {
  const { name, location, email, links, summary, companies, projects, skills, education } = data

  return (
    <Document title={`CV - ${name}`} author={name}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.contact}>
          {location}
          {' | '}
          <Link src={`mailto:${email}`} style={s.link}>
            {email}
          </Link>
          {links.map((url) => (
            <Fragment key={url}>
              {' | '}
              <Link src={url} style={s.link}>
                {stripProtocol(url)}
              </Link>
            </Fragment>
          ))}
        </Text>

        <View style={s.section}>
          <Text style={s.heading}>Summary</Text>
          <Text>{summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Professional Experience</Text>
          {companies.map((company) => (
            <View key={company.company} style={s.company}>
              <View style={s.row}>
                <Text style={s.grow}>
                  <Text style={s.bold}>{company.company}</Text>
                  {company.companyDescription && <Text style={s.italic}> / {company.companyDescription}</Text>}
                </Text>
                {company.workMode && <Text style={s.meta}>{company.workMode}</Text>}
              </View>
              {company.roles.map((role) => {
                const duration = formatDuration(role.start.toISOString(), role.end?.toISOString() ?? '')
                return (
                  <View key={role.role} style={s.role}>
                    <View style={s.row}>
                      <Text style={[s.grow, s.bold]}>{role.role}</Text>
                      <Text style={s.meta}>
                        {role.dateLabel}
                        {duration && ` (${duration})`}
                      </Text>
                    </View>
                    {role.description && <Text>{role.description}</Text>}
                    {role.highlights?.map((highlight) => <Bullet key={highlight}>{highlight}</Bullet>)}
                    {role.skills && role.skills.length > 0 && <Text style={s.stack}>Techstack: {role.skills.join(', ')}</Text>}
                  </View>
                )
              })}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Selected Projects</Text>
          {projects.map((project) => (
            <Bullet key={project.name}>
              <Text style={s.bold}>{project.name}</Text>
              {project.website && (
                <>
                  {' '}
                  <Link src={project.website} style={s.link}>
                    Live Demo
                  </Link>
                </>
              )}
              : {project.description}
              {project.stack && project.stack.length > 0 && `, built with ${project.stack.join(', ')}`}
            </Bullet>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Skills</Text>
          {skills.map((group) => (
            <Bullet key={group.label}>
              <Text style={s.bold}>{group.label}:</Text> {group.items.join(', ')}.
            </Bullet>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Education</Text>
          {education.map((item) => (
            <View key={item.school}>
              <View style={s.row}>
                <Text style={[s.grow, s.bold]}>
                  {item.school} - {item.location}
                </Text>
                {item.gpa && <Text>GPA {item.gpa}</Text>}
              </View>
              <View style={s.row}>
                <Text style={s.grow}>{item.major}</Text>
                <Text>
                  {item.startYear} - {item.endYear}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
