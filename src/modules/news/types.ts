export interface NewsItem {
  id: string;
  web_url: string;
  photo: string;
  headline_main: string;
  pub_date: string;
  clipped: boolean;
}

export type SearchNewsPayloads = {
  keyword: string;
  first: boolean;
};

export type NewsState = {
  loading: boolean;
  error: any;
  data: NewsItem[];
  searchHistory: string[];
  clippedNews: NewsItem[];
};
