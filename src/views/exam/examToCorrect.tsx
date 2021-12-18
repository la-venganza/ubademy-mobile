import React, { useEffect } from 'react';
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
      enrollId: number;
    }
  };
}

const ExamToCorrectScreen = ({
  navigation, route,
} : Props) => {
  const {
    courseId, lessonId, examId, userId, readOnly, takenId, enrollId,
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
      enrollId={enrollId}
    />
  );
};

export default ExamToCorrectScreen;
