import type { APIRoute } from 'astro'
import { createElement } from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import CvDocument from '~/components/cv/CvDocument'
import { getCvData } from '~/lib/cv'

export const GET: APIRoute = async () => {
  const data = await getCvData()
  // note: CvDocument renders a <Document>, so this cast is safe
  const document = createElement(CvDocument, { data }) as Parameters<typeof renderToBuffer>[0]
  const pdf = await renderToBuffer(document)

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="cv-mulyana.pdf"',
    },
  })
}
