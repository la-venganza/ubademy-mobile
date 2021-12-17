import React, { } from 'react';
import ExamView from '../../components/ExamView';


interface Props {
  navigation: object;
  route: {
    params:{
      courseId: number;
      lessonId: number;
      userId: string;
      examId: number;
      readOnly: boolean;
      takenId: number;
    }
  };
}

const ExamToCorrectScreen = ({
  navigation, route,
} : Props) => {
  const {
    courseId, lessonId, examId, userId, readOnly, takenId,
  } = route.params;

  return (
    <ExamView
      navigation={navigation}
      courseId={courseId}
      lessonId={lessonId}
      examId={examId}
      userId={userId}
      readOnly={readOnly}
      takenId={takenId}
    />
  );
};

export default ExamToCorrectScreen;
