import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeCategories } from "@/lib/home/categories";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CategoryCards() {
  return (
    <section
      className={cn("py-12 sm:py-16 md:py-20", pageContainer, scrollMtHeader)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Article categories
        </h2>
        <Link
          href="/ai-news"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated-hover"
        >
          Browse all articles
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        {homeCategories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative flex min-h-[320px] overflow-hidden rounded-3xl sm:min-h-[380px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="size-5 text-white/90 group-hover:text-black" />
            </span>
            <div className="relative mt-auto p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                {category.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {category.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70 sm:text-base">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
