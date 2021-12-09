import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";

export default function RealtyScreen({
  navigation,
}: RootTabScreenProps<"Realty">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F3EF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
