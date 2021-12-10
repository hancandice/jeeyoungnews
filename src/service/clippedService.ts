import { NewsItem } from "../modules/search/types";
import deviceStorage from "../utils/DeviceStorage";

async function getClippedNews() {
  return await deviceStorage.getClippedNews();
}

async function unclip(prevClippedNews: NewsItem[], id: string) {
  const nextClippedNews = prevClippedNews.filter(
    (clipped) => clipped.id !== id
  );
  return deviceStorage.setClippedNews(nextClippedNews);
}

const clippedService = {
  getClippedNews,
  unclip,
};

export default clippedService;
