import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface, Title, IconButton } from 'react-native-paper';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';
import CourseList from '../components/CourseList';
import courseService from '../services/courseService';

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
});

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const results = await courseService.getCourses();
      if (results) {
        setCourses(results);
      } else {
        // handle no courses
        setCourses([{ title: 'test title' }, { title: 'otro title' }]);
      }
    };
    fetchCourses();
  }, []);

  const handleGoToCourse = (id) => {
    navigation.navigate('Course view', { id });
  };

  const handleNewCourse = () => {
    navigation.navigate('Course creation');
  };

  return (
    <View style={styles.container}>
      <Text>
        Hello
        {' '}
        {auth.auth.name}
        . Welcome to Ubademy!
      </Text>
      <View style={styles.logoutButton}>
        <LogoutButton />
      </View>
      <Surface style={styles.coursesWrapper}>
        <View style={styles.courseTitleWrapper}>
          <Title>Courses</Title>
          <IconButton
            icon="plus-box"
            size={20}
            onPress={handleNewCourse}
          />
        </View>
        <View style={styles.courseWrapperList}>
          <CourseList courses={courses} handleGoToCourse={handleGoToCourse} />
        </View>
      </Surface>
    </View>
  );
};
export default HomeScreen;
