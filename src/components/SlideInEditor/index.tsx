import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';
import VideoPlaceholder from '../../assets/images/video-placeholder.png';
import PDFPlaceholder from '../../assets/images/pdf-placeholder.png';

interface ISlide {
    id: Number;
    title: String;
    onSelect: (number) => void;
    onDelete: (number) => void;
    slideType: String;
    onLongPress: (number) => void;
    disabled: boolean;
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
  id, title, onSelect, onDelete, slideType, onLongPress, disabled,
}: ISlide) => {
  const renderType = () => {
    switch (slideType) {
      case 'video':
        return <View><Image source={VideoPlaceholder} /></View>;
      case 'image':
        return <View><Image source={ImagePlaceholder} style={styles.image} /></View>;
      case 'PDF':
        return <View><Image source={PDFPlaceholder} resizeMethod="resize" resizeMode="contain" style={styles.image} /></View>;
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity style={styles.view} onPressIn={onLongPress} disabled={disabled}>
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
    </TouchableOpacity>
  );
};

export default SlideInEditor;
