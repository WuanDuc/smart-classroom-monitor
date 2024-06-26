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
//import { Cloudinary } from "@cloudinary/url-gen";
// import * as FS from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import { storeData, getData } from "@/utils/utils";
// import {Buffer} from 'buffer';
// import axios from 'axios';
import { useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
// import * as FileSystem from 'expo-file-system';
import scale from "../../constants/responsive";

// create a component
const MainScreen = ({ props, route, navigation }) => {
  const [cameraRollPer, setCameraRollPer] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({});
  const [uri, setUri] = useState();
  const nvg = useNavigation();
  // const [timeLoading, setTimeLoading] = useState(0);
  // const [uri, setUri] = useState();
  // const countRef = useRef(null);
  const UploadImage = async () => {
    console.log("acb");
    await ImagePicker.requestCameraPermissionsAsync();
    const permission = await ImagePicker.getCameraPermissionsAsync();
    permission.canAskAgain = true;
    console.log(permission);
    if (permission == null || !permission.granted) {
      Alert.alert("We don't have Media Library Permission!");
      return;
    }
    setIsLoading(true);

    await pickMedia();
  };

  const pickMedia = async () => {
    setCameraRollPer(cameraRollPer), setDisableButton(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (result.canceled) {
      console.log("there is nothing");
      setIsLoading(false);
      return;
    }
    // console.log('result:', result);
    if (result.assets === null) {
      return;
    }
    if (result.assets[0].type === "image") {
      console.log("uri", result.assets[0].uri);

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
      console.log(source);
      await UploadImageToServer(source);
    } else {
      console.log(result);
      const uri = result.assets[0].uri;
      const type = result.assets[0].type + "/mp4";
      const name = uri.split("/").pop();
      const source = {
        uri,
        type,
        name,
      };
      console.log(source.name);
      await UploadImageToServer(source);
    }
  };
  const generateRandomId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
  };
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const UploadImageToServer = async (photo) => {
    const data = new FormData();
    // data.append('file', photo);
    // data.append('upload_preset', 'videoApp');
    // data.append('cloud_name', 'dpej7xgsi');
    // fetch('https://api.cloudinary.com/v1_1/dpej7xgsi/image/upload', {
    //   method: 'POST',
    //   body: data,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(async data => {
    //     console.log(data);
    //     console.log('ok, go to server');
    //     console.log(data.url);
    //     // await toServer({
    //     //   type: 'image',
    //     //   base64: data.url,
    //     //   uri: data.url,
    //     // });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Alert.alert(
    //       'Lỗi tải file',
    //       'Quá trình tải file lên server gặp lỗi, vui lòng thử lại\nStatus code: ' +
    //         error,
    //     );
    //     setIsLoading(false);
    //   });
    const formData = new FormData();
    const file = {
      uri: photo.uri,
      type: photo.type,
      name: photo.name,
    };
    formData.append("file", file);
    console.log(file);
    if (file.type.match(/^image\//)) {
      const res = await fetch(
        "https://facedetectionbackend-adcg.onrender.com/image",
        {
          // const res = await fetch('http://192.168.1.113:5000/image', {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          const url = responseJson.url;
          const emotion_counts = responseJson.emotion_counts;
          // const { url, emotion_counts } = responseJson;
          setIsLoading(false);
          const randomId = generateRandomId();
          console.log(randomId);
          const dataToStorage = {
            id: randomId,
            time: getCurrentTime(),
            date: getCurrentDate(),
            mainEmotion: "Unknown",
            emoData:emotion_counts,
            url: uri,
            type: "image/jpeg",
          }
          const store = await storeData(dataToStorage);

          // // Navigate to ShowImageScreen with the retrieved URI
          nvg.navigate("ShowImageScreen/index", {
            uri: url,
            content_type: file.type,
            emotion: JSON.stringify(emotion_counts),
            isHistory: "false",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
      console.log(res);
    } else {
      const res = await fetch(
        "https://facedetectionbackend-adcg.onrender.com/video",
        {
          // const res = await fetch("http://192.168.1.113:5000/video", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log("Response:", responseJson);
          console.log("Response:", responseJson);

          // Assuming responseJson contains the URI of the uploaderd image
          const url = responseJson.url;
          const emotion_counts = responseJson.emotion_counts;
          // const { url, emotion_counts } = responseJson;
          console.log("emoCount: ", emotion_counts);
          setIsLoading(false);
          const randomId = generateRandomId();
          console.log(randomId);

          const dataToStorage = {
            id: randomId,
            time: getCurrentTime(),
            date: getCurrentDate(),
            mainEmotion: "Unknown",
            emoData:emotion_counts,
            url: uri,
            type: "video/mp4",
          }
          await storeData(dataToStorage);
          // // Navigate to ShowImageScreen with the retrieved URI
          nvg.navigate("ShowImageScreen/index", {
            uri: url,
            content_type: file.type,
            emotion: emotion_counts,
            isHistory: "false",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Alert.alert("Error", error);
          setIsLoading(false);
        });
      console.log(res);
    }
  };
  const cloudinaryUpload = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "videoApp");
    data.append("cloud_name", "dpej7xgsi");
    fetch("https://api.cloudinary.com/v1_1/dpej7xgsi/video/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        console.log("ok, go to server");
        console.log(data.url);
        // await toServer({
        //   type: 'video',
        //   base64: data.url,
        //   uri: data.url,
        // });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Lỗi tải file",
          "Quá trình tải file lên server gặp lỗi, vui lòng thử lại\nStatus code: " +
            error
        );
        setIsLoading(false);
      });
  };
  // const cloudinaryUpdate = async photo => {
  //   const data = new FormData();
  //   data.append('file', photo);
  //   data.append('upload_preset', 'videoApp');
  //   data.append('cloud_name', 'dpej7xgsi');
  //   fetch(
  //     'https://api.cloudinary.com/v1_1/dpej7xgsi/video/upload/v1702289247/xlyelkfr75ccs4mp4mcw.mp4',
  //     {
  //       method: 'PUT',
  //       body: data,
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setIsLoading(true);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       Alert.alert(
  //         'Lỗi tải file',
  //         'Quá trình tải file lên server gặp lỗi, vui lòng thử lại\nStatus code: ' +
  //           error,
  //       );
  //       setIsLoading(false);
  //       clearInterval(countRef.current);
  //       setTimeLoading(0);
  //     });
  // };

  // const pickupMedia = async ()=> {
  //   let result = await launchImageLibrary({mediaType: "mixed"});
  //   console.log(result);
  //   if (!result.didCancel && result.assets && result.assets.length > 0) {
  //     const {fileName, uri, type} = result.assets[0];
  //     //console.log(uri);
  //     const extension = uri.split('.').pop();
  //     const name = uri.split('/').pop();
  //    // const originPath = result.assets[0].originalPath;

  //     console.log(name);
  //     const source = {
  //       uri,
  //       type,
  //       name,
  //     };
  //     console.log(source);
  //     setFile(source);
  //     await cloudinaryUploadImage();
  //     navigation.navigate('ShowScreen', { uri });
  //   }

  // }

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
        <Text style={[styles.text, { marginBottom: scale(20), fontSize: 30 }]}>
          EmoScan - Classroom Monitoring
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
      {/* <Text style={[styles.waitingText, {opacity: isLoading ? 1 : 0}]}>
        {'Wait for the detection process ... (' + timeLoading + 's)'}
      </Text> */}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
    bottom: 10,
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
