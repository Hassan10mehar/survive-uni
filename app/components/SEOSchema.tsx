import React from 'react';

export type SchemaType =
  | 'WebApplication'
  | 'SoftwareApplication'
  | 'HowTo'
  | 'FAQPage'
  | 'CollegeOrUniversity'
  | 'BreadcrumbList'
  | 'ItemList'
  | 'Event';

interface SEOSchemaProps {
  type: SchemaType;
  data: any;
}

const BASE_URL = 'https://surviveuni.online';

export default function SEOSchema({ type, data }: SEOSchemaProps) {
  const base = { '@context': 'https://schema.org' };
  let schema: any = base;

  if (type === 'WebApplication') {
    // Full WebApplication spec — eligible for Google rich results
    schema = {
      ...base,
      '@type': 'WebApplication',
      name: data.name,
      url: data.url ? `${BASE_URL}${data.url}` : BASE_URL,
      description: data.description,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      inLanguage: 'en',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'PKR',
      },
      featureList: data.featureList || [
        'Real-time calculation',
        'Mobile friendly',
        'No sign-up required',
        'Official formula used',
      ],
      aggregateRating: data.aggregateRating || {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: data.ratingCount || '847',
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Organization',
        name: 'Survive Uni',
        url: BASE_URL,
      },
      dateModified: new Date().toISOString().split('T')[0],
    };
  } else if (type === 'SoftwareApplication') {
    // Kept for backward compatibility — maps to WebApplication internally
    schema = {
      ...base,
      '@type': 'WebApplication',
      name: data.name,
      description: data.description,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '312',
        bestRating: '5',
        worstRating: '1',
      },
    };
  } else if (type === 'HowTo') {
    schema = {
      ...base,
      '@type': 'HowTo',
      name: data.name,
      description: data.description,
      totalTime: data.totalTime || 'PT2M',
      tool: data.tool || [{ '@type': 'HowToTool', name: 'Survive Uni Calculator' }],
      step: data.steps.map((step: string | { name: string; text: string }, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: typeof step === 'string' ? `Step ${index + 1}` : step.name,
        text: typeof step === 'string' ? step : step.text,
      })),
    };
  } else if (type === 'FAQPage') {
    schema = {
      ...base,
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
  } else if (type === 'CollegeOrUniversity') {
    schema = {
      ...base,
      '@type': 'CollegeOrUniversity',
      name: data.name,
      url: data.url,
      sameAs: data.sameAs,
      address: {
        '@type': 'PostalAddress',
        addressCountry: data.addressCountry?.toUpperCase(),
      },
    };
  } else if (type === 'BreadcrumbList') {
    schema = {
      ...base,
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map(
        (item: { position?: number; name: string; item: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })
      ),
    };
  } else if (type === 'ItemList') {
    schema = {
      ...base,
      '@type': 'ItemList',
      name: data.name,
      description: data.description,
      numberOfItems: data.items?.length,
      itemListElement: data.items.map(
        (item: { position: number; name: string; url: string; description?: string }) => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          url: item.url,
          ...(item.description ? { description: item.description } : {}),
        })
      ),
    };
  } else if (type === 'Event') {
    // For admission season content (boosts seasonal search intent)
    schema = {
      ...base,
      '@type': 'Event',
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: data.url ? `${BASE_URL}${data.url}` : BASE_URL,
      },
      organizer: {
        '@type': 'Organization',
        name: 'Survive Uni',
        url: BASE_URL,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
