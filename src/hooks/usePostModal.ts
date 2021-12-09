import { useMemo } from "react";
import { useInventoryActions } from "./useInventoryActions";
import { useRootState } from "./useRootState";

export function usePostModal() {
  const data = useRootState((state) => state.inventory.data);
  const accAmount = useMemo(
    () =>
      data.reduce((acc, current) => acc + parseInt(current.purchasePrice), 0),
    [data]
  );

  // const accAmount = useSelector(
  //   createSelector(
  //     (state: RootState) => state.inventory.data,
  //     (data) =>
  //       data.reduce((acc, current) => acc + parseInt(current.purchasePrice), 0)
  //   )
  // );

  const actions = useInventoryActions();

  return [accAmount, actions, data] as const;
}
