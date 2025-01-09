import { reactive } from 'vue';
import type { RssFeed, RssState } from './types';

export class RssServiceImpl {
  private state: RssState;

  constructor() {
    this.state = reactive<RssState>({
      feeds: [],
      loading: false,
      error: null
    });
  }

  getState(): RssState {
    return this.state;
  }

  addFeed(feed: Omit<RssFeed, 'id'>): RssFeed {
    const newFeed: RssFeed = {
      ...feed,
      id: crypto.randomUUID(),
      lastFetched: undefined
    };

    this.state.feeds.push(newFeed);
    return newFeed;
  }

  updateFeed(id: string, updates: Partial<RssFeed>): RssFeed | null {
    const feedIndex = this.state.feeds.findIndex(feed => feed.id === id);
    if (feedIndex === -1) {
      return null;
    }

    const updatedFeed = {
      ...this.state.feeds[feedIndex],
      ...updates
    };

    this.state.feeds[feedIndex] = updatedFeed;
    return updatedFeed;
  }

  removeFeed(id: string): boolean {
    const feedIndex = this.state.feeds.findIndex(feed => feed.id === id);
    if (feedIndex === -1) {
      return false;
    }

    this.state.feeds.splice(feedIndex, 1);
    return true;
  }

  getFeed(id: string): RssFeed | null {
    return this.state.feeds.find(feed => feed.id === id) || null;
  }

  getFeeds(): RssFeed[] {
    return this.state.feeds;
  }

  setLoading(loading: boolean): void {
    this.state.loading = loading;
  }

  setError(error: string | null): void {
    this.state.error = error;
  }
}