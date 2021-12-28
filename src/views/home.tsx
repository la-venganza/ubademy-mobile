import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import {
  Surface, Title, IconButton, Button,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import CourseList from '../components/CourseList';
import courseService from '../services/courseService';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import PlanToggle from '../components/PlanToggle';
import CategoryDropdown from '../components/CategoryDropdown';

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

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [category, setCategory] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCourses = async () => {
      auth.setEnroll(true)
      courseService.setCookie(auth?.auth?.token);
      const results = await courseService.getCourses(searchTerm, selectedPlan, category);
      if (results?.results?.length) {
        setCourses(results.results);
      }
    };
    fetchCourses();
  }, [isFocused, searchTerm, selectedPlan, category]);

  const handleGoToCourse = (id) => {
    navigation.navigate('Courses', { screen: 'Course view', params: { id } });
  };

  const handleNewCourse = () => {
    navigation.navigate('Courses', { screen: 'Course creation' });
  };

  return (
    <ScrollView>
      <Header userName={auth.auth.name} navigation={navigation} />
      <View style={styles.container}>
        <Surface style={styles.coursesWrapper}>
          <View style={styles.courseTitleWrapper}>
            <Title>Courses</Title>
            <IconButton
              icon="plus-box"
              size={20}
              onPress={handleNewCourse}
            />
          </View>
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryDropdown handleChange={setCategory} category={category} />
          <PlanToggle selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
          <View style={styles.courseWrapperList}>
            <CourseList courses={courses} handleGoToCourse={handleGoToCourse} />
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
