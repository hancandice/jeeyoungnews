import { Camera } from "expo-camera";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  turnOff: () => void;
  takePicture: (uri: string) => void;
};

const CameraScreen = ({ turnOff, takePicture }: Props) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const snap = useCallback(async () => {
    //@ts-ignore
    const picture = await cameraRef.current?.takePictureAsync();
    takePicture(picture.uri);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer} />
      <Camera
        testID="expoCamera"
        style={styles.camera}
        type={type}
        ref={cameraRef}
      ></Camera>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={turnOff} hitSlop={8}>
          <Text style={styles.text}> Cancel </Text>
        </Pressable>
        <Pressable style={styles.snap} onPress={snap}>
          <View style={styles.inner} />
        </Pressable>
        <View style={{ height: 60, width: 40, flex: 1 }} />
      </View>
    </View>
  );
};

export default React.memo(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topContainer: {
    backgroundColor: "black",
    width: "100%",
    height: 148,
  },
  buttonContainer: {
    backgroundColor: "black",
    padding: 20,
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "space-between",
    width: "100%",
    height: 148,
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  snap: {
    marginBottom: 20,
    width: 66,
    aspectRatio: 1,
    borderRadius: 33,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  inner: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 2,
  },
});
