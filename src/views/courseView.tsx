import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Divider, Surface, Text, Title,
} from 'react-native-paper';
import ICourse from '../interfaces/ICourse';
import CourseService from '../services/courseService';
import ISlide from '../interfaces/ISlide';
import VideoPlayer from '../components/VideoPlayer';
import SlideList from '../components/SlideList';

interface Props {
    route: {params:{id: number}};
    navigation: object;
}
const dataMock = {
  title: 'Sample title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor nulla ac sem convallis, sit amet lacinia dolor feugiat. Phasellus vitae risus sagittis, cursus arcu vulputate, faucibus neque. Maecenas congue, purus non luctus eleifend, ex neque interdum purus, nec lobortis quam tellus vitae augue. Nullam pharetra facilisis magna, non varius diam faucibus at. Mauris pellentesque aliquam nisl, eget tincidunt eros dignissim at',
  stages: [
    {
      position: 1,
      id: 3,
      active: true,
      required: true,
      multimedia_id: '',
      title: 'Course introduction',
      multimedia_type: 'video',
    },
    {
      position: 2,
      id: 4,
      active: true,
      required: true,
      multimedia_id: '',
      title: 'Chapter 1: Why is this so hard?',
      multimedia_type: 'video',
    },
    {
      position: 3,
      id: 9,
      active: true,
      required: true,
      multimedia_id: '',
      title: 'Chapter 2: The idilic trip of an old man against the odds.',
      multimedia_type: 'image',
    },
  ],
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  courseInfoWrapper: {
    margin: 16,
  },
});

const CourseView = ({ route, navigation }:Props) => {
  const { id } = route.params;
  const [course, setCourse] = useState<ICourse>({});
  const [currentStage, setCurrentStage] = useState<ISlide>({});

  const renderVideo = () => <VideoPlayer />;

  const renderMedia = () => {
    switch (currentStage.multimedia_type) {
      case 'video':
        return renderVideo();
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await CourseService.getCourse(id);
      console.log(courseData);
      if (courseData) {
        setCourse(courseData);
        setCurrentStage(courseData.stages[0]);
      } else {
        setCourse(dataMock);
        setCurrentStage(dataMock.stages[0]);
        // HANDLE ERROR
      }
    };
    fetchCourse();
  }, []);

  return (
    <View>
      <Surface>
        {renderMedia()}
      </Surface>
      <View style={styles.courseInfoWrapper}>
        <Title style={styles.title}>{course.title}</Title>
        <Text>{course.description}</Text>
      </View>
      <Divider style={styles.divider} />
      <Surface>
        <SlideList slides={course.stages} />
      </Surface>
    </View>
  );
};

export default CourseView;
