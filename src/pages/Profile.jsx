import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGitHubUser from "../hooks/useGitHubUser";
import useGitHubRepos from "../hooks/useGitHubRepos";
import UserCard from "../components/UserCard";
import RepoCard from "../components/RepoCard";
import { UserCardSkeleton, RepoCardSkeleton } from "../components/SkeletonLoader";
import ErrorMessage from "../components/ErrorMessage";

const Profile = () => {
  const { paramsName } = useParams();
  const navigate = useNavigate();

  const { data: user, loading: userLoading, error: userError } =
    useGitHubUser(paramsName);
  const { data: repos, loading: reposLoading, totalStars } =
    useGitHubRepos(paramsName);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to search
        </button>

        {/* User card */}
        {userLoading && <UserCardSkeleton />}
        {userError && <ErrorMessage error={userError} />}
        {user && (
          <UserCard
            user={user}
            totalStars={totalStars}
            repoCount={repos ? repos.length : user.public_repos}
          />
        )}

        {/* Repos section */}
        {user && (
          <div>
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Repositories{" "}
              <span className="text-gray-400 dark:text-gray-500 font-normal">
                ({repos ? repos.length : "..."})
              </span>
            </h2>

            {reposLoading ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <RepoCardSkeleton key={i} />
                ))}
              </div>
            ) : repos && repos.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : repos && repos.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 py-10 text-center">
                No public repositories found.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
