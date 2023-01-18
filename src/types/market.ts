import { TradePostType } from './tradePost';

export type Paging = {
  limit: number;
  offset: number;
  total: number;
  count: number;
  hasNext: boolean;
};
export type TradePostList = {
  paging: Paging;
  posts: [TradePostType];
};
