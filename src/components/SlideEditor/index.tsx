import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Surface, TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ISlide from '../../interfaces/ISlide';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';
import VideoPlaceholder from '../../assets/images/video-placeholder.png';

interface Props {
    slide: ISlide;
    setSlide: (ISlide) => void;
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 25,
    padding: 0,
    alignSelf: 'center',
    marginBottom: 0,
  },
  textEditor: {
    marginTop: 25,
  },
});

const SlideEditor = ({ slide, setSlide }: Props) => {
  const setSlideTitle = (title: string) => {
    setSlide({ ...slide, title });
  };

  const handleTextContentChange = (text: string) => {
    setSlide({ ...slide, textContent: text });
  };

  const handleChoosePhoto = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: slide.slideType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSlide({ ...slide, media: result });
    }
  };

  const renderDefaultImage = (slideType: string) => {
    switch (slideType) {
      case 'video':
        return <View><Image source={VideoPlaceholder} style={styles.image} resizeMethod="resize" resizeMode="contain" /></View>;
      case 'image':
        return <View><Image source={ImagePlaceholder} style={styles.image} resizeMethod="resize" resizeMode="contain" /></View>;
      default:
        return null;
    }
  };

  const renderImageVideoEditor = () => (
    <>
      {slide.media ? (
        <>
          <Image
            source={{ uri: slide.media.uri }}
            style={styles.image}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </>
      ) : renderDefaultImage(slide.slideType)}
      <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleChoosePhoto}>Choose Media</Button>
    </>
  );

  const renderEditor = () => {
    switch (slide.slideType) {
      case 'text':
        return <TextInput multiline numberOfLines={4} value={slide.textContent} onChangeText={handleTextContentChange} placeholder="Enter slide text" style={styles.textEditor} />;
      case 'video':
      case 'image':
      default:
        return renderImageVideoEditor();
    }
  };

  return (
    <Surface style={styles.surface}>
      <View>
        <TextInput mode="flat" value={slide.title} placeholder="Slide title" onChangeText={(text) => setSlideTitle(text)} />
      </View>
      <View>
        {renderEditor()}
      </View>
    </Surface>
  );
};

export default SlideEditor;
