import * as React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TwoColumnListStyle } from "../../AppStyles";
import SvgIconSet from "../../assets/images/icons/SvgIconSet";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import TNActivityIndicator from "../components/TNActivityIndicator";
import { useClipped } from "../hooks/useClipped";
import { NewsItem } from "../modules/search/types";
import deviceStorage from "../utils/DeviceStorage";

export default React.memo(function ClippedScreen(
  props: RootTabScreenProps<"클립한뉴스">
) {
  const [actions, clippedNews, loading] = useClipped();

  const onNewsPress = (item: NewsItem) => {
    props.navigation.navigate("WebView", {
      webUrl: item.web_url,
    });
  };

  const unclipNews = (item: NewsItem) => {
    console.log("news item: ", item);
    if (item.clipped === true) {
      actions.unclip(item.id);
    }
  };

  const renderListingItem = React.useCallback(
    ({ item }: { item: NewsItem }) => {
      return (
        <TouchableOpacity onPress={() => onNewsPress(item)}>
          <View style={TwoColumnListStyle.listingItemContainer}>
            <Image
              resizeMode="cover"
              style={TwoColumnListStyle.listingPhoto}
              source={{ uri: item.photo }}
            />
            <TouchableOpacity
              style={styles.unclipButton}
              onPress={() => unclipNews(item)}
            >
              {item.clipped ? <SvgIconSet.TrashBinIcon size={25} /> : null}
            </TouchableOpacity>
            <Text style={TwoColumnListStyle.listingTitle}>
              {item.headline_main}
            </Text>
            <Text style={TwoColumnListStyle.listingPubDate}>
              ✍🏻 {item.pub_date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    []
  );

  const keyExtractor = React.useCallback((item) => `${item.id}`, []);

  const onContentSizeChange = React.useCallback(
    () => scrollViewRef.current?.scrollToEnd({ animated: true }),
    []
  );

  const scrollViewRef = React.useRef() as React.RefObject<FlatList<NewsItem>>;

  const onLongPress = React.useCallback(() => {
    deviceStorage.clearAsyncStorage();
    Alert.alert("device storage cleared!");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.boldTxt}>클립한 뉴스</Text>
        <TouchableOpacity onLongPress={onLongPress}>
          <SvgIconSet.ClipIcon size={35} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={scrollViewRef}
        onContentSizeChange={onContentSizeChange}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        numColumns={2}
        data={clippedNews}
        renderItem={renderListingItem}
        keyExtractor={keyExtractor}
      />
      {loading && <TNActivityIndicator />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.light.background,
    flex: 1,
    justifyContent: "center",
  },
  rowContainer: {
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 63,
    marginBottom: 15,
  },
  boldTxt: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#2C2302",
  },
  unclipButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6d6d6",
    opacity: 1,
    zIndex: 2,
    marginTop: -35,
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});
