import { getPostData, getSortedPostsData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = getPostData(resolvedParams.slug);
  const url = `https://surviveuni.online/guides/${resolvedParams.slug}`;

  return {
    title: `${postData.title} | Survive Uni`,
    description: postData.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: url,
      type: 'article',
      publishedTime: postData.date,
      authors: [postData.author],
      images: [
        {
          url: postData.image || '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: postData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.description,
      images: [postData.image || '/images/og-default.png'],
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = getPostData(resolvedParams.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.title,
    "description": postData.description,
    "image": postData.image || 'https://surviveuni.online/images/og-default.png',
    "datePublished": postData.date,
    "author": {
      "@type": "Organization",
      "name": "Survive Uni Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Survive Uni",
      "logo": {
        "@type": "ImageObject",
        "url": "https://surviveuni.online/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://surviveuni.online/guides/${resolvedParams.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
      <Link href="/guides" className="inline-flex items-center gap-2 font-bold text-sm uppercase text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Guides
      </Link>

      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {postData.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-[#FFDF00] text-black border-2 border-black px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-black text-4xl sm:text-6xl text-black dark:text-white leading-tight mb-4">
          {postData.title}
        </h1>
        <div className="text-sm font-black uppercase text-black/50 dark:text-white/50 tracking-widest mb-8">
          {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • By {postData.author}
        </div>

        {postData.image && (
          <div className="relative aspect-video w-full border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] mb-12 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image 
              src={postData.image} 
              alt={postData.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      <div className="prose prose-lg prose-black dark:prose-invert prose-headings:font-black prose-headings:uppercase max-w-none 
                      prose-a:text-[#FF4911] prose-a:font-bold prose-p:font-medium prose-li:font-medium
                      prose-table:border-4 prose-table:border-black dark:prose-table:border-white
                      prose-th:bg-[#FFDF00] prose-th:text-black prose-th:p-4 prose-th:border-2 prose-th:border-black
                      prose-td:p-4 prose-td:border-2 prose-td:border-black dark:prose-td:border-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{postData.content}</ReactMarkdown>
      </div>
    </article>
    </>
  );
}
