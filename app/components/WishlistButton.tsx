import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface WishlistButtonProps {
  onToggle?: (isWishlisted: boolean) => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ onToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <TouchableOpacity onPress={toggleWishlist} style={styles.button}>
      <Icon name={isWishlisted ? 'heart' : 'heart-o'} size={23} color={isWishlisted ? 'red' : 'gray'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default WishlistButton;
