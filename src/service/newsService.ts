import { nanoid } from "@reduxjs/toolkit";
import { NewsItem } from "../modules/news/types";
import deviceStorage from "../utils/DeviceStorage";

const BASE_URL = "https://www.nytimes.com/";
const BASE_API_URL = "https://api.nytimes.com/svc/search/v2/";
const API_KEY = "GXYOsLo3oX9CSWVsyF03GJ03tMXMscIU";
const DEFAULT_PHOTO_URL =
  "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

function textLengthOverCut(
  txt: string,
  len: number = 15,
  lastTxt: string = "..."
) {
  if (txt.length > len) {
    txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}
function setHeadlinePhoto(multimedia: any) {
  if (multimedia.length === 0) return DEFAULT_PHOTO_URL;
  else return BASE_URL + multimedia[0].url;
}

async function getClippedNews() {
  return deviceStorage.getClippedNews();
}

async function getSearchHistory() {
  return deviceStorage.getSearchHistory();
}

function fetchNewsWithKeyword(keyword: string, page: number = 0) {
  const FETCH_ENDPOINT = `${BASE_API_URL}articlesearch.json?q=${keyword}&page=${page}&api-key=${API_KEY}`;
  console.log("FETCH_ENDPOINT", FETCH_ENDPOINT);

  return new Promise(function (resolve, _reject) {
    fetch(FETCH_ENDPOINT)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          const docs = json.response.docs;
          if (docs.length === 0) {
            resolve(docs);
          } else {
            const news: NewsItem[] = docs.map((doc: any) => ({
              id: nanoid(),
              web_url: doc.web_url,
              photo: setHeadlinePhoto(doc.multimedia),
              headline_main: textLengthOverCut(doc.headline.main),
              pub_date: textLengthOverCut(doc.pub_date, 10, ""),
              clipped: false,
            }));
            resolve(news);
          }
        }
      })
      .catch((err) => {
        console.log("Error fetching rates: ", err);
        resolve(null);
      });
  });
}

const newsService = {
  getClippedNews,
  getSearchHistory,
  fetchNewsWithKeyword,
};

export default newsService;