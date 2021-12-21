import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import ColorPalette from '../../styles/colors';
import courseService from '../../services/courseService';

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.primary,
    borderWidth: 0.5,
    borderColor: ColorPalette.gray,
    height: 40,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    alignSelf: 'center',
  },
});

interface Props {
    courseId: string,
  }

const LeaveCourseButton = ({ courseId }: Props) => {
  const authCtx = useContext(AuthContext);

  const leaveCourse = async () => {
    const result = await courseService.leaveCourse(authCtx.userId, courseId);
    if (result) {
      const filteredCourses = authCtx.auth.courses.filter((course) => course.course.id !== courseId);
      authCtx.setCourses(filteredCourses);
    }
  };
  return (
    <Button mode="text" onPress={leaveCourse}>
      <Text style={styles.TextStyle}>Leave course</Text>
    </Button>
  );
};

export default LeaveCourseButton;
