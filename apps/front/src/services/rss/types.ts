export interface RssFeed {
  id: string;
  url: string;
  name: string;
  description?: string;
  lastFetched?: Date;
  active: boolean;
}

export interface RssState {
  feeds: RssFeed[];
  loading: boolean;
  error: string | null;
}