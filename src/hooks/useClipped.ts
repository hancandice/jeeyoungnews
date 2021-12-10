import { useClippedActions } from "./useClippedActions";
import { useRootState } from "./useRootState";

export function useClipped() {
  const clippedNews = useRootState((state) => state.clipped.data);
  const loading = useRootState((state) => state.clipped.loading);

  const actions = useClippedActions();

  return [actions, clippedNews, loading] as const;
}
