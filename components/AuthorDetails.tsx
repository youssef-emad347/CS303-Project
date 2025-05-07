import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/(tabs)/index'; 

type AuthorDetailsRouteProp = RouteProp<{ params: { author: any } }, 'params'>;

interface AuthorDetailsProps {
  route: AuthorDetailsRouteProp;
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ route }) => {
  const { author } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: author.image }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>{author.name}</Text>
        <Text style={styles.nationality}>{author.nationality}</Text>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>About</Text>
        <Text style={styles.bioText}>{author.bio}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nationality: {
    fontSize: 16,
    color: "#666",
  },
  bioContainer: {
    marginTop: 20,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AuthorDetails;