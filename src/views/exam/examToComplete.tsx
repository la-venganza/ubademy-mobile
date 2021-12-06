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
  const [exam, setExam] = useState<IExam>({});

  const {
    courseId, lessonId, examId, userId,
  } = route.params;

  const [answers, setAnswers] = useState({});

  const setAnswer = (answer: IExamAnswer) => {
    const qId = answer.questionId;
    const newAnswers = {
      ...answers,
      [qId]: answer,
    };
    setAnswers(newAnswers);
  };

  const isFocused = useIsFocused();

  const fetchExam = async () => {
    const examData = await examService.getExam(courseId, lessonId, userId, examId);
    if (examData) {
      setExam(examData);
    }
  };

  const submit = () => {
    examService.submitExamAnswers(examId, courseId, lessonId, userId, Object.values(answers));
    navigation.goBack(null);
  };

  const cancelAll = () => {
    navigation.goBack(null);
  };

  useEffect(() => {
    fetchExam();
  }, [isFocused]);

  function renderMultipleChoice(choice) {
    return (<ExamMultipleChoice examMultipleChoice={choice} setAnswer={setAnswer} />);
  }

  function renderDevelopQuestion(developQuestion) {
    return (
      <ExamDevelopQuestion
        examDevelopQuestion={developQuestion}
        returnAnwser={setAnswer}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {exam.questions
          ? (
            <>
              <ScrollView>
                <View>
                  <Card.Title
                    title={exam.title}
                    subtitle="Exam stage"
                  />
                  {exam.questions.map((question) => {
                    if (question.type === 'develop') {
                      return renderDevelopQuestion(question.developQuestion);
                    }
                    return renderMultipleChoice(question.multipleChoiceQuestion);
                  })}
                </View>
                <View style={styles.menuWrapper}>
                  <Button onPress={cancelAll}>Cancel</Button>
                  <Button mode="contained" labelStyle={{ color: 'white' }} onPress={submit}>Submit</Button>
                </View>
              </ScrollView>
            </>
          ) : <ActivityIndicator size="large" color="#00ff00" /> }
      </View>
    </SafeAreaView>
  );
};

export default ExamToCompleteScreen;
