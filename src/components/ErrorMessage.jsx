import React from "react";

const getErrorContent = (error) => {
  if (!error) return null;

  if (error.response) {
    if (error.response.status === 404) {
      return {
        icon: "🔍",
        title: "User not found",
        message:
          "No GitHub user exists with that username. Double-check the spelling and try again.",
      };
    }
    if (error.response.status === 403) {
      return {
        icon: "⏳",
        title: "Rate limit exceeded",
        message:
          "GitHub API rate limit reached (60 req/hour for unauthenticated requests). Please wait a few minutes and try again.",
      };
    }
  }

  return {
    icon: "🌐",
    title: "Connection error",
    message:
      "Could not reach GitHub. Please check your internet connection and try again.",
  };
};

const ErrorMessage = ({ error }) => {
  const content = getErrorContent(error);
  if (!content) return null;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4" role="img" aria-label={content.title}>
        {content.icon}
      </span>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {content.title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
        {content.message}
      </p>
    </div>
  );
};

export default ErrorMessage;
