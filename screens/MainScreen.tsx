/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
//import liraries

import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {IMG_APPICON, IMG_HISTORY, IMG_UPLOAD} from '../assets/images';
import FONTS from '../constants/font';
import {COLORS} from '../constants/color';
//import { Cloudinary } from "@cloudinary/url-gen";
// import * as FS from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

// import {Buffer} from 'buffer';
// import axios from 'axios';

import * as FileSystem from 'expo-file-system';
// import * as FileSystem from 'expo-file-system';
import scale from '../constants/responsive';

// create a component
const MainScreen = ({props, route, navigation}) => {
  const [cameraRollPer, setCameraRollPer] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file,setFile] = useState({});
  const [uri, setUri] = useState();
  // const [timeLoading, setTimeLoading] = useState(0);
  // const [uri, setUri] = useState();
  // const countRef = useRef(null);
  const UploadImage = async () => {
    console.log('acb');
    await ImagePicker.requestCameraPermissionsAsync();
    const permission = await ImagePicker.getCameraPermissionsAsync();
    permission.canAskAgain = true;
    console.log(permission);
    if (permission == null || !permission.granted) {
      Alert.alert("We don't have Media Library Permission!");
      return;
    }
    setIsLoading(true);

    await pickMedia()

  };
  

  const pickMedia = async () => {
    setCameraRollPer(cameraRollPer), setDisableButton(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (result.canceled) {
      console.log('there is nothing');
      setIsLoading(false);
      return;
    }
    // console.log('result:', result);
    if (result.assets === null) {
      return;
    }
    if (result.assets[0].type === 'image') {
      console.log('uri', result.assets[0].uri);
      // await toServer({
      //   type: result.assets[0].type,
      //   base64: result.assets[0].base64,
      //   uri: result.assets[0].uri,
      //});

      //setUri(result.assets[0].uri);
      const uri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const extension = fileInfo.uri.split('.').pop();
      console.log(extension);
      const type = result.assets[0].type + '/' + extension;
      const name = uri.split('/').pop();
      const source = {
        uri,
        type,
        name,
      };
      //console.log(result.assets[0]);
      await cloudinaryUploadImage(source);
    } else {
      // console.log(result.assets[0].type + " false");
      // let base64 = await uriToBase64(result.assets[0].uri);
      // await toServer({
      //   type: result.assets[0].type,
      //   base64: base64,
      //   uri: result.assets[0].uri,
      // });
      console.log(result);
      const uri = result.assets[0].uri;
      const type = result.assets[0].type + '/mp4';
      const name = uri.split('/').pop();
      const source = {
        uri,
        type,
        name,
      };
      console.log(source.name);
      await cloudinaryUpload(source);
    }
  };
  const cloudinaryUploadImage = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'videoApp');
    data.append('cloud_name', 'dpej7xgsi');
    fetch('https://api.cloudinary.com/v1_1/dpej7xgsi/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        console.log('ok, go to server');
        console.log(data.url);
        // await toServer({
        //   type: 'image',
        //   base64: data.url,
        //   uri: data.url,
        // });
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          'Lỗi tải file',
          'Quá trình tải file lên server gặp lỗi, vui lòng thử lại\nStatus code: ' +
            error,
        );
        setIsLoading(false);
      });
  };
  const cloudinaryUpload = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'videoApp');
    data.append('cloud_name', 'dpej7xgsi');
    fetch('https://api.cloudinary.com/v1_1/dpej7xgsi/video/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        console.log('ok, go to server');
        console.log(data.url);
        // await toServer({
        //   type: 'video',
        //   base64: data.url,
        //   uri: data.url,
        // });
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          'Lỗi tải file',
          'Quá trình tải file lên server gặp lỗi, vui lòng thử lại\nStatus code: ' +
            error,
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


  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: scale(50),
          width: '100%',
          marginTop: scale(20),
          alignItems: 'flex-end',
        }}
      />
      <View style={styles.mainView}>
        <Image source={IMG_APPICON} />
        <Text style={[styles.text, {marginBottom: scale(20), fontSize: 30}]}>
          EmoScan - Classroom Monitoring
        </Text>
        <TouchableOpacity
          onPress={UploadImage}
          style={styles.button}
          disabled={isLoading}>
          <Text
            style={!isLoading ? styles.text : [styles.text, {color: 'gray'}]}>
            Upload File
          </Text>
          <Image style={styles.buttonImage} source={IMG_UPLOAD} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} disabled={isLoading}>
          <Text
            style={!isLoading ? styles.text : [styles.text, {color: 'gray'}]}>
            History
          </Text>
          <Image style={styles.buttonImage} source={IMG_HISTORY} />
        </TouchableOpacity>
      </View>
      <Text
        style={styles.aboutUsText}
        onPress={() => {
          Alert.alert('Classroom-Monitoring');
        }}>
        About us
      </Text>
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
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
  },
  historyImage: {
    width: 40,
    height: 33,
    marginRight: 20,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
  },
  text: {
    fontFamily: FONTS.Lato.Bold,
    fontSize: 25,
    color: COLORS.black,
    width: '80%',
  },
  button: {
    width: '83%',
    height: '11%',
    alignItems: 'center',
    backgroundColor: COLORS.grayButton,
    flexDirection: 'row',
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
    shadowOffset: {width: 1, height: 13},
  },
  buttonImage: {
    width: 55,
    height: 55,
  },
  waitingText: {
    color: COLORS.black,
    position: 'absolute',
    bottom: 10,
    fontFamily: FONTS.Lato.Bold,
    fontSize: 20,
  },
  aboutUsText: {
    textDecorationLine: 'underline',
    color: COLORS.black,
    fontSize: 20,
    fontFamily: FONTS.Lato.Bold,
    position: 'absolute',
    bottom: scale(8),
  },
});

//make this component available to the app
export default MainScreen;
