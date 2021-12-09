import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { newsActions } from "../modules/news/reducer";

export function useNewsActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(newsActions, dispatch), [dispatch]);
}
