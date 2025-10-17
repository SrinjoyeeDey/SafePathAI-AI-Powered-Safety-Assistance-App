// Shared types for Contributors components

export type CommitData = {
  week: string;
  commits: number;
  date: string;
};

export type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  url: string;
  name: string | null;
  additions: number;
  deletions: number;
  commitData: CommitData[];
  rank: number;
};

export type GitHubContributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  url: string;
};