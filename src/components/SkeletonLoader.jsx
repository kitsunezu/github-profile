import React from "react";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
};

export const getLangColor = (lang) => LANG_COLORS[lang] || "#8b949e";

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded bg-gray-200 dark:bg-gray-800 ${className}`}
  />
);

export const UserCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row gap-6">
    <Skeleton className="w-24 h-24 rounded-full shrink-0" />
    <div className="flex-1 space-y-3">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-full" />
      <div className="flex flex-wrap gap-2 pt-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-20 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export const RepoCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-3 pt-1">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-5 w-10" />
    </div>
  </div>
);
