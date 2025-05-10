import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { WebView } from 'react-native-webview';

const MapComponent = () => {
  if (Platform.OS === 'web') {
    // في حالة الويب، نستخدم iframe أو WebView
    return (
      <View style={styles.container}>
        <iframe
          title="google-map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/view?zoom=14&center=30.0444,31.2357&key=YOUR_API_KEY`}
        />
      </View>
    );
  }

  // في حالة الأندرويد أو iOS نستخدم react-native-maps
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 30.0444,
          longitude: 31.2357,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

export default MapComponent;
