import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { searchActions } from "../modules/search/reducer";

export function useSearchActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(searchActions, dispatch), [dispatch]);
}
