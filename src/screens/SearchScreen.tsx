import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { TwoColumnListStyle } from "../../AppStyles";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import SearchBar from "../components/SearchBar";
import TNActivityIndicator from "../components/TNActivityIndicator";
import { useSearch } from "../hooks/useSearch";
import { NewsItem } from "../modules/search/types";

export default React.memo(function SearchScreen(
  props: RootTabScreenProps<"검색">
) {
  const [{ fetchNewsWithKeyword }, data, loading, error, retriedSearchHistory] =
    useSearch();

  const [keyword, setKeyword] = React.useState("");
  const [searchHistory, setSearchHistory] =
    React.useState<string[]>(retriedSearchHistory);

  const keyExtractor = React.useCallback((item) => item.id, []);

  const onSearchTextChange = React.useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const onSearchBarSubmit = () => {
    setSearchHistory((searchHistory) => searchHistory.concat(keyword));
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

  const onPress = () => {
    // console.log(webUrl);
  };

  const renderListingItem = React.useCallback(
    ({ item }: { item: NewsItem }) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={TwoColumnListStyle.listingItemContainer}>
            <Image
              resizeMode="cover"
              style={TwoColumnListStyle.listingPhoto}
              source={{ uri: item.photo }}
            />
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
      <Text>searchHistory: {searchHistory}</Text>
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
});
