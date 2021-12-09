import { useRootState } from "./useRootState";

export function useInventoryState() {
  const loading = useRootState((state) => state.inventory.loading);
  const error = useRootState((state) => state.inventory.error);
  const data = useRootState((state) => state.inventory.data);
  return { loading, error, data };
}
