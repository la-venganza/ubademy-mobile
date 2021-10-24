import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';
import VideoPlaceholder from '../../assets/images/video-placeholder.png';

interface ISlide {
    id: Number;
    title: String;
    onSelect: (number) => void;
    onDelete: (number) => void;
    slideType: String;
}

const styles = StyleSheet.create(
  {
    view: {
      width: '100%',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    image: {
      width: 30,
      height: 30,
    },
  },
);
const SlideInEditor = ({
  id, title, onSelect, onDelete, slideType,
}: ISlide) => {
  const renderType = () => {
    switch (slideType) {
      case 'video':
        return <View><Image source={VideoPlaceholder} /></View>;
      case 'image':
        return <View><Image source={ImagePlaceholder} style={styles.image} /></View>;
      default:
        return null;
    }
  };
  return (
    <View style={styles.view}>
      <IconButton
        icon="close"
        size={20}
        onPress={() => onDelete(id)}
      />
      <TouchableOpacity onPress={() => onSelect(id)}>
        <Title>{title}</Title>
        {
          renderType()
    }
      </TouchableOpacity>
    </View>
  );
};

export default SlideInEditor;
