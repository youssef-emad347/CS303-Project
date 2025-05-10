import React, { useState } from 'react';
import { View, Button, Image, Alert, ActivityIndicator, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; 

// متغيرات Cloudinary
const CLOUDINARY_UPLOAD_PRESET = 'dkxq0wlhu'; // ← من Cloudinary
const CLOUDINARY_CLOUD_NAME = 'myapp_upload';         // ← من Cloudinary
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const UploadToCloudinary = () => {
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const selectImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Something went wrong");
        return;
      }

      const uri = response.assets?.[0]?.uri;
      if (uri) {
        await uploadImage(uri);
      }
    });
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);
    const formData = new FormData();

    formData.append('file', {
      uri: uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any); // مهم عشان TypeScript

    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = res.data.secure_url;
      setImageURL(imageUrl); // حفظ رابط الصورة في الحالة
      console.log("✅ Uploaded to Cloudinary:", imageUrl);

      await saveToFirestore(imageUrl);
    } catch (error) {
      console.error("❌ Cloudinary Error:", error);
      Alert.alert('Upload Error', 'Could not upload image to Cloudinary');
    } finally {
      setUploading(false);
    }
    
  };

  const saveToFirestore = async (imageUrl: string) => {
    const bookID = 'book_' + Date.now();
    try {
      await setDoc(doc(db, 'books', bookID), {
        title: 'New Book with Image',
        image: imageUrl,
        createdAt: new Date()
      });
      Alert.alert("✅ Success", "Image URL saved to Firestore");
    } catch (err) {
      console.error("❌ Firestore Error:", err);
      Alert.alert("Firestore Error", "Could not save image URL");
    }
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Button title="اختار صورة وارفعها" onPress={selectImage} />

      {uploading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      )}

      {imageURL && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ marginBottom: 10 }}>الصورة المرفوعة:</Text>
          <Image
            source={{ uri: imageURL }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
};

export default UploadToCloudinary;

