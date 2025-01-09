import { computed } from 'vue';
import type { RssFeed } from './types';
import { rssService } from './index';

export function useRss() {
  const state = rssService.getState();

  const feeds = computed(() => state.feeds);
  const loading = computed(() => state.loading);
  const error = computed(() => state.error);

  const addFeed = (feed: Omit<RssFeed, 'id'>) => {
    try {
      return rssService.addFeed(feed);
    } catch (err) {
      rssService.setError(err instanceof Error ? err.message : 'Failed to add feed');
      return null;
    }
  };

  const updateFeed = (id: string, updates: Partial<RssFeed>) => {
    try {
      return rssService.updateFeed(id, updates);
    } catch (err) {
      rssService.setError(err instanceof Error ? err.message : 'Failed to update feed');
      return null;
    }
  };

  const removeFeed = (id: string) => {
    try {
      return rssService.removeFeed(id);
    } catch (err) {
      rssService.setError(err instanceof Error ? err.message : 'Failed to remove feed');
      return false;
    }
  };

  const getFeed = (id: string) => rssService.getFeed(id);

  return {
    // State
    feeds,
    loading,
    error,
    
    // Methods
    addFeed,
    updateFeed,
    removeFeed,
    getFeed
  };
}