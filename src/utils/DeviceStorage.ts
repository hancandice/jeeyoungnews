// import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage } from "react-native";
import { InventoryItem } from "../service/inventory";

const INVENTORY_ITEMS = "INVENTORY_ITEMS";

const getInventoryItems = () => {
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, _reject) {
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
};

export default deviceStorage;
