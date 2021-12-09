import React from "react";
import { Provider } from "react-redux";
import { RootState } from "../redux";
import configureStore from "../redux/store";
import { NavigationContainer } from "@react-navigation/native";

function prepareReduxWrapper(initialState?: RootState) {
  const store = configureStore(initialState);
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store as any}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    );
  };
  return [wrapper, store] as const;
}

export default prepareReduxWrapper;
