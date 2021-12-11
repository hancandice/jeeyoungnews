import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import SvgIconSet from "../../assets/images/icons/SvgIconSet";
import Colors from "../../constants/Colors";
import { RootStackScreenProps } from "../../types";

export default function WebViewScreen({
  navigation,
  route,
}: RootStackScreenProps<"WebView">) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <SvgIconSet.LeftArrow size={20} />
        </TouchableOpacity>
        <View></View>
      </View>
      <WebView source={{ uri: route.params.webUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  rowContainer: {
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
