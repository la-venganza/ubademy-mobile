import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  Surface, TextInput, Button, Text, RadioButton,
} from 'react-native-paper';
import ColorPalette from '../../styles/colors';
import IExamDevelopQuestion from '../../interfaces/IExamDevelopQuestion';

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
    examDevelopQuestion: IExamDevelopQuestion;
    returnAnwser: (answerSet: string) => void;
    readOnly: boolean;
}

const ExamDevelopQuestion = ({ examDevelopQuestion, returnAnwser, readOnly }: Props) => {
  const [answer, _setAnswer] = useState('');

  const setAnswer = (answerSet: string) => {
    _setAnswer(answerSet);
    const answerJson : IExamAnswer = {
      questionId: examDevelopQuestion.questionId,
      inputText: answerSet,
    };
    returnAnwser(answerJson);
  };

  return (
    <Surface style={styles.surface}>
      <Text
        onPressIn={undefined}
        onPressOut={undefined}
        android_hyphenationFrequency={undefined}
      >
        {examDevelopQuestion.text}

      </Text>
      <TextInput
        multiline
        mode="outlined"
        numberOfLines={4}
        value={answer}
        onChangeText={(answ) => { setAnswer(answ); }}
        onPressIn={undefined}
        onPressOut={undefined}
        disabled={readOnly}
      />
    </Surface>
  );
};

export default ExamDevelopQuestion;
