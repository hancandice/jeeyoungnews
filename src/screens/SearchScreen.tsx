import * as React from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { TwoColumnListStyle } from "../../AppStyles";
import SvgIconSet from "../../assets/images/icons/SvgIconSet";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../../types";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import TNActivityIndicator from "../components/TNActivityIndicator";
import { useSearch } from "../hooks/useSearch";
import { NewsItem } from "../modules/search/types";

export default React.memo(function SearchScreen(
  props: RootTabScreenProps<"검색">
) {
  const [
    { fetchNewsWithKeyword, clip },
    data,
    loading,
    error,
    retrievedSearchHistory,
  ] = useSearch();

  const [keyword, setKeyword] = React.useState("");
  const keyExtractor = React.useCallback((item) => item.id, []);

  const onSearchTextChange = React.useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const onSearchBarSubmit = () => {
    fetchNewsWithKeyword({
      keyword,
      first: true,
    });
  };

  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      fetchNewsWithKeyword({
        keyword,
        first: false,
      });
    }
  };

  const onNewsPress = (item: NewsItem) => {
    props.navigation.navigate("WebView", {
      webUrl: item.web_url,
    });
  };

  const clipNews = (item: NewsItem) => {
    console.log("news item: ", item);
    if (item.clipped === false) {
      clip({ ...item, clipped: !item.clipped });
    }
  };

  const onKeywordPress = (keyword: string) => {
    console.log("keyword", keyword);
    setKeyword(keyword);
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
              style={styles.clipButton}
              onPress={() => clipNews(item)}
            >
              {item.clipped ? (
                <SvgIconSet.CheckedCircle size={25} />
              ) : (
                <SvgIconSet.ClipIcon size={25} />
              )}
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

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          onChangeText={onSearchTextChange}
          placeholderTitle={"Enter keywords (e.g., election)"}
          onSearchBarSubmit={onSearchBarSubmit}
          value={keyword}
        />
      </View>
      <View style={{ paddingVertical: 10 }}>
        <SearchHistory
          data={retrievedSearchHistory}
          onKeywordPress={onKeywordPress}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        numColumns={2}
        data={data}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        renderItem={renderListingItem}
        keyExtractor={keyExtractor}
      />
      {error && <CustomActivityIndicator />}
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
  searchBarContainer: {
    backgroundColor: Colors.light.background,
    height: 70,
    paddingVertical: 5,
    ...ifIphoneX(
      {
        marginTop: 45,
      },
      {
        marginTop: 12,
      }
    ),
    ...Platform.select({
      ios: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.hairline,
      },
      android: {
        marginHorizontal: 12,
      },
      default: {},
    }),
  },
  boldTxt: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#2C2302",
  },
  clipButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.grey6,
    opacity: 1,
    zIndex: 2,
    marginTop: -35,
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});
