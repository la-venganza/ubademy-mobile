import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  Surface, TextInput, Button, Text, RadioButton,
} from 'react-native-paper';
import ColorPalette from '../../styles/colors';
import IExamMultipleChoice from '../../interfaces/IExamMultipleChoice';

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
    setAnswer: (answerId: string) => void;
}

const ExamMultipleChoice = ({ examMultipleChoice, setAnswer }: Props) => {
  const [checked, _setChecked] = useState('');
  const setChecked = (choiceOptionId: string) => {
    _setChecked(choiceOptionId);
    setAnswer(choiceOptionId);
  };

  const renderChoice = (choice) => (
    <Surface
      key={choice.id}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <>
          <RadioButton.Item
            label={choice.text}
            position="leading"
            value={choice.multipleChoiceQuestionId}
            status={checked === choice.multipleChoiceQuestionId ? 'checked' : 'unchecked'}
            onPress={() => setChecked(choice.multipleChoiceQuestionId)}
          />
        </>
      </View>
    </Surface>
  );

  return (
    <Surface style={styles.surface}>
      <Text>{examMultipleChoice.multipleChoiceQuestion.text}</Text>
      {examMultipleChoice.multipleChoiceQuestion.choices.map((choice) => renderChoice(choice))}
    </Surface>
  );
};

export default ExamMultipleChoice;
