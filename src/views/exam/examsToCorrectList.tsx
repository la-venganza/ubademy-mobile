import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import {
  Surface, Title, IconButton, Button,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import ExamsList from '../../components/ExamsList';
import examsService from '../../services/examService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 30,
  },
  coursesWrapper: {
    marginTop: 24,
    width: '90%',
  },
  courseWrapperTitle: {
    fontSize: 18,
  },
  courseWrapperList: {
    marginTop: 18,
  },
  courseTitleWrapper: {
    flexDirection: 'row',
  },
  welcomeText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const ExamsToCorrectListScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchExams = async () => {
      const results = await examsService.getExamsListToCorrect(auth.userId);
      setExams(results);
    };
    fetchExams();
  }, [isFocused]);

  const handleGoToExam = (exam) => {
    navigation.navigate('ExamToCorrect', {
      courseId: exam.course_id,
      lessonId: exam.lesson_id,
      examId: exam.exam_id,
      userId: auth.userId,
      readOnly: true,
      takenId: exam.exam_taken_id,
    });
  };

  return (
    <ScrollView>
      <View style={styles.courseWrapperList}>
        <ExamsList exams={exams} handleGoToExam={handleGoToExam} />
      </View>
    </ScrollView>
  );
};
export default ExamsToCorrectListScreen;
