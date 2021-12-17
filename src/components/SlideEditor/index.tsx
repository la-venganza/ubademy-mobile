import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Surface, TextInput, Button, Text, Divider, Menu, Chip,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ISlide from '../../interfaces/ISlide';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';
import VideoPlaceholder from '../../assets/images/video-placeholder.png';
import PDFPlaceholder from '../../assets/images/pdf-placeholder.png';
import IExam from '../../interfaces/IExam';

interface Props {
    slide: ISlide;
    setSlide: (ISlide) => void;
    examList: Array<IExam>;
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
  pdfName: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
});

const SlideEditor = ({ slide, setSlide, examList }: Props) => {
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

  const handleChoosePdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.type !== 'cancel') {
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

  const renderPDFEditor = () => (
    <>
      <Image source={PDFPlaceholder} resizeMethod="resize" resizeMode="contain" style={styles.image} />
      { slide.media && slide.media.name && <View><Text style={styles.pdfName}>{slide.media.name}</Text></View>}
      <Button mode="contained" labelStyle={{ color: 'white' }} onPress={handleChoosePdf}>Choose PDF</Button>
    </>
  );

  const renderEditor = () => {
    switch (slide.slideType) {
      case 'text':
        return <TextInput multiline numberOfLines={4} value={slide.textContent} onChangeText={handleTextContentChange} placeholder="Enter slide text" style={styles.textEditor} />;
      case 'PDF':
        return renderPDFEditor();
      case 'video':
      case 'image':
      default:
        return renderImageVideoEditor();
    }
  };

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const saveExamInSlide = (ex) => {
    setSlide({ ...slide, exam: ex });
    setVisible(false);
  };

  const renderAddExamDropdown = () => (
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Asign Exam</Button>}
      >
        {examList
         && examList.map((ex) => (
           <Menu.Item
             onPress={() => saveExamInSlide(ex)}
             title={ex.title}
           />
         ))}

      </Menu>
    </View>
  );

  const renderExamInSlide = () => {
    console.log(examList);
    if (slide.exam) {
      return (
        <Chip icon="book" style={{ padding: 10 }}>
          Exam:
          {' '}
          {slide.exam.title}
        </Chip>
      );
    } if (examList.length > 0) {
      return renderAddExamDropdown();
    } return null;
  };

  return (
    <Surface style={styles.surface}>
      <View>
        <TextInput mode="flat" value={slide.title} placeholder="Slide title" onChangeText={(text) => setSlideTitle(text)} />
      </View>
      <View>
        {renderEditor()}
      </View>
      <View>
        {renderExamInSlide()}
      </View>
    </Surface>
  );
};

export default SlideEditor;
