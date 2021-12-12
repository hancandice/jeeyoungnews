import React, { useCallback } from "react";
import { FlatList } from "react-native";
import KeywordCard from "./KeywordCard";

type SearchHistoryProps = {
  data: string[];
  onKeywordPress: (item: string) => void;
};

const SearchHistory = ({ data, onKeywordPress }: SearchHistoryProps) => {
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <KeywordCard onKeywordPress={() => onKeywordPress(item)} item={item} />
    ),
    []
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      extraData={data}
      renderItem={renderItem}
    />
  );
};

export default React.memo(SearchHistory);
