import React, { useContext } from 'react';
import {
  StyleSheet, View, ScrollView,
} from 'react-native';
import {
  Surface,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import CourseList from '../components/CourseList';
import Header from '../components/Header';

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

const CreatedCoursesListScreen = ({ navigation, route }) => {
  const auth = useContext(AuthContext);

  const { courses, handleGoToCourse } = route !== undefined && route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Surface style={styles.coursesWrapper}>
          <View style={styles.courseWrapperList}>
            <CourseList courses={courses} handleGoToCourse={handleGoToCourse} />
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};
export default CreatedCoursesListScreen;
