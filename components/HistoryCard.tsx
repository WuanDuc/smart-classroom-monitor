//import liraries
import { IMG_SHARE } from "@/assets/images";
import { COLORS } from "@/constants/color";
import FONTS from "@/constants/font";
import scale from "@/constants/responsive";
import { useNavigation } from "expo-router";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// create a component
const HistoryCard = ({ data }) => {
  const nvg = useNavigation();

  const handleItemPress = (data) => {
    console.log(data);
    nvg.navigate("ShowImageScreen/index", {
      uri: data.url,
      content_type: data.type,
      emotion: JSON.stringify(data.emoData),
      isHistory: "true",
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleItemPress(data)}
    >
      <Text style={styles.text}>
        {data.time + " - " + data.date}
        {"\n"}
        {"Main Emotion: " + data.mainEmotion}
      </Text>
      <TouchableOpacity>
        <Image style={styles.image} source={IMG_SHARE} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scale(70),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: scale(20),
    backgroundColor: COLORS.grayButton,
    marginBottom: scale(20),
  },
  text: {
    fontFamily: FONTS.Lato.Medium,
    fontSize: 18,
  },
  image: {
    height: 40,
    width: 40,
    alignSelf: "flex-end",
    overflow: "visible",
  },
});

//make this component available to the app
export default HistoryCard;
