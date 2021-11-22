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
    saveExamMultipleChoice: (choice: IExamMultipleChoice) => void;
}

const ExamMultipleChoiceEditor = ({ saveExamMultipleChoice }: Props) => {
  const emptyChoice: IExamMultipleChoice = {
    text: '',
    amountOfOptions: 0,
    choices: [],
    id: 0,
    questionId: 0,
  };

  const [multipleChoice, _setMultipleChoice] = useState(emptyChoice);
  const [questionText, _setQuestionText] = useState('');
  const setQuestionText = (questionText: string) => _setQuestionText(questionText);

  const [checked, _setChecked] = useState('');
  const setChecked = (choiceOptionId: string) => {
    _setChecked(choiceOptionId);
  };

  const [choiceEdit, _setChoiceEdit] = useState('');
  const setChoiceEdit = (choiceOption) => {
    _setChoiceEdit(choiceOption);
  };

  const setMultipleChoice = (choice: IExamMultipleChoice) => {
    _setMultipleChoice(choice);
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
    };
    setMultipleChoice({
      ...multipleChoice,
      choices: [...multipleChoice.choices, choiceToAdd],
    });
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
    </Surface>
  );
};

export default ExamMultipleChoiceEditor;
