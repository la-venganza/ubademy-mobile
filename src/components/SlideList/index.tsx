import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Badge, Surface, Text, Title,
} from 'react-native-paper';

const styles = StyleSheet.create({
  slide: {
    padding: 12,
  },
  activeSlide: {
    padding: 12,
    backgroundColor: 'gray',
  },
  seenWrapper: {
    flexDirection: 'column',
    width: '20%',
  },
  centeredItem: {
    alignSelf: 'center',
  },
});
const SlideList = ({ slides = [] }) => {
  const [activeSlideId, setActiveSlideId] = useState(-1);

  useEffect(() => {
    if (slides.length) {
      let maxIndex = -1;
      slides.forEach((slide, index) => (slide.seen ? maxIndex = index : null));
      if (maxIndex === slides.length + 1) {
        maxIndex = 0;
      } else {
        maxIndex += 1;
      }
      setActiveSlideId(slides[maxIndex].id);
    }
  }, [slides]);

  const renderSlide = (slide) => (
    <Surface style={slide.id === activeSlideId ? styles.activeSlide : styles.slide}>
      <View>
        <Title>{slide.title}</Title>
        <Text>{slide.multimedia_type}</Text>
      </View>
      <View style={styles.seenWrapper}>
        <Badge style={styles.centeredItem} />
      </View>
    </Surface>
  );

  return (
    <Surface>
      {slides && slides.map((slide) => renderSlide(slide))}
    </Surface>
  );
};

export default SlideList;
