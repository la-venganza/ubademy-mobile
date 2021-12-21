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
  twoButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  msg: {
    marginTop: 12,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const ExamsToCorrectListScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const isFocused = useIsFocused();
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchExams = async () => {
      const results = await examsService.getExamsListToCorrect(auth.userId);
      setExams(results);
    };
    fetchExams();
  }, [isFocused]);

  const handleSelect = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
  };

  const getExamsToShow = () => (selectedFilter === 'all' ? exams : exams.filter((e) => !e.exam_grade));

  const handleGoToExam = (exam) => {
    navigation.navigate('ExamToCorrect', {
      courseId: exam.course_id,
      lessonId: exam.lesson_id,
      examId: exam.exam_id,
      userId: auth.userId,
      readOnly: true,
      takenId: exam.exam_taken_id,
      enrollId: exam.enroll_course_id,
    });
  };

  return (
    <View>
      <View style={styles.twoButtons}>
        <Button mode={selectedFilter === 'all' ? 'contained' : 'outlined'} onPress={() => handleSelect('all')}>All</Button>
        <Button mode={selectedFilter === 'notGraded' ? 'contained' : 'outlined'} onPress={() => handleSelect('notGraded')}>Not graded</Button>
      </View>

      { (getExamsToShow().length !== 0)
        ? (
          <>
            <ScrollView>
              <View style={styles.courseWrapperList}>
                <ExamsList exams={getExamsToShow()} handleGoToExam={handleGoToExam} />
              </View>
            </ScrollView>
          </>
        )
        : (
          <>
            <View>
              <Text style={styles.msg}>No exams matching filter.</Text>
            </View>

          </>
        )}

    </View>

  );
};
export default ExamsToCorrectListScreen;
