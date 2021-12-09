import deviceStorage from "../utils/DeviceStorage";

export type ItemType = "ART" | "ELECTRONICS" | "JEWELRY" | "MUSIC_INSTRUMENT";

async function getItems() {
  return deviceStorage.getInventoryItems();
}

async function addItem(prevItems: InventoryItem[], newItem: InventoryItem) {
  const nextItems = prevItems.concat(newItem);
  return deviceStorage.setInventoryItems(nextItems);
}

async function clearItems() {
  return deviceStorage.clearAsyncStorage();
}

export interface InventoryItem {
  id: number;
  name: string;
  purchasePrice: string;
  type: ItemType;
  description: string | null;
  photo: string;
}

const inventoryService = {
  getItems,
  addItem,
  clearItems,
};

export default inventoryService;
