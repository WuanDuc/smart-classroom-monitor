/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
//import liraries

import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  IMG_APPICON,
  IMG_HISTORY,
  IMG_UPLOAD,
} from "../../assets/images/index";
import FONTS from "../../constants/font";
import { COLORS } from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
import scale from "../../constants/responsive";

// create a component
const MainScreen = () => {
  const [cameraRollPer, setCameraRollPer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nvg = useNavigation();
  const [timeLoading, setTimeLoading] = useState<number>(0);
  const countRef: any = useRef(null);
  const UploadImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const permission = await ImagePicker.getCameraPermissionsAsync();
    permission.canAskAgain = true;
    setIsLoading(false);
    if (permission == null || !permission.granted) {
      Alert.alert("We don't have Media Library Permission!");
      return;
    }
    await pickMedia();
  };

  const pickMedia = async () => {
    setCameraRollPer(cameraRollPer);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (result.canceled) {
      setIsLoading(false);
      clearInterval(countRef.current);
      setTimeLoading(0);
      return;
    }
    setIsLoading(true);
    setTimeLoading(0);
    countRef.current = setInterval(() => {
      setTimeLoading((timeLoading) => timeLoading + 1);
      if (timeLoading == 500) {
        setIsLoading(false);
        clearInterval(countRef.current);
        setTimeLoading(0);
      }
    }, 1000);
    if (result.assets === null) {
      return;
    }
    if (result.assets[0].type === "image") {
      const uri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const extension = fileInfo.uri.split(".").pop();
      console.log(extension);
      const type = result.assets[0].type + "/" + extension;
      const name = uri.split("/").pop();
      const source = {
        uri,
        type,
        name,
      };
      await UploadImageToServer(source);
    } else {
      console.log(result);
      const uri = result.assets[0].uri;
      const type = result.assets[0].mimeType;
      const name = uri.split("/").pop();
      const source = {
        uri,
        type,
        name,
      };
      console.log("upload video");
      console.log(uri);
      console.log(type);
      console.log(name);
      await UploadImageToServer(source);
    }
  };

  const UploadImageToServer = async (photo: any) => {
    const formData = new FormData();
    const file = {
      uri: photo.uri,
      type: photo.type,
      name: photo.name,
    };
    formData.append("file", file);
    if (file.type.match(/^image\//)) {
      const res = await fetch(
        "http://10.172.6.5:5000/image",
      // const res = await fetch(
      //   "https://facedetectionbackend-adcg.onrender.com/image",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
        // .then((response) => {
        //   // JSON.parse(JSON.stringify(response));
        //   console.log("ok: ", response.ok);

        //   if (response.ok == false) {
        //     return;
        //   }
        //   const url = response.url;
        //   const emotion_counts = response.emotion_counts;
        //   setIsLoading(false);
        //   clearInterval(countRef.current);
        //   setTimeLoading(0);

        //   nvg.navigate("ShowImageScreen/index", {
        //     uri: url,
        //     content_type: file.type,
        //     emotion: JSON.stringify(emotion_counts),
        //     isHistory: "false",
        //   });
        // })
        .then((response) => {
          console.log(response);
          if (response.ok == true) {
            response.json().then(async (responseJson) => {
              console.log(responseJson);
              // if (responseJson.ok == false) {
              //   return;
              // }
              const url = responseJson.url;
              const emotion_counts = responseJson.emotion_counts;
              setIsLoading(false);
              clearInterval(countRef.current);
              setTimeLoading(0);

              nvg.navigate("ShowImageScreen/index", {
                uri: url,
                content_type: file.type,
                emotion: JSON.stringify(emotion_counts),
                isHistory: "false",
              });
            });
          } else {
            Alert.alert(
              "Detection process failed",
              "An error occurred during the detection process, please try again in a few minutes.\nStatus code: " +
                response.status
            );
            setIsLoading(false);
            clearInterval(countRef.current);
            setTimeLoading(0);
          }
        })
        // .then(async (responseJson) => {
        //   console.log(responseJson);
        //   if (responseJson.ok == false) {
        //     return;
        //   }
        //   const url = responseJson.url;
        //   const emotion_counts = responseJson.emotion_counts;
        //   setIsLoading(false);
        //   clearInterval(countRef.current);
        //   setTimeLoading(0);

        //   nvg.navigate("ShowImageScreen/index", {
        //     uri: url,
        //     content_type: file.type,
        //     emotion: JSON.stringify(emotion_counts),
        //     isHistory: "false",
        //   });
        // })
        .catch((error) => {
          Alert.alert(
            "Detection process failed",
            "An error occurred during the detection process, please try again in a few minutes.\nStatus code: " +
              error
          );
          setIsLoading(false);
          clearInterval(countRef.current);
          setTimeLoading(0);
        });
      console.log("image res: ", res);
    } else {
      const res = await fetch(       
        "http://10.172.6.5:5000/video",
        // "https://facedetectionbackend-adcg.onrender.com/video",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
        // .then((response) => {
        //   try {
        //     console.log(response.ok);
        //     JSON.parse(response);
        //   } catch (error: any) {
        //     Alert.alert("Fail", "Detection process failed");
        //     return;
        //   }
        // })
        // .then((response) => response.json())
        // .then(async (responseJson) => {
        //   if (responseJson.ok == false) {
        //     return;
        //   }
        //   const url = responseJson.url;
        //   const emotion_counts = responseJson.emotion_counts;

        //   setIsLoading(false);
        //   clearInterval(countRef.current);
        //   setTimeLoading(0);
        //   nvg.navigate("ShowImageScreen/index", {
        //     uri: url,
        //     content_type: file.type,
        //     emotion: JSON.stringify(emotion_counts),
        //     isHistory: "false",
        //   });
        // })
        .then((response) => {
          console.log(response);
          if (response.ok == true) {
            response.json().then(async (responseJson) => {
              console.log(responseJson);
              // if (responseJson.ok == false) {
              //   return;
              // }
              const url = responseJson.url;
              const emotion_counts = responseJson.emotion_counts;
              setIsLoading(false);
              clearInterval(countRef.current);
              setTimeLoading(0);

              nvg.navigate("ShowImageScreen/index", {
                uri: url,
                content_type: file.type,
                emotion: JSON.stringify(emotion_counts),
                isHistory: "false",
              });
            });
          } else {
            Alert.alert(
              "Detection process failed",
              "An error occurred during the detection process, please try again in a few minutes.\nStatus code: " +
                response.status
            );
            setIsLoading(false);
            clearInterval(countRef.current);
            setTimeLoading(0);
          }
        })
        .catch((error) => {
          Alert.alert(
            "Detection process failed",
            "An error occurred during the detection process, please try again in a few minutes.\nStatus code: " +
              error
          );
          setIsLoading(false);
          clearInterval(countRef.current);
          setTimeLoading(0);
        });
    }
  };

  const handleHistory = () => {
    nvg.navigate("History/index");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: scale(50),
          width: "100%",
          marginTop: scale(20),
          alignItems: "flex-end",
        }}
      />
      <View style={styles.mainView}>
        <Image source={IMG_APPICON} />
        <Text
          style={[
            styles.text,
            {
              marginTop: scale(10),
              textAlign: "center",
              fontSize: 30,
              width: "85%",
            },
          ]}
        >
          EmoScan
        </Text>
        <Text
          style={[
            styles.text,
            { marginBottom: scale(25), fontSize: 30, width: "85%" },
          ]}
        >
          Classroom Monitoring
        </Text>
        <TouchableOpacity
          onPress={UploadImage}
          style={styles.button}
          disabled={isLoading}
        >
          <Text
            style={!isLoading ? styles.text : [styles.text, { color: "gray" }]}
          >
            Upload File
          </Text>
          <Image style={styles.buttonImage} source={IMG_UPLOAD} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={isLoading}
          onPress={handleHistory}
        >
          <Text
            style={!isLoading ? styles.text : [styles.text, { color: "gray" }]}
          >
            History
          </Text>
          <Image style={styles.buttonImage} source={IMG_HISTORY} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.waitingText, { opacity: isLoading ? 1 : 0 }]}>
        {"Wait for the detection process ... (" + timeLoading + "s)"}
      </Text>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.lightGreen,
  },
  historyImage: {
    width: 40,
    height: 33,
    marginRight: 20,
  },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  text: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 25,
    color: COLORS.black,
    width: "80%",
  },
  button: {
    width: "83%",
    height: "11%",
    alignItems: "center",
    backgroundColor: COLORS.grayButton,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: scale(30),
    borderRadius: 23,
    borderColor: COLORS.green,
    borderWidth: 2,
    shadowColor: COLORS.green,
    shadowOpacity: 0.8,
    elevation: 5,
    shadowRadius: 23,
    shadowOffset: { width: 1, height: 13 },
  },
  buttonImage: {
    width: 55,
    height: 55,
  },
  waitingText: {
    color: COLORS.black,
    position: "absolute",
    bottom: scale(60),
    fontFamily: FONTS.Lato.Bold,
    fontSize: 20,
  },
  aboutUsText: {
    textDecorationLine: "underline",
    color: COLORS.black,
    fontSize: 20,
    fontFamily: FONTS.Lato.Bold,
    position: "absolute",
    bottom: scale(8),
  },
});

//make this component available to the app
export default MainScreen;
