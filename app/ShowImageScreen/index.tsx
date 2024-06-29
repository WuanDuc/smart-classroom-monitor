/* eslint-disable prettier/prettier */
//import liraries
import React, { useEffect, useState } from "react";
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
import { IMG_APPICON, IMG_SAVE, IMG_SHARE } from "@/assets/images";
import FONTS from "@/constants/font";
import { COLORS } from "@/constants/color";
import scale from "../../constants/responsive";
import Barchart from "../../components/BarChart";
import { useLocalSearchParams } from "expo-router";
// create a component
import { ResizeMode, Video } from "expo-av";
import { useNavigation } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { storeData } from "@/utils/utils";

const ShowImageScreen = () => {
  const nav = useNavigation();
  const { uri, content_type, emotion, isHistory } = useLocalSearchParams();
  const [emoString, setEmostring] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sumEmo, setSumemo] = useState<number>(0);
  var data = {};
  var isStore = "false";

  const saveImageToLocal = async (imageUrl: string) => {
    let splitUrl = imageUrl.split("/");
    const fileUri = FileSystem.documentDirectory + splitUrl[7];
    await FileSystem.downloadAsync(imageUrl, fileUri);
    return fileUri;
  };

  const saveMedia = async (uri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your media library."
      );
      return;
    }

    try {
      await saveImageToLocal(uri).then(async (fileUrl) => {
        const asset = await MediaLibrary.createAssetAsync(fileUrl);
        Alert.alert("Success", "Image saved successfully!");
        await MediaLibrary.createAlbumAsync("EmoScan", asset, false);
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save image.");
    }
  };

  const shareMedia = async (uri: string) => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(
        "Sharing not available",
        "Sharing is not available on this device."
      );
      return;
    }

    try {
      const fileUrl = await saveImageToLocal(uri);
      const shareOptions = {
        dialogTitle: "Emotion detection with EmoScan!",
      };
      await Sharing.shareAsync(fileUrl, shareOptions);
    } catch (error) {
      Alert.alert("Error", "Failed to share image.");
    }
  };

  const goBackToHome = () => {
    nav.goBack();
  };

  const [dataChart, setDataChart] = useState([
    { emoFull: "Neutral", emo: "neu", amount: 0 },
    { emoFull: "Happy", emo: "hap", amount: 0 },
    { emoFull: "Sad", emo: "sad", amount: 0 },
    { emoFull: "Angry", emo: "ang", amount: 0 },
    { emoFull: "Fear", emo: "fear", amount: 0 },
    { emoFull: "Disgust", emo: "dis", amount: 0 },
    { emoFull: "Surprise", emo: "sup", amount: 0 },
  ]);
  const findMaxEmo = async (dataChart: any) => {
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
          second: "2-digit",
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
        if (data.emoData == "Unknown") {
          return;
        }
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
          second: "2-digit",
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
        if (data.emoData == "Unknown") {
          return;
        }
      }
    }
    console.log(isStore);
    if (isHistory == "false") {
      const store = await storeData(data);
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
    findMaxEmo(temp);
  }, []);

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
            <TouchableOpacity onPress={() => saveMedia(uri)}>
              <Image style={styles.image} source={IMG_SAVE}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shareMedia(uri)}>
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
            uri: uri,
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
    borderRadius: 23,
    borderColor: COLORS.green,
    borderWidth: 2,
    shadowColor: COLORS.green,
    shadowOpacity: 0.8,
    elevation: 5,
    shadowRadius: 23,
    shadowOffset: { width: 1, height: 13 },
    textAlign: 'center'
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
    textAlign: 'center'
  },
  iconApp: {
    width: 60,
    height: 60,
  },
});

//make this component available to the app
export default ShowImageScreen;
