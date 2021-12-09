import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Navigation from "../../navigation";
import { RootState } from "../redux";
import { NavigationContainer } from "@react-navigation/native";

function prepareMockReduxWrapper(initialState?: RootState) {
  const store = configureMockStore()(initialState);
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store as any}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    );
  };
  return [wrapper, store] as const;
}

export default prepareMockReduxWrapper;
