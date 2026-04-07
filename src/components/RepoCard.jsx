import React, { useState, useRef } from "react";
import axios from "axios";
import { getLangColor } from "./SkeletonLoader";

const RELATIVE_FORMATTER = (() => {
  try {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  } catch {
    return null;
  }
})();

const timeAgo = (dateStr) => {
  if (!dateStr) return null;
  const diff = (new Date(dateStr) - Date.now()) / 1000;
  const abs = Math.abs(diff);
  if (!RELATIVE_FORMATTER) return new Date(dateStr).toLocaleDateString();
  if (abs < 60) return RELATIVE_FORMATTER.format(Math.round(diff), "second");
  if (abs < 3600)
    return RELATIVE_FORMATTER.format(Math.round(diff / 60), "minute");
  if (abs < 86400)
    return RELATIVE_FORMATTER.format(Math.round(diff / 3600), "hour");
  if (abs < 2592000)
    return RELATIVE_FORMATTER.format(Math.round(diff / 86400), "day");
  if (abs < 31536000)
    return RELATIVE_FORMATTER.format(Math.round(diff / 2592000), "month");
  return RELATIVE_FORMATTER.format(Math.round(diff / 31536000), "year");
};

const LanguageTooltip = ({ languages }) => {
  if (languages === undefined)
    return (
      <p className="text-xs text-gray-400 animate-pulse">Loading…</p>
    );

  const total = Object.values(languages).reduce((s, v) => s + v, 0);
  if (total === 0)
    return <p className="text-xs text-gray-400">No language data</p>;

  return (
    <div className="space-y-1.5 min-w-[150px]">
      {Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([lang, bytes]) => (
          <div key={lang} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: getLangColor(lang) }}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300 flex-1 truncate">
              {lang}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {((bytes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
    </div>
  );
};

const RepoCard = ({ repo }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [languages, setLanguages] = useState(undefined);
  const fetchedRef = useRef(false);
  const cachedRef = useRef(null);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      axios
        .get(repo.languages_url)
        .then((res) => {
          cachedRef.current = res.data;
          setLanguages(res.data);
        })
        .catch(() => {
          cachedRef.current = {};
          setLanguages({});
        });
    } else if (cachedRef.current !== null) {
      setLanguages(cachedRef.current);
    }
  };

  const updated = timeAgo(repo.pushed_at);

  return (
    <div
      className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group flex flex-col gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {/* Language tooltip */}
      {tooltipVisible && (
        <div className="absolute bottom-full left-0 mb-2 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-3 shadow-xl pointer-events-none">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Languages
          </p>
          <LanguageTooltip languages={languages} />
        </div>
      )}

      {/* Header: name + visibility badge */}
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate leading-snug"
          onClick={(e) => e.stopPropagation()}
        >
          {repo.name}
        </a>
        <span className="shrink-0 text-xs border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-gray-400 dark:text-gray-500">
          Public
        </span>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed overflow-hidden"
           style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {repo.description}
        </p>
      )}

      {/* Footer: language · stars · forks · updated */}
      <div className="flex items-center flex-wrap gap-3 mt-auto pt-1 text-xs text-gray-400 dark:text-gray-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: getLangColor(repo.language) }}
            />
            <span className="text-gray-600 dark:text-gray-400">
              {repo.language}
            </span>
          </span>
        )}

        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            {/* star icon */}
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}

        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            {/* fork icon */}
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
        )}

        {updated && <span>Updated {updated}</span>}
      </div>
    </div>
  );
};

export default RepoCard;
