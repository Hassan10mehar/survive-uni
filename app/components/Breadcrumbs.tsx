import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-6 overflow-x-auto no-scrollbar py-2" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 whitespace-nowrap">
        <li>
          <Link href="/" className="flex items-center text-xs font-black uppercase hover:text-[#00FFC2] dark:hover:text-[#00FFC2] transition-colors">
            <Home className="w-3 h-3 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-black/20 dark:text-white/20" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-xs font-black uppercase hover:text-[#00FFC2] dark:hover:text-[#00FFC2] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-xs font-black uppercase text-black/40 dark:text-white/40 italic">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
