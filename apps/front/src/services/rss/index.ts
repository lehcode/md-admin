import { RssServiceImpl } from './rssService';

export * from './types';
export * from './useRss';

export const rssService = new RssServiceImpl();