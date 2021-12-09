import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, {
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet from "react-native-actionsheet";

import SvgIconSet from "../../assets/images/icons/SvgIconSet";

const imageSize = 150;
const photoIconSize = 32;

type PictureSelectorProps = {
  setStartCamera: React.Dispatch<SetStateAction<boolean>>;
  setPictureURL: React.Dispatch<SetStateAction<string | null>>;
  pictureURL: any;
};

export type ImageSource = {
  source: {
    uri: any;
  };
};

const PictureSelector = (props: PictureSelectorProps) => {
  const [pictureURL, setPictureURL] = useState(props.pictureURL || "");
  const actionSheet = useRef() as MutableRefObject<any>;

  const onImageError = useCallback(() => {
    Alert.alert(
      "",
      "An error occurred while trying to load picture!",
      [{ text: "OK" }],
      {
        cancelable: false,
      }
    );
    setPictureURL("");
  }, []);

  const onPressAddGallaryPhotoBtn = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPictureURL(result.uri);
      props.setPictureURL(result.uri);
    }
  }, []);

  const onPressAddCameraPhotoBtn = useCallback(() => {
    props.setStartCamera(true);
  }, []);

  const removePhoto = useCallback(() => {
    setPictureURL(null);
    props.setPictureURL(null);
  }, []);

  const onActionDone = useCallback((index: number) => {
    if (index === 0) {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } = await Camera.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
          } else {
            onPressAddCameraPhotoBtn();
          }
        }
      })();
    }
    if (index === 1) {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          } else {
            onPressAddGallaryPhotoBtn();
          }
        }
      })();
    }
    if (index === 3) {
      if (pictureURL) {
        setPictureURL(null);
        props.setPictureURL(null);
      }
    }
  }, []);

  const showActionSheet = useCallback(() => {
    actionSheet.current.show();
  }, []);

  const onPressPictureButton = useCallback(() => {
    console.log("Picture url: ", pictureURL);
    showActionSheet();
  }, []);

  const onPressActionSheet = useCallback((index: number) => {
    onActionDone(index);
  }, []);

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          testID="pictureButton"
          style={styles.imageContainer}
          onPress={onPressPictureButton}
        >
          {pictureURL ? (
            <Image
              style={styles.image}
              source={{ uri: pictureURL }}
              resizeMode="cover"
              onError={onImageError}
            />
          ) : (
            <SvgIconSet.DefaultPhotoIcon />
          )}
        </TouchableHighlight>
        {pictureURL ? (
          <TouchableOpacity style={styles.removeButton} onPress={removePhoto}>
            <SvgIconSet.TrashBinIcon />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={"Confirm action"}
          options={[
            "Take Photo",
            "Get Photo From Gallary",
            "Cancel",
            "Remove Photo",
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={3}
          onPress={onPressActionSheet}
        />
      </ScrollView>
    </>
  );
};

export default React.memo(PictureSelector);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageBlock: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    borderColor: "#EAE9E3",
    borderStyle: "dashed",
    borderWidth: 3,
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize,
    overflow: "hidden",
  },

  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6d6d6",
    opacity: 1,
    zIndex: 2,
    marginTop: imageSize * 0.77,
    marginLeft: Platform.OS === "ios" ? -imageSize * 0.29 : -imageSize * 0.25,
    width: photoIconSize,
    height: photoIconSize,
    borderRadius: photoIconSize,
  },
  closeButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginRight: 15,
    backgroundColor: "#D95762",
    width: 28,
    height: 28,
    borderRadius: 20,
    overflow: "hidden",
  },
  closeIcon: {
    width: 27,
    height: 27,
  },
});
