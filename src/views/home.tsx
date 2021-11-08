import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 30,
  },
});

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      courseService.setCookie(auth?.auth?.token);
      const results = await courseService.getCourses();
      console.log('===========>', results.results);
      if (results?.results) {
        setCourses(results.results);
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
        <Button onPress={() => navigation.navigate('Profile')}>My profile</Button>
        <LogoutButton />
      </View>
    </View>
  );
};
export default HomeScreen;
