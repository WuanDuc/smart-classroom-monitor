//import liraries
import React, { Component } from "react";
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

// create a component
const AboutUsScreen = () => {
  const nav = useNavigation();
  const keyFeatures = [
    "Emotion Detection: Upload a photo or video and receive instant analysis of students' emotions.",
    "Visual Reports: View the results through intuitive bar charts, making it easy to understand the overall emotional state of the classroom.",
    "History Tracking: Access a history of previous detections to monitor changes and trends over time.",
  ];
  const benefits = [
    "For Educators: Gain insights into the emotional well-being of students to tailor teaching methods accordingly.",
    "For Students: Create a supportive learning environment by addressing emotional needs.",
    "For Institutions: Utilize data to improve overall educational strategies and student satisfaction.",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.text}>About Us</Text>
        <View style={styles.footer}>
          <Image source={IMG_LOGO_UIT} style={styles.image} />
          <Image source={IMG_LOGO_TOGETHER} style={styles.image} />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.titleContentText, { marginTop: 20 }]}>
          Who We Are
        </Text>
        <Text style={styles.contentText}>
          We are third-year students at the University of Information
          Technology, a member of Vietnam National University, Ho Chi Minh City.
          Our team, UIT-Together, is dedicated to researching and developing
          innovative solutions in the field of technology.{"\n"}
        </Text>
        <Text style={styles.titleContentText}>Our Project</Text>
        <Text style={styles.contentText}>
          This application is part of our second major project, where we aim to
          integrate advanced technologies to create a Smart Classroom Monitoring
          system. The model used in this project is based on various research
          papers, which we have carefully reviewed and fine-tuned to better suit
          our application needs.{"\n"}
        </Text>
        <Text style={styles.titleContentText}>Key Features</Text>
        {keyFeatures.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.contentText}>{item}</Text>
          </View>
        ))}
        <Text>{"\n"}</Text>
        <Text style={styles.titleContentText}>Benefits</Text>
        {benefits.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.contentText}>{item}</Text>
          </View>
        ))}
        <Text>{"\n"}</Text>
        <Text style={styles.titleContentText}>Join Us on Our Journey</Text>
        <Text style={styles.contentText}>
          We believe that technology can transform education, and we are excited
          to share our journey with you. Thank you for supporting our project
          and being a part of the change we strive to bring.{"\n"}
        </Text>
        <Text style={styles.titleContentText}>Contact</Text>
        <Text style={styles.contentText}>
          Email 1: 21520129@gm.uit.edu.vn{"\n"}
          Email 2: 21521335@gm.uit.edu.vn{"\n"}
        </Text>
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
  footer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 22,
    color: COLORS.black,
    textAlign: "left",
  },
  titleContentText: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 22,
    color: COLORS.black,
    textAlign: "justify",
  },
  contentText: {
    fontFamily: FONTS.Lato.Thin,
    fontSize: 18,
    color: COLORS.black,
    textAlign: "justify",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  bullet: {
    fontSize: 30,
    lineHeight: 35,
    marginRight: 10,
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
export default AboutUsScreen;
