import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  Surface, TextInput, Button, Text, RadioButton,
} from 'react-native-paper';
import ColorPalette from '../../styles/colors';
import { IExamMultipleChoice } from '../../interfaces/IExamMultipleChoice';
import IExamAnswer from '../../interfaces/IExamAnswer';

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
    examMultipleChoice: IExamMultipleChoice;
    setAnswer: (answer: IExamAnswer) => void;
    readOnly: boolean;
}

const ExamMultipleChoice = ({ examMultipleChoice, setAnswer, readOnly }: Props) => {
  const [checked, _setChecked] = useState('');
  useEffect(() => {
    if (readOnly) {
      const checkedId = examMultipleChoice.choices.find((x) => x.isCorrect);
      _setChecked(String(checkedId));
    }
  }, []);

  const setChecked = (choiceOptionId: string) => {
    const answerJson : IExamAnswer = {
      questionId: examMultipleChoice.questionId,
      choiceId: Number(choiceOptionId),
    };

    _setChecked(choiceOptionId);
    setAnswer(answerJson);
  };

  const renderChoice = (choice) => (
    <Surface
      key={choice.id}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <>
          <RadioButton.Item
            disabled={readOnly}
            label={choice.text}
            position="leading"
            value={choice.id}
            status={checked === choice.id ? 'checked' : 'unchecked'}
            onPress={() => setChecked(choice.id)}
          />
        </>
      </View>
    </Surface>
  );

  return (
    <Surface style={styles.surface}>
      <Text>{examMultipleChoice.text}</Text>
      {examMultipleChoice && examMultipleChoice.choices.map((choice) => renderChoice(choice))}
    </Surface>
  );
};

export default ExamMultipleChoice;
