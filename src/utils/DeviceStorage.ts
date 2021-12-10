import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";
import { InventoryItem } from "../service/inventory";

const INVENTORY_ITEMS = "INVENTORY_ITEMS";
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

const getInventoryItems = async () => {
  return await new Promise(function (resolve, reject) {
    AsyncStorage.getItem(INVENTORY_ITEMS)
      .then((items) => {
        const result = items ? JSON.parse(items) : [];
        console.log("items in local storage: ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error fetching inventory items: ", err);
        resolve(null);
      });
  });
};

const setInventoryItems = async (items: InventoryItem[]) => {
  return await new Promise(function (resolve, reject) {
    AsyncStorage.setItem(INVENTORY_ITEMS, JSON.stringify(items))
      .then(() => {
        AsyncStorage.getItem(INVENTORY_ITEMS)
          .then((items) => {
            const result = items ? JSON.parse(items) : [];
            console.log("updated items in local storage: ", result);
            resolve(result);
          })
          .catch((err) => {
            console.log("Error fetching updated inventory items: ", err);
            resolve(null);
          });
      })
      .catch((err) => {
        console.log("Error setting inventory items: ", err);
        resolve(null);
      });
  });
};

const clearAsyncStorage = async () => {
  AsyncStorage.clear();
  return await new Promise(function (resolve, _reject) {
    AsyncStorage.getItem(INVENTORY_ITEMS)
      .then((items) => {
        const result = items ? JSON.parse(items) : [];
        console.log("items in local storage: ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error fetching inventory items: ", err);
        resolve(null);
      });
  });
};

const deviceStorage = {
  getInventoryItems,
  setInventoryItems,
  clearAsyncStorage,
  getSearchHistory,
  getClippedNews,
};

export default deviceStorage;
