import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Survive Uni - Global University Tools',
    short_name: 'Survive Uni',
    description: 'The Universal Student Toolkit: GPA, Merit & Admission Calculators Worldwide',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FFDF00',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
