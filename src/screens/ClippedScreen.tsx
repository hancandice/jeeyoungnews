import * as React from "react";
import {
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
import ActivityIndicator from "../components/ActivityIndicator";
import { useInventoryState } from "../hooks/useInventoryState";
import { InventoryItem } from "../service/inventory";
import deviceStorage from "../utils/DeviceStorage";

export default React.memo(function ClippedScreen(
  props: RootTabScreenProps<"클립한뉴스">
) {
  const { loading, error, data } = useInventoryState();

  const renderListingItem = React.useCallback(
    ({ item }: { item: InventoryItem }) => {
      return (
        <View style={TwoColumnListStyle.listingItemContainer}>
          <Image
            resizeMode="cover"
            style={TwoColumnListStyle.listingPhoto}
            source={{ uri: item.photo }}
          />
          <Text style={TwoColumnListStyle.listingName}>{item.name}</Text>
          <Text style={TwoColumnListStyle.listingPrice}>
            €{item.purchasePrice}
          </Text>
        </View>
      );
    },
    []
  );

  const keyExtractor = React.useCallback((item) => `${item.id}`, []);

  const onLongPress = React.useCallback(() => {
    deviceStorage.clearAsyncStorage();
    alert("Cleared AsyncStorage");
  }, []);

  const onPress = React.useCallback(() => {
    props.navigation.navigate("PostModal");
  }, [props.navigation.navigate]);

  const onContentSizeChange = React.useCallback(
    () => scrollViewRef.current?.scrollToEnd({ animated: true }),
    []
  );

  const scrollViewRef = React.useRef() as React.RefObject<
    FlatList<InventoryItem>
  >;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.boldTxt}>클립한 뉴스</Text>
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
          <SvgIconSet.AddIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={scrollViewRef}
        onContentSizeChange={onContentSizeChange}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        numColumns={2}
        data={data}
        renderItem={renderListingItem}
        keyExtractor={keyExtractor}
      />
      {loading && <ActivityIndicator />}
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
});
