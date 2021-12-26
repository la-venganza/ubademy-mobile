import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider, Surface, Text, Title, Snackbar,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ICourse from '../interfaces/ICourse';
import CourseService from '../services/courseService';
import courseService from '../services/courseService';
import { LoadingContext } from '../context/LoadingContext';
import { AuthContext } from '../context/AuthContext';

  interface Props {
      route: {params:{id: number}};
      navigation: object;
  }

const styles = StyleSheet.create({
  divider: {
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  courseInfoWrapper: {
    margin: 16,
  },
  pdfSlide: {
    width: '100%',
    aspectRatio: 2,
    padding: 15,
  },
  pdfSlideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  pdfButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  enrollLabel: {
    textAlign: 'center',
  },
});
const isRightPlan = (userSubscriptions, requiredSubs) => userSubscriptions.some((subscription) => subscription.subscription.title === requiredSubs.title);

const CourseEnroll = ({ route, navigation }:Props) => {
  const auth = useContext(AuthContext);
  const { id } = route.params;
  const [course, setCourse] = useState<ICourse>({});
  const scrollRef = useRef();
  const loadingCtx = useContext(LoadingContext);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      auth.setEnroll(false)
      loadingCtx.setLoading(true);
      const courseData = await CourseService.getCourse(id);

      if (courseData?.id) {
        setCourse(courseData);
      }
      loadingCtx.setLoading(false);
    };
    fetchCourse();
  }, []);

  const doEnroll = async () => {
    loadingCtx.setLoading(true);
    const response = await courseService.enroll(id, auth.userId);
    loadingCtx.setLoading(false);
    if (response) {
      auth.setCourses([...(auth.auth.courses), { course }]);
      navigation.navigate('Course view', { id });
    } else {
      setShowSnackbar(true);
    }
  };

  const renderSnackbar = () => (
    <Snackbar
      visible={showSnackbar}
      onDismiss={() => setShowSnackbar(false)}
      action={{
        label: 'close',
        onPress: () => {
          setShowSnackbar(false);
        },
      }}
    >
      There was an error while enrolling!
    </Snackbar>
  );

  const renderCorrectPlan = () => (
    <>
      <Text style={styles.enrollLabel}>You can enroll to this course now!</Text>
      <View>
        <Button onPress={doEnroll}>Enroll</Button>
      </View>
    </>
  );

  const renderPlanUpgrade = () => (
    <>
      <Text style={styles.enrollLabel}>
        This course requires a
        {' '}
        {course.subscription_required?.title}
        {' '}
        subscription. Upgrade now!
      </Text>
      <View><Button onPress={() => navigation.navigate('Profile', { screen: 'Subscription' })}>Go to subscriptions</Button></View>
    </>
  );

  return (
    <View>
      <ScrollView ref={scrollRef}>
        <View style={styles.courseInfoWrapper}>
          <Title style={styles.title}>{course.title}</Title>
          <Text>{course.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <Surface>
          {
                course.subscription_required && isRightPlan(auth.subscription, course.subscription_required)
                  ? renderCorrectPlan()
                  : renderPlanUpgrade()
            }
        </Surface>
      </ScrollView>
      {renderSnackbar()}
    </View>
  );
};

export default CourseEnroll;
