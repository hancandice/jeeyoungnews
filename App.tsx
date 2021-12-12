import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./navigation";
import configureStore from "./src/redux/store/index";

const store = configureStore();

import { LogBox } from "react-native";
LogBox.ignoreLogs([]);

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
