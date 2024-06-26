//import liraries
import { IMG_SHARE } from "@/assets/images";
import { COLORS } from "@/constants/color";
import FONTS from "@/constants/font";
import scale from "@/constants/responsive";
import { useNavigation } from "expo-router";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from "react-native";
import { deleteData } from "@/utils/utils";

// create a component
const HistoryCard = ({ data, onDelete }) => {
  const nvg = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (data) => {
    console.log(data);
    nvg.navigate("ShowImageScreen/index", {
      uri: data.url,
      content_type: data.type,
      emotion: JSON.stringify(data.emoData),
      isHistory: "true",
    });
  };
  const handleDeletePress = () => {
    setModalVisible(true);
  };

  const confirmDelete = () => {
    onDelete(data.id);
    setModalVisible(false);
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
      <TouchableOpacity onPress={handleDeletePress}>
        <Image style={styles.image} source={IMG_SHARE}  />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Delete" onPress={confirmDelete} />
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

//make this component available to the app
export default HistoryCard;
