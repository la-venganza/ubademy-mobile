import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Surface, TextInput,
} from 'react-native-paper';
import { IExamDevelopQuestion } from '../../interfaces/IExamDevelopQuestion';
import ColorPalette from '../../styles/colors';

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    marginTop: 20,
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.primary,
    borderWidth: 0.5,
    borderColor: ColorPalette.gray,
    height: 40,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    alignSelf: 'center',
  },
  TextStyle: {
    color: ColorPalette.white,
    fontWeight: 'bold',
  },
});

interface Props {
    saveQuestion: (question: IExamDevelopQuestion, score: number, questionId: number) => void;
    questionId: number;
}

const ExamDevelopQuestionEditor = ({ saveQuestion, questionId }: Props) => {
  const [question, _setQuestion] = useState('');

  const setQuestion = (questionText: string) => {
    _setQuestion(questionText);

    const newQuestion : IExamDevelopQuestion = {
      text: questionText,
    };
    saveQuestion(newQuestion, 1, questionId);
  };

  const [score, _setScore] = useState('');

  const setScore = (score) => {
    _setScore(score);
  };

  return (
    <Surface style={styles.surface}>
      <TextInput
        multiline
        mode="outlined"
        label="Question"
        numberOfLines={4}
        value={question}
        onChangeText={setQuestion}
        onPressIn={undefined}
        onPressOut={undefined}
      />
      <TextInput
        mode="outlined"
        value={score}
        label="Score"
        onChangeText={setScore}
        onPressIn={undefined}
        onPressOut={undefined}
      />
    </Surface>
  );
};

export default ExamDevelopQuestionEditor;
