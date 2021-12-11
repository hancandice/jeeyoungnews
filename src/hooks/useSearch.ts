import { useClippedActions } from "./useClippedActions";
import { useRootState } from "./useRootState";
import { useSearchActions } from "./useSearchActions";

export function useSearch() {
  const searchActions = useSearchActions();
  const data = useRootState((state) => state.search.data);
  const loading = useRootState((state) => state.search.loading);
  const error = useRootState((state) => state.search.error);
  const searchHistory = useRootState((state) => state.search.searchHistory);

  return [searchActions, data, loading, error, searchHistory] as const;
}
