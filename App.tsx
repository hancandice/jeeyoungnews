import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import configureStore from "./src/redux/store/index";

process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() === "production"
    ? "production"
    : "development";

const store = configureStore();

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
  "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
  "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

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
