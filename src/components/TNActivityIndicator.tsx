import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

type TNActivityIndicatorProps = {
  text?: string;
};

const TNActivityIndicator = (props: TNActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <UIActivityIndicator
          color="#f5f5f5"
          size={30}
          animationDuration={400}
        />
        {props.text && props.text.length > 1 && (
          <Text style={styles.text}>{props.text}</Text>
        )}
      </View>
    </View>
  );
};

export default React.memo(TNActivityIndicator);

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
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginBottom: 20,
  },
});
