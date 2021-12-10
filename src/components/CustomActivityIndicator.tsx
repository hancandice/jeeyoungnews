import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from "../../AppStyles";

type CustomActivityIndicatorProps = {};

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const CustomActivityIndicator = (props: CustomActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicatorContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color={generateColor()} />
        <ActivityIndicator size="small" color={generateColor()} />
        <ActivityIndicator size="large" color={generateColor()} />
        <ActivityIndicator size="small" color={generateColor()} />
        <ActivityIndicator size="large" color={generateColor()} />
      </View>
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  indicatorContainer: {
    width: SCREEN_WIDTH - 100,
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    position: "absolute",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
