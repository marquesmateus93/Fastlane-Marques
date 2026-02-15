import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ThankYouScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/thank_you.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 500,
    height: 700,
    resizeMode: 'stretch',
  },
});