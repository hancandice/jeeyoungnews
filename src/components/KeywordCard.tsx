import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

type KeywordCardProps = {
  item?: any;
  onKeywordPress?: () => void;
};

const KeywordCard = ({ item, onKeywordPress }: KeywordCardProps) => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      }}
      style={styles.keywordImageContainer}
      imageStyle={styles.keywordImage}
      resizeMode="cover"
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onKeywordPress}
        style={styles.keywordTextContainerView}
      >
        <Text style={styles.keywordText}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default KeywordCard;

const styles = StyleSheet.create({
  keywordImageContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    width: width * 0.2,
    height: height * 0.05,
    marginRight: 7,
  },
  keywordImage: {
    borderRadius: 6,
  },
  keywordTextContainerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: 6,
  },
  keywordText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    opacity: 1.0,
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
});
