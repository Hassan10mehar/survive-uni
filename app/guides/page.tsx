import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Global Student Guides & Resources | Survive Uni",
  description: "Expert guides on global university admissions, GPA scales, degree classifications, and international scholarships for the 2026 academic year.",
};

export default function GuidesPage() {
  const posts = getSortedPostsData();

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center border-4 border-black dark:border-white">
          <BookOpen className="w-6 h-6 text-[#00FFC2] dark:text-black" />
        </div>
        <h1 className="font-black text-3xl sm:text-5xl uppercase text-black dark:text-white">
          Survival Guides
        </h1>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link href={`/guides/${post.slug}`} key={post.slug}>
            <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 shadow-brutal dark:shadow-[8px_8px_0px_0px_white] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] transition-all cursor-pointer">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-black text-2xl text-black dark:text-white mb-2">{post.title}</h2>
              <p className="font-bold text-black/70 dark:text-white/70 mb-4">{post.description}</p>
              <div className="text-xs font-black uppercase text-black/50 dark:text-white/50 tracking-widest">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {post.author}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
