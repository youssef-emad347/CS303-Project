import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { backgroundColor } from '@/utils/constants';

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Header with background and notification icon */}
      <View style={styles.header}>
        <Image
          source={{uri : "https://i.pinimg.com/736x/b9/2d/00/b92d0051e38cb3965902f5b609e764b9.jpg"}} // Replace with your local background image
          style={styles.backgroundImage}
        />
        <Pressable style={styles.notificationIcon}>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </Pressable>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/b9/2d/00/b92d0051e38cb3965902f5b609e764b9.jpg' }} // Replace with actual image URL
            style={styles.profileImage}
          />
          <Text style={styles.name}>Asmaa Galal</Text>
          <Text style={styles.subtitle}>Today a reader, tomorrow a leader</Text>
        </View>
      </View>

      {/* Menu Cards */}
      <View style={styles.card}>
        <MenuItem icon="person-outline" label="Personal data" />
        <MenuItem icon="clipboard-outline" label="My orders" />
      </View>

      <View style={styles.card}>
        <MenuItem icon="heart-outline" label="Favorite" />
        <MenuItem icon="language-outline" label="Language" />
        <MenuItem icon="help-circle-outline" label="Help center" />
        <MenuItem icon="shield-checkmark-outline" label="Privacy policy" />
        <Pressable
          onPress={()=>router.push(`/screens/cardDetails`)}
          style={styles.row}>
          <View style={styles.rowLeft}>
            <AntDesign name={"creditcard"} size={20} color={'#333'} />
            <Text style={[styles.label]}>Credits</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
        <MenuItem icon="log-out-outline" label="Log out" color="red" />
      </View>
    </ScrollView>
  );
};

// Reusable component for each row
const MenuItem = ({ icon, label, color = '#333' ,onPress=()=>{}}) => (
  <Pressable onPress={onPress} style={styles.row}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={20} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#ccc" />
  </Pressable>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  header: {
    height: 220,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  notificationIcon: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  card: {
    backgroundColor: backgroundColor,
    margin: 10,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  label: {
    fontSize: 16,
  },
});
