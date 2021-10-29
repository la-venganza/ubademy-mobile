import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Divider, Surface, Text, Title,
} from 'react-native-paper';
import ICourse from '../interfaces/ICourse';
import CourseService from '../services/courseService';

interface Props {
    route: {params:{id: number}};
    navigation: object;
}

const CourseView = ({ route, navigation }:Props) => {
  const { id } = route.params;
  const [course, setCourse] = useState<ICourse>({});

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await CourseService.getCourse(id);
      if (courseData.id) {
        setCourse(courseData);
      } else {
        // HANDLE ERROR
      }
    };
    fetchCourse();
  }, []);

  return (
    <View>
      <Surface>
        <Text>ACA VA UN VIDEO EH</Text>
      </Surface>
      <View>
        <Title>{course.title}</Title>
        <Text>{course.description}</Text>
      </View>
      <Divider />
      <Surface>
        <Text>ACA VA UNa lista</Text>
      </Surface>
    </View>
  );
};

export default CourseView;
