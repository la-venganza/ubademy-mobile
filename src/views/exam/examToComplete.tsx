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
}

const ExamToCompleteScreen = ({ navigation } : Props) => {
  const [exam, setExam] = useState<IExam>({});

  const setAnswer = (idAnswer: string) => {
    // todo
    console.log(idAnswer);
  };
  const isFocused = useIsFocused();

  const fetchExam = async () => {
    // todo
    const examData = await examService.getExam('', '');
    if (examData) {
      setExam(examData);
    }
  };

  const submit = () => {
    // TODO should submit the exam completed by te student to the back.
  };

  const cancelAll = () => {
    // TODO should go back to previous screen
  };

  useEffect(() => {
    fetchExam();
  }, []);

  function renderMultipleChoice(choice, setAnswerCallback) {
    return (<ExamMultipleChoice examMultipleChoice={choice} setAnswer={setAnswerCallback} />);
  }

  function renderDevelopQuestion(developQuestion, setAnswerCallback) {
    return (
      <ExamDevelopQuestion
        examDevelopQuestion={developQuestion}
        returnAnwser={setAnswerCallback}
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
                      return renderDevelopQuestion(question, setAnswer);
                    }
                    return renderMultipleChoice(question, setAnswer);
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
