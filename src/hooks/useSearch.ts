import { useNewsActions } from "./useNewsActions";
import { useRootState } from "./useRootState";

export function useSearch() {
  const actions = useNewsActions();
  const data = useRootState((state) => state.news.data);
  const loading = useRootState((state) => state.news.loading);
  const error = useRootState((state) => state.news.error);
  const searchHistory = useRootState((state) => state.news.searchHistory);

  return [actions, data, loading, error, searchHistory] as const;
}
