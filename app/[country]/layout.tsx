import type { Metadata, ResolvingMetadata } from "next";
import { getCountryById } from "@/lib/countries";
import SEOSchema from "@/app/components/SEOSchema";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ country: string }>;
  children: React.ReactNode;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);

  if (!country) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: {
      default: country.seoTitle,
      template: `%s | ${country.name} | Survive Uni`
    },
    description: country.seoDescription,
    keywords: [...country.seoKeywords, "GPA Calculator", "University Tools"],
    alternates: {
      canonical: `/${country.id}`,
      languages: {
        'en-US': '/usa',
        'en-GB': '/uk',
        'en-IN': '/india',
        'en-PK': '/pakistan',
        'x-default': '/',
      },
    },
    openGraph: {
      title: country.seoTitle,
      description: country.seoDescription,
      url: `https://surviveuni.online/${country.id}`,
      siteName: "Survive Uni",
      locale: country.id === "pakistan" ? "en_PK" : "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image.svg",
          width: 1200,
          height: 630,
          alt: `${country.name} University Tools - Survive Uni`,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function CountryLayout({ params, children }: Props) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <SEOSchema 
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", item: "https://surviveuni.online" },
            { name: country.name, item: `https://surviveuni.online/${country.id}` }
          ]
        }}
      />
      {children}
    </>
  );
}
