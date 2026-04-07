import { useState, useEffect } from "react";
import axios from "axios";

export default function useGitHubUser(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    axios
      .get(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
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

  return { data, loading, error };
}
