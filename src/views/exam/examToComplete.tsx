import React, {  } from 'react';
import {
  StyleSheet,
} from 'react-native';
import ExamView from '../../components/ExamView';

interface Props {
  navigation: object;
  route: {params:{
      courseId: number;
      lessonId: number;
      userId: string;
      examId: number;
    }
  };
}

const ExamToCompleteScreen = ({
  navigation, route,
} : Props) => {
  const {
    courseId, lessonId, examId, userId,
  } = route.params;

  return (
    <ExamView
      navigation={navigation}
      courseId={courseId}
      lessonId={lessonId}
      examId={examId}
      userId={userId}
      readOnly={false}
    />
  );
};

export default ExamToCompleteScreen;
