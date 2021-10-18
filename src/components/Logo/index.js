import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import ImageSrc from '../../assets/images/logo.png';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
    alignSelf: 'center',
  },
});

const Logo = () => (
  <Image source={ImageSrc} style={styles.image} />
);

export default memo(Logo);
