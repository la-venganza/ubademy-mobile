import React, { useState } from 'react';
import {
  StyleSheet, View, Image, ScrollView, Text,
} from 'react-native';
import {
  Title, TextInput, Button, Divider, Surface, IconButton, Menu,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import SlideInEditor from '../components/SlideInEditor/index';
import ImagePlaceholder from '../assets/images/image-placeholder.jpg';
import VideoPlaceholder from '../assets/images/video-placeholder.png';

const CourseCreationScreen = () => {
  const [media, setMedia] = useState(null);
  const [activeSlide, setActiveslide] = useState({ slideType: 'image' });
  const [slides, setSlides] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [slideTitle, setSlideTitle] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const submit = () => console.log('123');

  const clearActiveSlide = () => {
    setMedia(null);
    setActiveslide({ slideType: 'image' });
    setSlideTitle('');
  };

  const selectSlides = (id: Number) => {
    const slide = slides.filter((slide) => slide.id === id)[0];
    setActiveslide(slide);
    setMedia(slide.media);
    setSlideTitle(slide.title);
  };

  const deleteSlide = (id: Number) => {
    setSlides(slides.filter((slide) => slide.id !== id));
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: activeSlide.slideType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMedia(result);
    }
  };

  const handleSave = () => {
    if (activeSlide.id) {
      if (!media || !slideTitle.length) {
        return console.log('No media no save!');
      }
      const index = slides.findIndex((slide) => slide.id === activeSlide.id);
      activeSlide.media = media;
      activeSlide.title = slideTitle;
      if (index) {
        const auxSlides = [...slides];
        auxSlides[index] = activeSlide;
        setSlides(auxSlides);
        setActiveslide({ slideType: 'image' });
        setMedia(null);
        setSlideTitle('');
      }
    } else {
      const slide = {
        id: Date.now(),
        title: slideTitle,
        media,
        slideType: activeSlide.slideType,
      };
      setSlides([...slides, slide]);
      setActiveslide({ slideType: 'image' });
      setMedia(null);
      setSlideTitle('');
    }
  };

  const renderDefaultImage = (slideType) => {
    console.log(slideType);
    switch (slideType) {
      case 'video':
        return <View><Image source={VideoPlaceholder} style={styles.image} resizeMethod="resize" resizeMode="contain" /></View>;
      case 'image':
        return <View><Image source={ImagePlaceholder} style={styles.image} style={styles.image} resizeMethod="resize" resizeMode="contain" /></View>;
      default:
        return null;
    }
  };

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleAdd = (mediaType: string) => {
    clearActiveSlide();
    console.log('add', mediaType);
    setActiveslide({ slideType: mediaType });
    // activeSlide.slideType = mediaType;
    closeMenu();
  };

  const renderMenu = () => (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={(
        <IconButton
          icon="plus-box"
          size={20}
          onPress={openMenu}
        />
)}
    >
      <Menu.Item onPress={() => handleAdd('video')} title="Add video slide" />
      <Menu.Item onPress={() => handleAdd('image')} title="Add image slide" />
    </Menu>
  );

  return (
    <ScrollView style={styles.mainWrapper}>
      <Title>Course creation!</Title>
      <TextInput mode="flat" value={courseTitle} placeholder="Course title" onChangeText={(text) => setCourseTitle(text)} />
      <Surface style={styles.surface}>
        <View>
          <TextInput mode="flat" value={slideTitle} placeholder="Slide title" onChangeText={(text) => setSlideTitle(text)} />
          {media ? (
            <>
              <Image
                source={{ uri: media.uri }}
                style={styles.image}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </>
          ) : renderDefaultImage(activeSlide.slideType)}
        </View>
        <View>
          <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleChoosePhoto}>Choose Media</Button>
        </View>
      </Surface>
      <View style={styles.menuWrapper}>
        <Button onPress={clearActiveSlide}>Cancel</Button>
        <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleSave}>Save</Button>
      </View>
      <Divider style={styles.divide} />
      <View style={styles.addWrapper}>
        {renderMenu()}
      </View>
      <Surface style={styles.surface}>
        <ScrollView>
          {
            slides.length
              ? slides.map((slide) => <SlideInEditor id={slide.id} key={slide.id} title={slide.title} slideType={slide.slideType} onDelete={deleteSlide} onSelect={selectSlides} />)
              : <Text>No slides for this course yet!</Text>
          }
        </ScrollView>
      </Surface>
      <Button onPress={submit}>Submit</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
  },
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
  divide: {
    marginTop: 30,
    marginBottom: 30,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  addWrapper: {
    alignItems: 'flex-end',
  },
  buttonContained: {
    color: 'white',
  },
});

export default CourseCreationScreen;
