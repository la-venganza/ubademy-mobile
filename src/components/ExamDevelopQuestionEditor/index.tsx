import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Surface, TextInput,
} from 'react-native-paper';
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
    saveQuestion: (question: string) => void;
}

const ExamDevelopQuestionEditor = ({ saveQuestion }: Props) => {
  const [question, _setQuestion] = useState('');

  const setQuestion = (questionText: string) => {
    _setQuestion(questionText);
    saveQuestion(questionText);
  };

  return (
    <Surface style={styles.surface}>
      <TextInput
        multiline
        mode="outlined"
        numberOfLines={2}
        value={question}
        onChangeText={(text) => { setQuestion(text); }}
        onPressIn={undefined}
        onPressOut={undefined}
      />
    </Surface>
  );
};

export default ExamDevelopQuestionEditor;
