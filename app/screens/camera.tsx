// components/Camera.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const router = useRouter();

  const CLOUD_NAME = 'dkxq0wlhu'; 
  const UPLOAD_PRESET = 'myapp_upload'; 

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to access the camera</Text>
        <TouchableOpacity onPress={requestPermission}><Text>Grant Permission</Text></TouchableOpacity>
      </View>
    );
  }

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      uploadToCloudinary(photo.uri);
    }
  };

  const uploadToCloudinary = async (uri: string) => {
    const data = new FormData();
    data.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
      });
      const result = await res.json();

      // حفظ رابط الصورة وبيانات المستخدم في Firebase
      const response = await fetch('https://your-firestore-function-url.com/api/saveData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ahmed Mohamed',
          email: 'ahmed@example.com',
          imageUrl: result.secure_url,
        }),
      });

      router.replace('../screens/personalData'); // الانتقال بعد الحفظ
    } catch (err) {
      console.error('Cloudinary upload error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <TouchableOpacity onPress={capturePhoto} style={styles.captureButton}>
          <Text style={styles.captureText}>📸</Text>
        </TouchableOpacity>
      </CameraView>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
  },
  captureText: { fontSize: 20 },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
