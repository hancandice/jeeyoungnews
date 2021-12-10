import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { clippedActions } from "../modules/clipped/reducer";

export function useClippedActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(clippedActions, dispatch),
    [dispatch]
  );
}
