import { Platform, StyleSheet, Dimensions } from "react-native";
import { Configuration } from "./Configuration";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;
export const imageSize = height * 0.14;

export const iconSet = {
  defaultPhoto: require("./assets/images/default-photo.jpg"),
};

export const AppStyles = {
  color: {
    main: "#ff5a66",
    text: "#4b4f52",
    title: "#464646",
    subtitle: "#6B6651",
    categoryTitle: "#2C2302",
    tint: "#ff5a66",
    description: "#bbbbbb",
    filterTitle: "#8a8a8a",
    starRating: "#ff5a66",
    location: "#a9a9a9",
    white: "white",
    facebook: "#4267b2",
    grey: "grey",
    greenBlue: "#ff5a66",
    placeholder: "#a0a0a0",
    background: "#f2f2f2",
    blue: "#3293fe",
  },
  navThemeConstants: {
    light: {
      backgroundColor: "#fff",
      fontColor: "#000",
      secondaryFontColor: "#7e7e7e",
      activeTintColor: "#458eff",
      inactiveTintColor: "#ccc",
      hairlineColor: "#e0e0e0",
    },
    dark: {
      backgroundColor: "#121212",
      fontColor: "#fff",
      secondaryFontColor: "#fff",
      activeTintColor: "#3875e8",
      inactiveTintColor: "#888",
      hairlineColor: "#222222",
    },
    main: "#3875e8",
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16,
  },
  buttonWidth: {
    main: "70%",
  },
  textInputWidth: {
    main: "80%",
  },
  fontName: {
    main: "FontAwesome",
    bold: "FontAwesome",
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
};

export const HeaderButtonStyle = StyleSheet.create({
  multi: {
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  image: {
    justifyContent: "center",
    width: 35,
    height: 35,
    margin: 6,
  },
  rightButton: {
    color: AppStyles.color.tint,
    marginRight: 10,
    fontWeight: "normal",
    fontFamily: AppStyles.fontName.main,
  },
});

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.subtitle,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 10,
  },
  leftSubtitle: {
    flex: 2,
  },
  time: {
    color: AppStyles.color.description,
    fontFamily: AppStyles.fontName.main,
    flex: 1,
    textAlignVertical: "bottom",
  },
  place: {
    fontWeight: "bold",
    color: AppStyles.color.location,
  },
  price: {
    flex: 1,
    fontSize: 14,
    color: AppStyles.color.subtitle,
    fontFamily: AppStyles.fontName.bold,
    textAlignVertical: "bottom",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  avatarStyle: {
    height: 80,
    width: 80,
  },
});

export const TwoColumnListStyle = {
  listings: {
    marginTop: 15,
    width: "100%",
    flex: 1,
  },
  showAllButtonContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: AppStyles.color.greenBlue,
    height: 50,
    width: "100%",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  showAllButtonText: {
    textAlign: "center",
    color: AppStyles.color.greenBlue,
    fontFamily: AppStyles.fontName.bold,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  listingItemContainer: {
    shadowColor: "rgba(6, 8, 13, 0.2)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 15,
    borderRadius: 14,
    marginVertical: 20,
    marginRight: Configuration.inventory.listing_item.offset,
    width:
      (SCREEN_WIDTH - Configuration.inventory.listing_item.offset * 3) /
      numColumns,
  },
  photo: {
    // position: "absolute",
  },
  listingPhoto: {
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    width:
      (SCREEN_WIDTH - Configuration.inventory.listing_item.offset * 3) /
      numColumns,
    height: Configuration.inventory.listing_item.height,
  },
  listingTitle: {
    paddingHorizontal: 20,
    paddingTop: 15,
    fontSize: 19,
    height: 52,
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.categoryTitle,
    marginTop: 5,
  },
  listingPubDate: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.subtitle,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
};

export const ModalSelectorStyle = {
  optionTextStyle: {
    color: AppStyles.color.subtitle,
    fontSize: 16,
    fontFamily: AppStyles.fontName.main,
  },
  selectedItemTextStyle: {
    fontSize: 18,
    color: AppStyles.color.blue,
    fontFamily: AppStyles.fontName.main,
    fontWeight: "bold",
  },
  optionContainerStyle: {
    backgroundColor: AppStyles.color.white,
  },
  cancelContainerStyle: {
    backgroundColor: AppStyles.color.white,
    borderRadius: 10,
  },
  sectionTextStyle: {
    fontSize: 21,
    color: AppStyles.color.title,
    fontFamily: AppStyles.fontName.main,
    fontWeight: "bold",
  },

  cancelTextStyle: {
    fontSize: 21,
    color: AppStyles.color.blue,
    fontFamily: AppStyles.fontName.main,
  },
};

export default AppStyles;
