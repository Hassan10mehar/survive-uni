import React from 'react';

type SchemaType = 'SoftwareApplication' | 'HowTo' | 'FAQPage' | 'CollegeOrUniversity' | 'BreadcrumbList' | 'ItemList';

interface SEOSchemaProps {
  type: SchemaType;
  data: any;
}

export default function SEOSchema({ type, data }: SEOSchemaProps) {
  const base = { '@context': 'https://schema.org' };
  let schema: any = base;

  if (type === 'SoftwareApplication') {
    schema = {
      ...base,
      '@type': 'SoftwareApplication',
      name: data.name,
      description: data.description,
      operatingSystem: 'Web',
      applicationCategory: 'EducationalApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '312' },
    };
  } else if (type === 'HowTo') {
    schema = {
      ...base,
      '@type': 'HowTo',
      name: data.name,
      description: data.description,
      step: data.steps.map((step: string, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: step,
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
      itemListElement: data.items.map((item: { position: number; name: string; item: string }) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        item: item.item,
      })),
    };
  } else if (type === 'ItemList') {
    schema = {
      ...base,
      '@type': 'ItemList',
      name: data.name,
      description: data.description,
      itemListElement: data.items.map((item: { position: number; name: string; url: string }) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        url: item.url,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
