import { useNavigation } from "@react-navigation/core";
import { setContext } from "@redux-saga/core/effects";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TextButton from "react-native-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalSelector from "react-native-modal-selector";
import SvgIconSet from "../../assets/images/icons/SvgIconSet";
import Colors from "../../constants/Colors";
import PictureSelector from "../components/PictureSelector";
import { usePostModal } from "../hooks/usePostModal";
import { InventoryItem, ItemType } from "../service/inventory";
import CameraScreen from "./CameraScreen";

export default React.memo(function PostModalScreen() {
  const [accAmount, { addItem }, data] = usePostModal();

  const [pictureURL, setPictureURL] = useState<null | string>(null);
  const [startCamera, setStartCamera] = useState(false);
  const [name, setName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  type InputType = "name" | "category" | "value" | "description";
  const [isFocused, setIsFocused] = useState({
    name: false,
    category: false,
    value: false,
    description: false,
  });
  const onNameFocus = useCallback(() => handleInputFocus("name"), []);
  const onNameBlur = useCallback(() => handleInputBlur("name"), []);
  const onCategoryFocus = useCallback(() => handleInputFocus("category"), []);
  const onCategoryBlur = useCallback(() => handleInputBlur("category"), []);
  const onValueFocus = useCallback(() => handleInputFocus("value"), []);
  const onValueBlur = useCallback(() => handleInputBlur("value"), []);
  const onDescriptionFocus = useCallback(
    () => handleInputFocus("description"),
    []
  );
  const onDescriptionBlur = useCallback(
    () => handleInputBlur("description"),
    []
  );
  const handleInputFocus = (input: InputType) => {
    setIsFocused((isFocused) => ({
      ...isFocused,
      [input]: true,
    }));
  };
  const handleInputBlur = (input: InputType) => {
    setIsFocused((isFocused) => ({
      ...isFocused,
      [input]: false,
    }));
  };

  const onNameChange = useCallback((_name) => {
    setName(_name);
  }, []);
  const onCategoryChange = useCallback((option) => {
    setType(option.label);
  }, []);
  const onValueChange = useCallback((_price) => {
    setPurchasePrice(_price);
  }, []);
  const onDescriptionChange = useCallback((_desc) => {
    setDescription(_desc);
  }, []);

  const onModalSelectorOpen = useCallback(
    () => categoryInput.current?.focus(),
    []
  );

  type category = {
    type: ItemType;
    label: string;
  };
  const categories: category[] = [
    { type: "ART", label: "Art" },
    { type: "ELECTRONICS", label: "Electronics" },
    { type: "JEWELRY", label: "Jewelry" },
    { type: "MUSIC_INSTRUMENT", label: "Musical instrument" },
  ];
  const categoryData = categories.map((category, index) => ({
    key: index,
    label: category.label,
  }));

  const borderColor = Colors.light.tint;
  const categoryInput = useRef() as RefObject<TextInput>;

  const cameraTurnOff = useCallback(() => {
    setStartCamera(false);
  }, []);

  const takePicture = useCallback((url: string) => {
    setPictureURL(url);
    setStartCamera(false);
  }, []);

  const navigation = useNavigation();
  const handleDismiss = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPost = (
    pictureURL: string,
    name: string,
    purchasePrice: string,
    type: ItemType,
    description: string
  ) => {
    console.log({ pictureURL, name, purchasePrice, type, description });

    const moneyRegex = new RegExp(/^\d+(\.\d{0,9})?$/);
    if (moneyRegex.test(purchasePrice) === false) {
      alert("Please enter the correct price.");
      return;
    }

    if (accAmount + parseInt(purchasePrice) > 40000) {
      alert(
        `The sum of all items cannot exceed 40,000€. The accumulated amount so far is ${accAmount}€, and you can only add items with an amount of ${
          40000 - accAmount
        }€ or less.`
      );
    } else {
      const nextId =
        data.length === 0 ? 1 : Math.max(...data.map((item) => item.id)) + 1;
      console.log("nextId", nextId);
      const itemObject: InventoryItem = {
        id: nextId,
        photo: pictureURL,
        name,
        type,
        purchasePrice,
        description,
      };
      addItem(itemObject);
      handleDismiss();
    }
  };

  return startCamera ? (
    <CameraScreen turnOff={cameraTurnOff} takePicture={takePicture} />
  ) : (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.modalHeaderContainer}>
        <TextButton
          testID="cancelButton"
          style={styles.buttonTxt}
          onPress={handleDismiss}
        >
          Cancel
        </TextButton>
        <TextButton
          testID="addButton"
          style={
            name && pictureURL && type && purchasePrice
              ? styles.buttonTxt
              : [styles.buttonTxt, { color: "#C0BEB8" }]
          }
          onPress={() =>
            onPost(
              pictureURL!!,
              name,
              purchasePrice,
              categories.find((category) => category.label === type)!!.type,
              description
            )
          }
          disabled={name && pictureURL && type && purchasePrice ? false : true}
        >
          Add
        </TextButton>
      </View>
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <PictureSelector
            pictureURL={pictureURL}
            setPictureURL={setPictureURL}
            setStartCamera={setStartCamera}
          />
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          onFocus={onNameFocus}
          onBlur={onNameBlur}
          style={
            isFocused.name
              ? [styles.inputContainer, { borderColor }]
              : styles.inputContainer
          }
          placeholder="Bracelet"
          placeholderTextColor="#C0BEB8"
          onChangeText={onNameChange}
          value={name}
          underlineColorAndroid="transparent"
        />
        <ModalSelector
          testID="modalSelector"
          onModalOpen={onModalSelectorOpen}
          style={{ width: "100%" }}
          touchableActiveOpacity={0.9}
          data={categoryData}
          sectionTextStyle={styles.sectionTextStyle}
          optionTextStyle={styles.optionTextStyle}
          optionContainerStyle={styles.optionContainerStyle}
          cancelContainerStyle={styles.cancelContainerStyle}
          cancelTextStyle={styles.cancelTextStyle}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          backdropPressToClose={true}
          cancelText={"Cancel"}
          initValue={type}
          onChange={onCategoryChange}
        >
          <Text style={styles.label}>Category</Text>
          <View
            style={
              isFocused.category
                ? [styles.rowContainer, { borderColor }]
                : styles.rowContainer
            }
          >
            <TextInput
              ref={categoryInput}
              onFocus={onCategoryFocus}
              onBlur={onCategoryBlur}
              style={styles.plainTxt}
              placeholder="Select a category..."
              placeholderTextColor="#C0BEB8"
              value={type}
              underlineColorAndroid="transparent"
            />
            <SvgIconSet.BottomArrowSmall />
          </View>
        </ModalSelector>
        <Text style={styles.label}>Value</Text>
        <View
          style={
            isFocused.value
              ? [styles.rowContainer, { borderColor }]
              : styles.rowContainer
          }
        >
          <TextInput
            onFocus={onValueFocus}
            onBlur={onValueBlur}
            maxLength={5}
            keyboardType="numeric"
            style={styles.plainTxt}
            placeholder="700"
            placeholderTextColor="#C0BEB8"
            onChangeText={onValueChange}
            value={purchasePrice}
            underlineColorAndroid="transparent"
          />
          <SvgIconSet.EurosIcon />
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          onFocus={onDescriptionFocus}
          onBlur={onDescriptionBlur}
          multiline={true}
          style={
            isFocused.description
              ? [styles.descriptionContainer, { borderColor }]
              : styles.descriptionContainer
          }
          placeholder="Optional"
          placeholderTextColor="#C0BEB8"
          onChangeText={onDescriptionChange}
          value={description}
          underlineColorAndroid="transparent"
        />
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F4F3EF",
    paddingTop: 16,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonTxt: {
    margin: 0,
    fontSize: 17,
    color: Colors.light.tint,
    backgroundColor: "transparent",
    fontWeight: "normal",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 150,
    width: 150,
    marginTop: 50,
  },
  plainTxt: {
    width: "90%",
    height: 42,
    textAlign: "left",
    color: "#2C2302",
  },
  inputContainer: {
    height: 42,
    borderWidth: 2,
    borderColor: "#EAE9E3",
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15,
    color: "#2C2302",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "left",
  },
  descriptionContainer: {
    height: 128,
    alignSelf: "baseline",
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 2,
    borderColor: "#EAE9E3",
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15,
    color: "#2C2302",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "left",
  },
  rowContainer: {
    height: 42,
    borderWidth: 2,
    borderColor: "#EAE9E3",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    color: "#2C2302",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    width: "100%",
    textAlign: "left",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionTextStyle: {
    color: "black",
    fontSize: 16,
  },
  selectedItemTextStyle: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  optionContainerStyle: {
    backgroundColor: "white",
  },
  cancelContainerStyle: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  sectionTextStyle: {
    fontSize: 21,
    color: "black",
    fontWeight: "bold",
  },

  cancelTextStyle: {
    fontSize: 21,
    color: "black",
  },
});
