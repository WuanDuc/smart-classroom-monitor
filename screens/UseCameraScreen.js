// //import liraries
// import {Camera} from 'expo-camera';
// import React, {Component, useEffect, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
// import {Camera} from 'expo-camera';
// import {COLORS} from '../constants/color';

// // create a component
// const UseCameraScreen = () => {
//   const [cameraPermission, requestCameraPermission] = useState();
//   const [microPermission, requestMicroPermission] = useState();
//   const [isRecording, setIsRecording] = useState(false);
//   const [video, setVideo] = useState();

//   let cameraRef = useRef();

//   const Record = async () => {
//     setIsRecording(true);
//     let options = {
//       quality: '720p',
//       maxDuration: 60,
//       mute: true,
//     };

//     cameraRef.current.recordAsync(options).then(recordedVideo => {
//       setVideo(recordedVideo);
//       setIsRecording(false);
//     });
//   };

//   const StopRecord = async () => {
//     setIsRecording(false);
//     cameraRef.current.stopRecording;
//   };

//   const TakeImage = async () => {
//     if (cameraRef) {
//       try {
//         const data = await cameraRef.current.takePictureAsync();
//         console.log(data);
//       } catch (e) {
//         Alert.alert('Thông báo lỗi', e);
//       }
//     }
//   };

//   useEffect(() => {
//     async () => {
//       const cameraPermission = await Camera.requestCameraPermissionsAsync();
//       const microPermission = await Camera.requestMicrophonePermissionsAsync();

//       requestCameraPermission(cameraPermission.status === 'granted');
//       requestMicroPermission(microPermission.status === 'granted');
//     };
//   });

//   if (cameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={type}
//         ref={ref => {
//           this.camera = ref;
//         }}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             setRender(!render);
//             this.camera
//               .takePictureAsync()
//               .then(image => navigation.navigate('ShowPicture', {img: image}));
//           }}></TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.mainPurple,
//   },
//   buttonRecord: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderColor: 'white',
//     backgroundColor: 'red',
//   },
//   buttonStop: {
//     width: 50,
//     height: 50,
//     borderColor: 'white',
//     backgroundColor: 'red',
//   },
//   camera: {
//     height: 400,
//     width: 300,
//     backgroundColor: 'gray',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });

// //make this component available to the app
// export default UseCameraScreen;
