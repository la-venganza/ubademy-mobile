import React, { useState, useEffect } from 'react';
import {
  View, SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Button, Card, ActivityIndicator,
} from 'react-native-paper';
import examService from '../../services/examService';
import IExam from '../../interfaces/IExam';
import ExamMultipleChoice from '../../components/ExamMultipleChoice';
import ExamDevelopQuestion from '../../components/ExamDevelopQuestion';
import IExamAnswer from '../../interfaces/IExamAnswer';
import ExamView from '../../components/ExamView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 12,
  },
});

interface Props {
  navigation: object;
  route: {params:{ courseId: number;
    lessonId: number;
    userId: string;
    examId: number;}};

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
