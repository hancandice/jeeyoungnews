import { InventoryItem } from "../../service/inventory";

export type InventoryState = {
  loading: boolean;
  error: any;
  data: InventoryItem[];
};
