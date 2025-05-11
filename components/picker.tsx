// import React from 'react';
// import { View, Button, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function PickImage({ route, navigation }) {
//   const { handleImagePick } = route.params;

//   const pickImageFromGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       handleImagePick(result.assets[0].uri); // إرسال الـ URI للصورة إلى PersonalData
//       navigation.goBack(); // العودة إلى الشاشة السابقة
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick Image from Gallery" onPress={pickImageFromGallery} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
