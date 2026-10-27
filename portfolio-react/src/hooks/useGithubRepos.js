import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage.js";

const TTL_MS = 60 * 60 * 1000; // 1 hour: stays well under GitHub's 60 req/hr anonymous limit

function readCache(key) {
  try {
    const parsed = JSON.parse(readStorage(key));
    if (parsed && Array.isArray(parsed.repos) && Date.now() - parsed.at < TTL_MS) return parsed.repos;
  } catch {
    /* ignore corrupt cache */
  }
  return null;
}

export function useGithubRepos(username) {
  const key = `githubActivityCache:${username}`;
  const [state, setState] = useState(() => {
    const cached = readCache(key);
    return cached ? { status: "ready", repos: cached } : { status: "loading", repos: [] };
  });

  useEffect(() => {
    if (state.status === "ready") return;
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
        return res.json();
      })
      .then((all) => {
        const repos = all.filter((r) => !r.fork).slice(0, 6);
        writeStorage(key, JSON.stringify({ repos, at: Date.now() }));
        setState({ status: "ready", repos });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", repos: [] });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return state;
}
