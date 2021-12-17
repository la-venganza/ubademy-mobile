import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Surface, Text,
} from 'react-native-paper';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  surface: {
    backgroundColor: colors.gray,
    width: '100%',
    padding: 12,
  },
  course: {
    padding: 24,
    backgroundColor: colors.white,
    marginTop: 12,
  },
});

const CourseList = ({ courses = [], handleGoToCourse }) => (
  <Surface style={styles.surface}>
    {courses && courses.length ? courses.map((course) => (
      <TouchableOpacity style={styles.course} key={course.id} onPress={() => handleGoToCourse(course.id)}>
        <Text>{course.title}</Text>
      </TouchableOpacity>
    )) : <Text>There are no courses available</Text>}
  </Surface>
);

export default CourseList;
