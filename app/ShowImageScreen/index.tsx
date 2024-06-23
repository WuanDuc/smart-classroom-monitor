/* eslint-disable prettier/prettier */
//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
} from "react-native";
import {
  IMG_APPICON,
  IMG_APPICONNOTEXT,
  IMG_HISTORY,
  IMG_Loading,
  IMG_SAVE,
  IMG_SHARE,
  IMG_UPLOAD,
} from "@/assets/images";
import FONTS from "@/constants/font";
import { COLORS } from "@/constants/color";
// import {Video, ResizeMode} from 'expo-av';
import RNFS from "react-native-fs";
import scale from "../../constants/responsive";
import Barchart from "../../components/BarChart";
import { useLocalSearchParams } from "expo-router";
// create a component
import { ResizeMode, Video } from "expo-av";
import { useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
import Share from "react-native-share";

const ShowImageScreen = () => {
  const nav = useNavigation();
  const { uri, content_type, emotion, isHistory } = useLocalSearchParams();
  const [emoString, setEmostring] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sumEmo, setSumemo] = useState<number>(0);
  // const [status, requestPermission] = useState(
  //   ImagePicker.requestMediaLibraryPermissionsAsync(),
  // );

  // const {dataType, data, content_type} = route.params;
  var data = {};
  //const content_type = 'image';

  // const ShareData = async () => {
  //   const shareOptions = {
  //     message: "Write something to your friend",
  //     url: `data:${content_type};uri, ${uri}`,
  //   };

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const SaveData = async () => {
  //   // if (status._j != null && status._j._j != null && status._j._j.granted) {
  //   if (content_type === 'video/mp4') {
  //     await MediaLibrary.saveToLibraryAsync(
  //       `file://${RNFS.DocumentDirectoryPath}/video.mp4`,
  //     ).finally(() => {
  //       Alert.alert('Thông báo', 'Lưu video thành công');
  //     });
  //   } else {
  //     await MediaLibrary.saveToLibraryAsync(
  //       `file://${RNFS.DocumentDirectoryPath}/image.jpg`,
  //     ).finally(() => {
  //       Alert.alert('Thông báo', 'Lưu ảnh thành công');
  //     });
  //   }
  // } else {
  //   console.log('No permission', status);
  //   async () => {
  //     requestPermission(
  //       await ImagePicker.requestMediaLibraryPermissionsAsync(),
  //     );
  //   };
  // }
  // };

  //   function b64toblob(b64data, contenttype, slicesize) {
  //     contenttype = contenttype || '';
  //     slicesize = slicesize || 512;

  //     var bytecharacters = atob(b64data);
  //     var bytearrays = [];

  //     for (var offset = 0; offset < bytecharacters.length; offset += slicesize) {
  //       var slice = bytecharacters.slice(offset, offset + slicesize);

  //       var bytenumbers = new array(slice.length);
  //       for (var i = 0; i < slice.length; i++) {
  //         bytenumbers[i] = slice.charcodeat(i);
  //       }

  //       var bytearray = new uint8array(bytenumbers);

  //       bytearrays.push(bytearray);
  //     }

  //     var blob = new blob(bytearrays, {type: contenttype});
  //     return blob;
  // }

  // const downloadToFile = base64Content => {
  //   const path = `file://${RNFS.DocumentDirectoryPath}/video.mp4`;

  //   RNFS.writeFile(path, base64Content, 'base64')
  //     .then(success => {
  //       console.log('FILE WRITTEN: ', 'abc');
  //     })
  //     .catch(err => {
  //       console.log('File Write Error: ', err.message);
  //       Alert.alert('Quá trình phát video gặp một số lỗi: ' + err.message);
  //       navigation.goBack();
  //     });
  // };

  // const downloadToFileImage = base64Content => {
  //   const path = `file://${RNFS.DocumentDirectoryPath}/image.jpg`;

  //   RNFS.writeFile(path, base64Content, 'base64')
  //     .then(success => {
  //       console.log('FILE WRITTEN: ', 'abc');
  //     })
  //     .catch(err => {
  //       console.log('File Write Error: ', err.message);
  //       Alert.alert('Quá trình tải ảnh gặp một số lỗi: ' + err.message);
  //       navigation.goBack();
  //     });
  // };

  const goBackToHome = () => {
    nav.goBack();
  };

  // useEffect(() => {
  //   if (content_type == 'video/mp4') {
  //     downloadToFile(data);
  //   } else {
  //     downloadToFileImage(data);
  //   }

  //   // console.log(status);

  //   // if (status._j == null) {
  //   //   requestPermission(ImagePicker.requestMediaLibraryPermissionsAsync());
  //   // }

  //   // if (status._j != null && status._j._j != null && !status._j._j.granted) {
  //   //   (async () => {
  //   //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   //   })();
  //   // }
  // }, []);

  // if (status._j == null || status._j != null && status._j._j != null && !status._j._j.granted) {
  //   return <Text>We need your library permi</Text>
  // }
  const [dataChart, setDataChart] = useState([
    { emoFull: "Neutral", emo: "neu", amount: 0 },
    { emoFull: "Happy", emo: "hap", amount: 0 },
    { emoFull: "Sad", emo: "sad", amount: 0 },
    { emoFull: "Angry", emo: "ang", amount: 0 },
    { emoFull: "Fear", emo: "fear", amount: 0 },
    { emoFull: "Disgust", emo: "dis", amount: 0 },
    { emoFull: "Surprise", emo: "sup", amount: 0 },
  ]);
  const findMaxEmo = () => {
    let max: number = 0;
    dataChart.forEach((item) => {
      if (item.amount > max) {
        max = item.amount;
      }
    });

    let temp: string[] = [];
    dataChart.forEach((item) => {
      if (item.amount === max) {
        temp.push(item.emoFull);
      }
    });

    setSumemo(max);

    if (max === 0) {
      setEmostring("No Emotion");
      if (isHistory == "false") {
        const currentDateTime = new Date();
        const currentTime = currentDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const currentDate = currentDateTime.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        const id = generateId();
        data = {
          id: id,
          time: currentTime,
          date: currentDate,
          mainEmotion: "No Emotion",
          emoData: JSON.parse(emotion),
          url: uri,
          type: content_type,
        };
      }
      // data = { ...data, mainEmotion: "No Emotion" };
    } else {
      const string = temp.join(", ");
      setEmostring(string);
      if (isHistory == "false") {
        const currentDateTime = new Date();
        const currentTime = currentDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const currentDate = currentDateTime.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        const id = generateId();
        data = {
          id: id,
          time: currentTime,
          date: currentDate,
          mainEmotion: string,
          emoData: JSON.parse(emotion),
          url: uri,
          type: content_type,
        };
      }
    }
    if (isHistory == "false") {
      writeHistoryFile();
    }
  };

  const writeHistoryFile = async () => {
    const fileUri = FileSystem.documentDirectory + "history.txt";
    const contentToAppend = JSON.stringify(data) + "\n";

    try {
      await FileSystem.writeAsStringAsync(fileUri, contentToAppend);
      Alert.alert("Success", "Content appended to file successfully!");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to append content to file: " + error.message
      );
    }
  };

  const generateId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.random().toString().slice(2, 8);

    return `${timestamp}-${randomNum}`;
  };

  useEffect(() => {
    let temp = JSON.parse(emotion);
    setDataChart(temp);
  }, []);

  useEffect(() => {
    findMaxEmo();
  }, [dataChart]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.mainModalView}>
          <View style={styles.modalView}>
            <Text style={[styles.text, { color: "#136D11", marginBottom: 10 }]}>
              Emotions Detail
            </Text>
            {dataChart == undefined ? (
              <></>
            ) : (
              dataChart.map((item, index) => {
                return (
                  <View key={index}>
                    {index % 2 == 0 ? (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent:
                            index === dataChart.length
                              ? "center"
                              : "space-around",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.Lato.Medium,
                            fontSize: 20,
                            color: "#3F8742",
                          }}
                        >
                          {item.emoFull + ": " + item.amount}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.Lato.Medium,
                            fontSize: 20,
                            color: "#3F8742",
                          }}
                        >
                          {dataChart[index + 1] != undefined
                            ? dataChart[index + 1].emoFull +
                              ": " +
                              dataChart[index + 1].amount
                            : ""}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })
            )}
            <TouchableOpacity
              style={[styles.button, { marginTop: 15 }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.mainViewContainer}>
        <View style={styles.mainView}>
          <Text style={styles.text}>Result</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image style={styles.image} source={IMG_SAVE}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={ShareData}>
              <Image style={styles.image} source={IMG_SHARE}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {content_type.match(/^video\//) ? (
        <Video
          style={styles.resultImage}
          source={{
            uri: uri,
            // uri: `data:video/mp4; base64, ${base64code}`,
            // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onError={(error) => console.error("Video playback error:", error)}
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      ) : (
        <Image
          style={styles.resultImage}
          source={{
            //uri: `data:${content_type};base64, ${data}`,
            uri: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719099589/nv5ugbtpjvkptyrnio1g.jpg",
          }}
        ></Image>
      )}
      {/* <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: `data:${content_type};base64,${response.data}`,
        }}
      /> */}
      <View style={styles.belowResultContainer}>
        <Text style={styles.text}>{`Main Emotion: ${emoString}`}</Text>
        <Text style={styles.detailText} onPress={() => setModalVisible(true)}>
          details
        </Text>
      </View>
      {sumEmo === 0 ? (
        <View style={styles.noChartContainer}>
          <Text style={[styles.text, { color: "gray" }]}>NO CHART HERE</Text>
        </View>
      ) : (
        <Barchart
          data={sumEmo === 0 ? [] : dataChart}
          x_key="emo"
          y_key="amount"
          height={scale(350)}
        />
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={goBackToHome}>
          <Text style={[styles.text, { fontSize: scale(35) }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
        <Image style={styles.iconApp} source={IMG_APPICON} />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.lightGreen,
    marginTop: scale(30),
  },
  mainViewContainer: {
    height: scale(60),
    width: "100%",
    backgroundColor: COLORS.green,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 22,
    color: COLORS.black,
    textAlign: "center",
  },
  image: {
    height: 40,
    width: 40,
    overflow: "visible",
    marginLeft: 10,
  },
  resultImage: {
    // marginTop: 20,
    marginBottom: scale(10),
    backgroundColor: COLORS.green,
    height: "30%",
    width: "100%",
    resizeMode: "contain",
    // borderWidth: 3,
    // borderColor: "purple",
    // borderRadius: 10,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.grayButton,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 23,
    borderColor: COLORS.green,
    borderWidth: 2,
    shadowColor: COLORS.green,
    shadowOpacity: 0.8,
    elevation: 5,
    shadowRadius: 23,
    shadowOffset: { width: 1, height: 13 },
  },
  mainModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: scale(400),
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-around",
  },
  detailText: {
    color: COLORS.black,
    textAlign: "center",
    fontFamily: FONTS.Lato.Medium,
    fontSize: 15,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  belowResultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  noChartContainer: {
    height: scale(350),
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: scale(20),
    alignItems: "center",
    width: "90%",
    height: scale(80),
  },
  iconApp: {
    width: 60,
    height: 60,
  },
});

//make this component available to the app
export default ShowImageScreen;
