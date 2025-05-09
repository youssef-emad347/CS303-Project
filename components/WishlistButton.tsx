import { backgroundColor } from '@/utils/constants';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToWishlist } from '../services/firestoreServices';



interface WishlistButtonProps {
  onToggle?: (isWishlisted: boolean) => void;
  onAddToWishlist: () =>void;

}


const WishlistButton: React.FC<WishlistButtonProps> = ({ onToggle  , onAddToWishlist}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    if (onToggle) {
      onToggle?.(newState);
    }
    if (newState) {
      onAddToWishlist();
    }
  };

  return (
    <Pressable onPress={toggleWishlist}
    style={styles.button}>
      <Icon name={isWishlisted ? 'heart' : 'heart-o'} size={18} color={isWishlisted ? 'red' : 'gray'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: backgroundColor,
    borderRadius: 20,
    padding: 8,
  },
});

export default WishlistButton;
