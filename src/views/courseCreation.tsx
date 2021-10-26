import React, { useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text,
} from 'react-native';
import {
  Title, TextInput, Button, Divider, Surface, IconButton, Menu, List,
} from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import SlideInEditor from '../components/SlideInEditor/index';
import SlideEditor from '../components/SlideEditor';
import ISlide from '../interfaces/ISlide';

interface expandables {
  courseInfo: boolean;
  slideEditor: boolean;
  slideList: boolean;
}

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

const IDefaultAccordionStatus = { courseInfo: true, slideEditor: false, slideList: false };
enum Sections {courseInfo = 1, slideEditor = 2, slideList = 3 }

const CourseCreationScreen = () => {
  const [activeSlide, setActiveslide] = useState<ISlide>({ slideType: 'image', title: '' });
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState<expandables>(IDefaultAccordionStatus);

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

  const handleAccordionClick = (section: number) => {
    setIsExpanded({
      courseInfo: section === Sections.courseInfo && !isExpanded.courseInfo,
      slideEditor: section === Sections.slideEditor && !isExpanded.slideEditor,
      slideList: section === Sections.slideList && !isExpanded.slideList,
    });
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
        handleAccordionClick(Sections.slideList);
      }
    } else {
      const slide = {
        ...activeSlide,
        id: Date.now(),
        position: slides.length,
      };
      setSlides([...slides, slide]);
      clearActiveSlide();
      handleAccordionClick(Sections.slideList);
    }
  };

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleAdd = (mediaType: string) => {
    clearActiveSlide(mediaType);
    closeMenu();
    handleAccordionClick(Sections.slideEditor);
  };

  const cancelAll = () => console.log('a');

  const swap = ({ from, to }) => {
    const aux = slides[from];
    const auxArray = [...slides];
    auxArray.splice(from, 1);
    auxArray.splice(to, 0, aux);
    auxArray.forEach((slide:ISlide, index:number) => { slide.position = index; });
    setSlides(auxArray);
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
      <Menu.Item onPress={() => handleAdd('text')} title="Add text slide" />
    </Menu>
  );

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
    <SlideInEditor
      id={item.id}
      key={item.id}
      title={item.title}
      slideType={item.slideType}
      onDelete={deleteSlide}
      onSelect={selectSlides}
      onLongPress={drag}
      disabled={isActive}
    />
  );

  return (
    <ScrollView style={styles.mainWrapper}>
      <Title>Course creation!</Title>
      <List.Section>
        <List.Accordion title="Course information" id="1" expanded={isExpanded.courseInfo} onPress={() => handleAccordionClick(Sections.courseInfo)}>
          <TextInput mode="flat" value={courseTitle} placeholder="Course title" onChangeText={(text) => setCourseTitle(text)} />
          <TextInput mode="flat" value={courseDescription} multiline numberOfLines={4} placeholder="Course description" onChangeText={(text) => setCourseDescription(text)} />
        </List.Accordion>
        <List.Accordion title="Slide Editor" id="2" expanded={isExpanded.slideEditor} onPress={() => handleAccordionClick(Sections.slideEditor)}>
          <SlideEditor slide={activeSlide} setSlide={setActiveslide} />
          <View style={styles.menuWrapper}>
            <Button onPress={clearActiveSlide}>Cancel</Button>
            <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleSave}>Save</Button>
          </View>
        </List.Accordion>
        <Divider style={styles.divide} />
        <List.Accordion title="Slide list" id="3" expanded={isExpanded.slideList} onPress={() => handleAccordionClick(Sections.slideList)}>
          <View style={styles.addWrapper}>
            {renderMenu()}
          </View>
          <Surface style={styles.surface}>
            <ScrollView>

              {
            slides.length
              ? (
                <DraggableFlatList
                  data={slides}
                  onDragEnd={swap}
                  keyExtractor={(slide) => slide.id}
                  renderItem={renderItem}
                />
              )
              : <Text>No slides for this course yet!</Text>
          }
            </ScrollView>
          </Surface>
        </List.Accordion>
      </List.Section>
      <View style={styles.menuWrapper}>
        <Button onPress={cancelAll}>Cancel</Button>
        <Button mode="contained" labelStyle={{ color: 'white' }} onPress={submit}>Submit</Button>
      </View>
    </ScrollView>
  );
};

export default CourseCreationScreen;
