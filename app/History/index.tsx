//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import FONTS from "../../constants/font";
import { COLORS } from "../../constants/color";
import scale from "../../constants/responsive";
import { useNavigation } from "expo-router";
import { IMG_LOGO_TOGETHER, IMG_LOGO_UIT } from "../../assets/images/index";
import HistoryCard from "@/components/HistoryCard";
import * as FileSystem from "expo-file-system";

// create a component
const HistoryScreen = () => {
  const nav = useNavigation();
  const [history, setHistory] = useState([
    {
      id: "His1",
      time: "19:20",
      date: "10/10/2024",
      mainEmotion: "Angry",
      emoData: [
        { emoFull: "Neutral", emo: "neu", amount: 0 },
        { emoFull: "Happy", emo: "hap", amount: 0 },
        { emoFull: "Sad", emo: "sad", amount: 0 },
        { emoFull: "Angry", emo: "ang", amount: 0 },
        { emoFull: "Fear", emo: "fear", amount: 0 },
        { emoFull: "Disgust", emo: "dis", amount: 0 },
        { emoFull: "Surprise", emo: "sup", amount: 0 },
      ],
      url: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719087689/j93khleudjfzgubucfhm.jpg",
      type: "image/jpeg",
    },
    {
      id: "His2",
      time: "19:20",
      date: "10/10/2024",
      mainEmotion: "Angry",
      emoData: [
        { emoFull: "Neutral", emo: "neu", amount: 0 },
        { emoFull: "Happy", emo: "hap", amount: 0 },
        { emoFull: "Sad", emo: "sad", amount: 0 },
        { emoFull: "Angry", emo: "ang", amount: 0 },
        { emoFull: "Fear", emo: "fear", amount: 0 },
        { emoFull: "Disgust", emo: "dis", amount: 0 },
        { emoFull: "Surprise", emo: "sup", amount: 0 },
      ],
      url: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719087689/j93khleudjfzgubucfhm.jpg",
      type: "image/jpeg",
    },
    {
      id: "His3",
      time: "19:20",
      date: "10/10/2024",
      mainEmotion: "Angry",
      emoData: [
        { emoFull: "Neutral", emo: "neu", amount: 0 },
        { emoFull: "Happy", emo: "hap", amount: 0 },
        { emoFull: "Sad", emo: "sad", amount: 0 },
        { emoFull: "Angry", emo: "ang", amount: 0 },
        { emoFull: "Fear", emo: "fear", amount: 0 },
        { emoFull: "Disgust", emo: "dis", amount: 0 },
        { emoFull: "Surprise", emo: "sup", amount: 0 },
      ],
      url: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719087689/j93khleudjfzgubucfhm.jpg",
      type: "image/jpeg",
    },
    {
      id: "His4",
      time: "19:20",
      date: "10/10/2024",
      mainEmotion: "Angry",
      emoData: [
        { emoFull: "Neutral", emo: "neu", amount: 0 },
        { emoFull: "Happy", emo: "hap", amount: 0 },
        { emoFull: "Sad", emo: "sad", amount: 0 },
        { emoFull: "Angry", emo: "ang", amount: 0 },
        { emoFull: "Fear", emo: "fear", amount: 0 },
        { emoFull: "Disgust", emo: "dis", amount: 0 },
        { emoFull: "Surprise", emo: "sup", amount: 0 },
      ],
      url: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719087689/j93khleudjfzgubucfhm.jpg",
      type: "image/jpeg",
    },
    {
      id: "His5",
      time: "19:20",
      date: "10/10/2024",
      mainEmotion: "Angry",
      emoData: [
        { emoFull: "Neutral", emo: "neu", amount: 0 },
        { emoFull: "Happy", emo: "hap", amount: 0 },
        { emoFull: "Sad", emo: "sad", amount: 0 },
        { emoFull: "Angry", emo: "ang", amount: 0 },
        { emoFull: "Fear", emo: "fear", amount: 0 },
        { emoFull: "Disgust", emo: "dis", amount: 0 },
        { emoFull: "Surprise", emo: "sup", amount: 0 },
      ],
      url: "http://res.cloudinary.com/dpej7xgsi/image/upload/v1719087689/j93khleudjfzgubucfhm.jpg",
      type: "image/jpeg",
    },
  ]);

  const readFile = async () => {
    const fileUri = FileSystem.documentDirectory + "history.txt";

    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      console.log(content);
      const dataArray = content
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
      setHistory(dataArray);
    } catch (error) {
      Alert.alert("Error", "Failed to read file: " + error.message);
    }
  };

  useEffect(() => {
    readFile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.text}>History</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: scale(30) }} />
        {history.map((item, index) => {
          return <HistoryCard key={index} data={item} />;
        })}
      </ScrollView>
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
  mainView: {
    height: scale(60),
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    textAlign: "justify",
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
  scrollView: {
    width: "100%",
    textAlign: "justify",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  text: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 22,
    color: COLORS.black,
    textAlign: "left",
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    backgroundColor: "white",
    overflow: "visible",
    marginLeft: 10,
  },
});

//make this component available to the app
export default HistoryScreen;
