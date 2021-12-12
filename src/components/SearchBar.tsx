import React from "react";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

type SearchBarProps = {
  placeholderTitle: string;
  onChangeText: (text: string) => void;
  onSearchBarSubmit: () => void;
  value: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { placeholderTitle, onChangeText, onSearchBarSubmit, value } = props;

  const searchIcon = require("../../assets/images/icons/search.png");

  return (
    <View style={styles.searchBoxContainer}>
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width - 100, borderRadius: 9 },
        ]}
      >
        <Image style={styles.searchIcon} source={searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholderTitle}
          onChangeText={onChangeText}
          defaultValue={value}
        />
      </View>
      <Button onPress={onSearchBarSubmit} title="검색" type="clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.grey3,
    margin: 8,
    paddingLeft: 8,
    borderRadius: 12,
    height: 37,
  },
  searchIcon: {
    height: 15,
    width: 15,
    tintColor: Colors.light.grey9,
    marginRight: 1,
  },
  searchInput: {
    padding: 4,
    paddingLeft: 4,
    fontSize: 15,
    width: 250,
    color: Colors.light.grey9,
    backgroundColor: Colors.light.grey3,
  },
  cancelButton: {
    fontSize: 18,
    color: "#0A84FF",
    fontWeight: "500",
    marginRight: 5,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
