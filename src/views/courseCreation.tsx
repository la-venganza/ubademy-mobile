import React, { useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text,
} from 'react-native';
import {
  Title, TextInput, Button, Divider, Surface, IconButton, Menu, List,
} from 'react-native-paper';
import SlideInEditor from '../components/SlideInEditor/index';
import SlideEditor from '../components/SlideEditor';
import ISlide from '../interfaces/ISlide';

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

const CourseCreationScreen = () => {
  const [activeSlide, setActiveslide] = useState<ISlide>({ slideType: 'image', title: '' });
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const submit = () => console.log('123');

  const clearActiveSlide = (mediaType:string = 'image') => {
    setActiveslide({ slideType: mediaType, title: '' });
  };

  const selectSlides = (id: number) => {
    const slide = slides.filter((slide:ISlide) => slide.id === id)[0];
    setActiveslide(slide);
  };

  const deleteSlide = (id: number) => {
    setSlides(slides.filter((slide:ISlide) => slide.id !== id));
  };

  const handleSave = () => {
    if (activeSlide.id) {
      if (!activeSlide.media || !(activeSlide.title && activeSlide.title.length)) {
        return console.log('No media no save!');
      }
      const index = slides.findIndex((slide:ISlide) => slide.id === activeSlide.id);
      if (index >= 0) {
        const auxSlides = [...slides];
        auxSlides[index] = activeSlide;
        setSlides(auxSlides);
        clearActiveSlide();
      }
    } else {
      const slide = {
        id: Date.now(),
        ...activeSlide,
      };
      setSlides([...slides, slide]);
      clearActiveSlide();
    }
  };

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleAdd = (mediaType: string) => {
    clearActiveSlide(mediaType);
    closeMenu();
  };

  const cancelAll = () => console.log('a');

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
      <List.AccordionGroup>
        <List.Accordion title="Course information" id="1">
          <TextInput mode="flat" value={courseTitle} placeholder="Course title" onChangeText={(text) => setCourseTitle(text)} />
          <TextInput mode="flat" value={courseDescription} multiline numberOfLines={4} placeholder="Course description" onChangeText={(text) => setCourseDescription(text)} />
        </List.Accordion>
        <List.Accordion title="Slide Editor" id="2">
          <SlideEditor slide={activeSlide} setSlide={setActiveslide} />
          <View style={styles.menuWrapper}>
            <Button onPress={clearActiveSlide}>Cancel</Button>
            <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleSave}>Save</Button>
          </View>
        </List.Accordion>
        <Divider style={styles.divide} />
        <List.Accordion title="Slide list" id="3">
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
        </List.Accordion>
      </List.AccordionGroup>
      <View style={styles.menuWrapper}>
        <Button onPress={cancelAll}>Cancel</Button>
        <Button mode="contained" labelStyle={{ color: 'white' }} onPress={submit}>Submit</Button>
      </View>
    </ScrollView>
  );
};

export default CourseCreationScreen;
