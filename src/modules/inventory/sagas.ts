import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import { RootState } from "../../redux";
import inventoryService, { InventoryItem } from "../../service/inventory";
import { inventoryActions } from "./reducer";

export const getInventory = (state: RootState) => state.inventory;

export function* getInventoryItemsSaga() {
  while (true) {
    console.log("fetching inventory items...");
    const items: InventoryItem[] | null = yield call(inventoryService.getItems);
    if (items) {
      yield put(inventoryActions.receiveItems(items));
      break;
    } else {
      yield delay(1000);
    }
  }
}

export function* addItemSaga(
  action: ReturnType<typeof inventoryActions.addItem>
) {
  const { data } = yield select(getInventory);
  try {
    const newItemList: InventoryItem[] = yield call(
      inventoryService.addItem,
      data,
      action.payload
    );
    yield put(inventoryActions.addItemSuccess(newItemList));
  } catch (e: any) {
    yield put(inventoryActions.addItemError(e));
  }
}

export default function* inventorySaga() {
  yield call(getInventoryItemsSaga);
  yield takeLatest(inventoryActions.addItem.type, addItemSaga);
}
