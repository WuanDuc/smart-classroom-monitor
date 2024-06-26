//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import FONTS from "../../constants/font";
import { COLORS } from "../../constants/color";
import scale from "../../constants/responsive";
import { useNavigation } from "expo-router";
import HistoryCard from "@/components/HistoryCard";
import * as FileSystem from "expo-file-system";
import { getData, deleteData } from "@/utils/utils";

// create a component
const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const handleDelete = async (id: string) => {
    await deleteData(id);
    const savedHistory = await getData();
    setHistory(savedHistory);
  };

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await getData();
      console.log(savedHistory);

      if (savedHistory) {
        setHistory(savedHistory);
      } else {
        Alert.alert("Oops", "Something went wrong!");
      }
    };
    loadHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.text}>History</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: scale(30) }} />
        {history.map((item, index) => {
          return (
            <HistoryCard key={index} data={item} onDelete={handleDelete} />
          );
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
