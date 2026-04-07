import React from "react";

const StatItem = ({ label, value }) => (
  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 min-w-[72px]">
    <span className="text-base font-bold text-gray-900 dark:text-gray-100 tabular-nums">
      {value != null ? value.toLocaleString() : "—"}
    </span>
    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
      {label}
    </span>
  </div>
);

const UserCard = ({ user, totalStars, repoCount }) => {
  const joinedYear = new Date(user.created_at).getFullYear();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row gap-6">
      {/* Avatar */}
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 self-start"
      >
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-24 h-24 rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500/60 transition"
        />
      </a>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {user.name && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {user.name}
            </h1>
          )}
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            @{user.login}
          </a>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            · Joined {joinedYear}
          </span>
        </div>

        {user.bio && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {user.bio}
          </p>
        )}

        {/* Meta: company, location, website */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5 text-xs text-gray-500 dark:text-gray-400">
          {user.company && (
            <span className="flex items-center gap-1.5">
              {/* building icon */}
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z" />
              </svg>
              {user.company}
            </span>
          )}
          {user.location && (
            <span className="flex items-center gap-1.5">
              {/* pin icon */}
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57C3.773 9.733 2 7.352 2 5a6 6 0 0 1 12 0c0 1.272-.59 2.8-1.834 3.94ZM8 0a5 5 0 0 0-5 5c0 2.165 1.598 3.964 2.904 5.612.394.508.77.989 1.096 1.46.32-.465.694-.947 1.087-1.45C10.287 9.095 13 7.1 13 5a5 5 0 0 0-5-5Z" />
                <path d="M8 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              {user.location}
            </span>
          )}
          {user.blog && (
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : `https://${user.blog}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-500 hover:underline transition-colors"
            >
              {/* link icon */}
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
              </svg>
              {user.blog.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mt-4">
          <StatItem label="Repos" value={repoCount} />
          <StatItem label="Followers" value={user.followers} />
          <StatItem label="Following" value={user.following} />
          <StatItem label="Stars" value={totalStars} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
