import React, { useState } from 'react';
import { View,Alert ,Text, Image, StyleSheet, Pressable } from 'react-native';
interface ProductProps {
  id: string;
  name: string;
  author: string;
  price: string;
  imageUrl: string;
  onDelete?: (id: string) => void; 
}

const CartItem: React.FC<ProductProps> = ({ id, name, author, price, imageUrl , onDelete }) => {
  const [quantity, setQuantity] = useState(0);
  const handleDelPress = () => {
    setQuantity(0);       
    Alert.alert('Item Deleted!');
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        defaultSource={require('../../assets/images/del.png')}
        style={styles.image}
      />
      
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.price}>{price} EGP</Text>
      </View>

      <View style={styles.actions}>
        <Pressable 
          style={styles.button} 
          onPress={() => setQuantity(q => Math.max(0, q - 1))}
        >
          <Text>-</Text>
        </Pressable>
        
        <Text style={styles.quantity}>{quantity}</Text>
        
        <Pressable 
          style={styles.button} 
          onPress={() => setQuantity(q => q + 1)}
        >
          <Text>+</Text>
        </Pressable>
      </View>

      <Pressable 
        style={styles.deleteButton}
        onPress={handleDelPress }
      >
          <Image
            source={require('../../assets/images/del.png')}
            style={{ width: 20, height: 20 }} ></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    color: '#666',
    fontSize: 12,
  },
  price: {
    color: 'green',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  quantity: {
    marginHorizontal: 8,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: 'red',
  },
});

export default CartItem;