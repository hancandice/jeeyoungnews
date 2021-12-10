import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsItem } from "../modules/search/types";

const SEARCH_HISTORY = "SEARCH_HISTORY";
const CLIPPED_NEWS = "CLIPPED_NEWS";

const getSearchHistory = async () => {
  return await new Promise(function (resolve, _) {
    AsyncStorage.getItem(SEARCH_HISTORY)
      .then((items) => {
        const result = items ? JSON.parse(items) : [];
        console.log("search history in local storage: ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error fetching search history: ", err);
        resolve(null);
      });
  });
};

const getClippedNews = async () => {
  return await new Promise(function (resolve, _) {
    AsyncStorage.getItem(CLIPPED_NEWS)
      .then((items) => {
        const result = items ? JSON.parse(items) : [];
        console.log("clipped news in local storage: ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error fetching clipped news: ", err);
        resolve(null);
      });
  });
};

const setClippedNews = async (items: NewsItem[]) => {
  return await new Promise(function (resolve, reject) {
    AsyncStorage.setItem(CLIPPED_NEWS, JSON.stringify(items))
      .then(() => {
        AsyncStorage.getItem(CLIPPED_NEWS)
          .then((items) => {
            const result = items ? JSON.parse(items) : [];
            console.log("updated clipped news in local storage: ", result);
            resolve(result);
          })
          .catch((err) => {
            console.log("Error fetching updated clipped news: ", err);
            resolve(null);
          });
      })
      .catch((err) => {
        console.log("Error setting clipped news: ", err);
        resolve(null);
      });
  });
};

const setSearchHistory = async (items: string[]) => {
  return await new Promise(function (resolve, reject) {
    AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(items))
      .then(() => {
        AsyncStorage.getItem(SEARCH_HISTORY)
          .then((items) => {
            const result = items ? JSON.parse(items) : [];
            console.log("updated search history in local storage: ", result);
            resolve(result);
          })
          .catch((err) => {
            console.log("Error fetching updated search history: ", err);
            resolve(null);
          });
      })
      .catch((err) => {
        console.log("Error setting search history: ", err);
        resolve(null);
      });
  });
};

const deviceStorage = {
  getClippedNews,
  setClippedNews,
  getSearchHistory,
  setSearchHistory,
};

export default deviceStorage;
