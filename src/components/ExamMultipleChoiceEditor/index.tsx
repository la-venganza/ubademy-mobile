import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  Surface, TextInput, Button, Text, RadioButton, IconButton,
} from 'react-native-paper';
import ColorPalette from '../../styles/colors';
import { IExamMultipleChoice, IExamChoiceOption } from '../../interfaces/IExamMultipleChoice';

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    marginTop: 20,
  },
  TextStyle: {
    color: ColorPalette.white,
    fontWeight: 'bold',
  },
});

interface Props {
    saveExamMultipleChoice: (
      choice: IExamMultipleChoice,
      score: number,
      sequenceId: number) => void;
    questionId: number;
}

const ExamMultipleChoiceEditor = ({ saveExamMultipleChoice, questionId }: Props) => {
  const emptyChoice: IExamMultipleChoice = {
    text: '',
    amountOfOptions: 0,
    choices: [],
    id: 0,
    questionId,
  };

  const [multipleChoice, _setMultipleChoice] = useState(emptyChoice);
  const [questionText, _setQuestionText] = useState('');

  const [score, _setScore] = useState('');

  const setScore = (score) => {
    _setScore(score);
  };

  const setMultipleChoice = (choice: IExamMultipleChoice) => {
    _setMultipleChoice(choice);
  };

  const setQuestionText = (questionTextUpdate: string) => {
    setMultipleChoice({
      ...multipleChoice,
      text: questionTextUpdate,
    });
    _setQuestionText(questionTextUpdate);
  };

  const [checked, _setChecked] = useState('');
  const setChecked = (choiceOptionId: string) => {
    const choicesUpdated = multipleChoice.choices.map((choiceV) => {
      if (choiceV.multipleChoiceQuestionId === choiceOptionId) {
        return {
          ...choiceV,
          isCorrect: true,
        };
      }
      return choiceV;
    });

    const updatedChoice = {
      ...multipleChoice,
      choices: choicesUpdated,
      amountOfOptions: multipleChoice.choices.length,
    };

    saveExamMultipleChoice(updatedChoice, Number(score), questionId);

    _setChecked(choiceOptionId);
  };

  const [choiceEdit, _setChoiceEdit] = useState('');
  const setChoiceEdit = (choiceOption: string) => {
    _setChoiceEdit(choiceOption);
  };

  const renderAddChoice = () => (
    <TextInput
      mode="outlined"
      value={choiceEdit}
      onChangeText={setChoiceEdit}
      label="Add an option and press +..."
      onPressIn={undefined}
      onPressOut={undefined}
    />
  );

  const addChoiceOption = () => {
    const choiceToAdd: IExamChoiceOption = {
      text: choiceEdit,
      id: 0,
      multipleChoiceQuestionId: multipleChoice.choices.length.toString(),
      isCorrect: false,
    };

    const updatedChoice = {
      ...multipleChoice,
      choices: [...multipleChoice.choices, choiceToAdd],
      amountOfOptions: multipleChoice.choices.length,
    };

    setMultipleChoice(updatedChoice);
    // Todo add score setting!

    saveExamMultipleChoice(updatedChoice, Number(score), questionId);
    setChoiceEdit('');
  };

  const clear = () => {
    setMultipleChoice({
      ...multipleChoice,
      choices: [],
    });
  };

  const renderChoice = (choice: IExamChoiceOption) => (
    <Surface
      key={choice.multipleChoiceQuestionId}
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
      <TextInput
        mode="outlined"
        value={questionText}
        onChangeText={setQuestionText}
        label="Question text"
        onPressIn={undefined}
        onPressOut={undefined}
      />
      {multipleChoice.choices.map((choice) => renderChoice(choice))}
      {renderAddChoice()}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <IconButton
          icon="plus-box"
          size={20}
          onPress={addChoiceOption}
        />
        <IconButton
          icon="minus-box"
          size={20}
          onPress={clear}
        />
      </View>
      <TextInput
        mode="outlined"
        value={score}
        label="Score"
        keyboardType="numeric"
        onChangeText={setScore}
        onPressIn={undefined}
        onPressOut={undefined}
      />
    </Surface>
  );
};

export default ExamMultipleChoiceEditor;
