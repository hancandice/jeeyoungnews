import { NewsItem } from "../search/types";

export type ClippedState = {
  loading: boolean;
  error: any;
  data: NewsItem[];
};
