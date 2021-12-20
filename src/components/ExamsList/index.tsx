import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
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

const renderGraded = (exam) => (
  <View>
    <Text style={{ color: 'green' }}>Graded</Text>
  </View>
);

const getUniqueId = (exam) => `${exam.exam_id}-${exam.exam_taken_id}`;

const ExamsList = ({ exams = [], handleGoToExam }) => {
  const auth = useContext(AuthContext);
  return (
    <Surface style={styles.surface}>
      { exams?.map((exam) => (
        <TouchableOpacity
          style={styles.course}
          key={getUniqueId(exam)}
          onPress={() => handleGoToExam(exam)}
        >
          <Text>
            {exam.course_title && 'Course title'}
            {exam.course_title && ' '}
            {exam.course_title && exam.course_title}

            {exam.course_title && '\n'}
            Lesson
            {' '}
            {exam.lesson_id}

            {exam.student_username && '\n'}
            {exam.student_username && 'Student'}
            {exam.student_username && ' '}
            {exam.student_username && exam.student_username}

            {exam.exam_date && '\n'}
            {exam.exam_date && 'Exam date'}
            {exam.exam_date && ' '}
            {exam.exam_date && exam.exam_date}

            {exam.title && '\n'}
            {exam.title && 'Title'}
            {exam.title && ' '}
            {exam.title && exam.title}

            {exam.description && '\n'}
            {exam.description && 'Description'}
            {exam.description && ' '}
            {exam.description && exam.description}
          </Text>
          
          {exam.exam_grade && renderGraded(exam)}
        </TouchableOpacity>
      ))}
    </Surface>
  );
};

export default ExamsList;
