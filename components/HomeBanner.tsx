import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '@/assets/logo.png';
import { borderWidth, mainColor } from '@/utils/constants';

export default function HomeBanner() {
  return (
    <View style={styles.container}>
        <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>BooXtore</Text>
        <Text style={styles.subtitle}>نزل، اطلب..، اقرأ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 128, 
    borderRadius: 16, 
    overflow: 'hidden',
    backgroundColor: mainColor,
    borderWidth: borderWidth,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16, 
  },
  textContainer: {
    right: 60
  },
  title: {
    fontSize: 26,  
    fontWeight: 'bold',
    color: "white",  
  },
  subtitle: {
    fontSize: 17,
    color: "white",
    opacity: .8,  
    marginTop: 10
  },
  logo: {
    right: 50,
    width: 300,  
    height: 300,  
  },
});
