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

const CourseExamsListScreen = ({ navigation, route }) => {
  const auth = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const isFocused = useIsFocused();

  const { id } = route.params;

  useEffect(() => {
    const fetchExams = async () => {
      const results = await examsService.getExamsByCourse(id, auth.userId);
      setExams(results.results);
    };
    fetchExams();
  }, [isFocused]);

  const handleGoToExam = (exam) => {
    alert(JSON.stringify(exam));
  };

  return (
    <View>
      { (exams && exams.length !== 0)
        ? (
          <>
            <ScrollView>
              <View style={styles.courseWrapperList}>
                <ExamsList exams={exams} handleGoToExam={handleGoToExam} />
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
export default CourseExamsListScreen;
