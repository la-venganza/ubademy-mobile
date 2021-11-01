import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Badge, Surface, Text, Title,
} from 'react-native-paper';

const styles = StyleSheet.create({
  slide: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  activeSlide: {
    padding: 12,
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  seenWrapper: {
    flexDirection: 'column',
    width: '20%',
  },
  centeredItem: {
    alignSelf: 'center',
  },
  slideInfoWrapper: {
    width: '80%',
  },
});
const SlideList = ({ slides = [], handleSelect, activeSlide }) => {
  useEffect(() => {
    if (slides.length && activeSlide.id === undefined) {
      let maxIndex = -1;
      slides.forEach((slide, index) => (slide.seen ? maxIndex = index : null));
      if (maxIndex === slides.length - 1) {
        maxIndex = 0;
      } else {
        maxIndex += 1;
      }
      handleSelect(slides[maxIndex].id);
    }
  }, [slides]);

  const onSlideTouch = (id: number) => {
    if (id !== activeSlide.id) {
      handleSelect(id);
    }
  };

  const renderSlide = (slide) => (
    <Surface
      key={slide.id}
    >
      <TouchableOpacity
        onPress={() => onSlideTouch(slide.id)}
        style={slide.id === activeSlide.id ? styles.activeSlide : styles.slide}
      >
        <View style={styles.slideInfoWrapper}>
          <Title>{slide.title}</Title>
          <Text>{slide.multimedia_type}</Text>
        </View>
        <View style={styles.seenWrapper}>
          {slide.seen && <Badge style={styles.centeredItem} />}
        </View>
      </TouchableOpacity>
    </Surface>
  );

  return (
    <Surface>
      {slides && slides.map((slide) => renderSlide(slide))}
    </Surface>
  );
};

export default SlideList;
