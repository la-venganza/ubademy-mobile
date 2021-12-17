import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Surface, Text,
} from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
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

const getUniqueId = (exam) => `${exam.exam_id}-${exam.exam_taken_id}`;

const ExamsList = ({ exams = [], handleGoToExam }) => {
  const auth = useContext(AuthContext);
  return (
    <Surface style={styles.surface}>
      {exams && exams.map((exam) => (
        <TouchableOpacity
          style={styles.course}
          key={getUniqueId(exam)}
          onPress={() => handleGoToExam(exam)}
        >
          <Text>
            Course
            {' '}
            {exam.course_title}
            {'\n'}
            Lesson
            {' '}
            {exam.lesson_id}
            {'\n'}
            Student
            {' '}
            {exam.student_username}
            {'\n'}
            Date
            {' '}
            {exam.exam_date}
          </Text>
        </TouchableOpacity>
      ))}
    </Surface>
  );
};

export default ExamsList;
