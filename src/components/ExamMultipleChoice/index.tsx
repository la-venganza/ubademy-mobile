import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  Surface, TextInput, Button, Text, RadioButton, Colors, Badge,
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
  badge: {
    alignSelf: 'center',
  },
});

interface Props {
    examMultipleChoice: IExamMultipleChoice;
    setAnswer: (answer: IExamAnswer) => void;
    readOnly: boolean;
    answerSet: number;
}

const ExamMultipleChoice = ({
  examMultipleChoice, setAnswer, readOnly, answerSet,
}: Props) => {
  const [checked, _setChecked] = useState(0);
  const [selected, _setSelected] = useState(0);
  useEffect(() => {
    if (readOnly) {
      console.log(examMultipleChoice);
      const correctChoice = examMultipleChoice.choices.find((x) => x.isCorrect);
      const checkedId = correctChoice ? correctChoice.id : -1;
      console.log(checkedId);
      _setChecked(checkedId);
      _setSelected(answerSet);
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
    <Surface>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <>
          <RadioButton.Item
            disabled={readOnly}
            label={choice.text}
            position="leading"
            value={choice.id}
            status={checked === choice.id ? 'checked' : 'unchecked'}
            onPress={() => setChecked(choice.id)}
          />
          <Badge
            visible={selected === choice.id}
            style={[styles.badge, { backgroundColor: Colors.blue500 }]}
          >
            Selected
          </Badge>

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
