import React, { useState, useEffect } from 'react';
import {
  View, SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Button, Card, ActivityIndicator, TextInput,
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
  wrapper: {
    flex: 1,
    width: '99%',
    alignSelf: 'center',
  },
  buttonWrapper: {
    marginTop: 25,
  },
});

interface Props {
  navigation: object;
  courseId: number;
  lessonId: number;
  examId: number;
  userId: string;
  readOnly: boolean;
  takenId: number;
  enrollId: number;
}

const ExamView = ({
  navigation, courseId, lessonId, examId, userId,
  readOnly, takenId, enrollId,
} : Props) => {
  const [exam, setExam] = useState<IExam>({});
  const [resolution, setResolution] = useState({});
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState();

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

    if (readOnly) {
      const res = await examService.getExamSolution(examId, courseId, lessonId, userId, takenId);
      setResolution(res);
      if (!enrollId) {
        setScore(res.grade);
      }
    }

    if (examData) {
      setExam(examData);
    }
  };

  // fixme: deberia este objeto recibir una funcion onsubmit en vez de tantos if.
  const submit = () => {
    console.log(enrollId && readOnly);
    if (readOnly && enrollId) {
      examService.setExamGrade(examId, userId, takenId, enrollId, score, courseId, lessonId);
    } else {
      examService.submitExamAnswers(examId, courseId, lessonId, userId, Object.values(answers));
    }

    // fixme
    navigation.goBack(null);
  };

  const cancelAll = () => {
    navigation.goBack(null);
  };

  const findStudentAnswerIfAny = (sequenceNumber, type) => {
    if (readOnly) {
      const answer = resolution
        .answers
        .find((elm) => elm.question.sequence_number === sequenceNumber);
      if (answer) {
        const retValue = type === 'develop' ? answer.text : answer.choice_id;
        return retValue;
      }
      return '';
    }
    return '';
  };

  useEffect(() => {
    fetchExam();
  }, [isFocused]);

  function renderMultipleChoice(choice, sequenceNumber) {
    return (
      <ExamMultipleChoice
        examMultipleChoice={choice}
        setAnswer={setAnswer}
        readOnly={readOnly}
        answerSet={findStudentAnswerIfAny(sequenceNumber, 'choice')}
      />
    );
  }

  function renderDevelopQuestion(developQuestion, sequenceNumber) {
    return (
      <ExamDevelopQuestion
        examDevelopQuestion={developQuestion}
        returnAnwser={setAnswer}
        readOnly={readOnly}
        studentAnswer={findStudentAnswerIfAny(sequenceNumber, 'develop')}
      />
    );
  }

  function renderScoreButton() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          disabled={enrollId === undefined}
          mode="outlined"
          value={score && score.toString()}
          onChangeText={setScore}
          label="Score"
        />
      </View>

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
                      return renderDevelopQuestion(question.developQuestion, question.sequenceNumber);
                    }
                    return renderMultipleChoice(question.multipleChoiceQuestion, question.sequenceNumber);
                  })}
                </View>
                {readOnly && renderScoreButton()}
                {(readOnly && !enrollId)
                  ? (
                    <>
                      <View>
                        <Button mode="contained" labelStyle={{ color: 'white' }} onPress={cancelAll}>Back</Button>
                      </View>

                    </>
                  )
                  : (
                    <>
                      <View style={styles.menuWrapper}>
                        <Button onPress={cancelAll}>Cancel</Button>
                        <Button mode="contained" labelStyle={{ color: 'white' }} onPress={submit}>Submit</Button>
                      </View>

                    </>
                  )}
              </ScrollView>

            </>
          ) : <ActivityIndicator size="large" color="#00ff00" /> }
      </View>
    </SafeAreaView>
  );
};

export default ExamView;
