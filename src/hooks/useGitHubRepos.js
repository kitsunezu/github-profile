import { useState, useEffect } from "react";
import axios from "axios";

export default function useGitHubRepos(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    if (!username) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);
    setTotalStars(0);

    axios
      .get(
        `https://api.github.com/users/${encodeURIComponent(
          username
        )}/repos?per_page=50&sort=pushed`
      )
      .then((res) => {
        if (!cancelled) {
          const filtered = res.data.filter((r) => !r.fork);
          const stars = filtered.reduce(
            (sum, r) => sum + r.stargazers_count,
            0
          );
          setData(filtered);
          setTotalStars(stars);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading, error, totalStars };
}
