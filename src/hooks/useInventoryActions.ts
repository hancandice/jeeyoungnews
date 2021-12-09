import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { inventoryActions } from "../modules/inventory/reducer";

export function useInventoryActions() {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(inventoryActions, dispatch),
    [dispatch]
  );
}
