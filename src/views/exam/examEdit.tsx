import React, { useState } from 'react';
import {
  View, SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import {
  Button, Card, Text, TextInput,
} from 'react-native-paper';
import { ButtonGroup } from 'react-native-elements';
import IExam from '../../interfaces/IExam';
import ExamMultipleChoiceEditor from '../../components/ExamMultipleChoiceEditor';
import ExamDevelopQuestionEditor from '../../components/ExamDevelopQuestionEditor';

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
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6B7280',
  },
  surface: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
});

interface Props {
  navigation: object;
}

const ExamEditScreen = ({ navigation } : Props) => {
  const [exam, setExam] = useState<IExam>({});

  // @rodri, no sé si es la forma correcta de inicializar un array en el state.
  const [questionComponents, _setElements] = useState(new Array(0));
  const setElements = (elms) => {
    _setElements(elms);
  };

  const component1 = () => <Text>+ Multiple Choice</Text>;
  const component2 = () => <Text>+ Develop Question</Text>;
  const buttons = [{ element: component1 }, { element: component2 }];

  const submit = () => {
    // TODO should submit the exam completed by te student to the back.
  };

  const cancelAll = () => {
    setElements(new Array(0));
  };

  const getNewDevelpQuestion = () => (<ExamDevelopQuestionEditor saveQuestion={() => ''} />);
  const getNewMultipleChoice = () => (<ExamMultipleChoiceEditor saveExamMultipleChoice={() => ''} />);

  const addQuestion = (index: number) => {
    if (index === 0) {
      const elms = [...questionComponents, getNewMultipleChoice()];
      setElements(elms);
    } else if (index === 1) {
      const elms = [...questionComponents, getNewDevelpQuestion()];
      setElements(elms);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>

          <View>
            <View style={styles.wrapper}>
              <View style={styles.surface}>
                <TextInput
                  mode="outlined"
                  label="Add a title"
                />
              </View>
            </View>

            <View>
              <ButtonGroup
                onPress={addQuestion}
                buttons={buttons}
                containerStyle={{ height: 100 }}
              />
            </View>

            <View>
              {questionComponents.map((question) => question)}
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <Button onPress={cancelAll}>Reset</Button>
            <Button mode="contained" labelStyle={{ color: 'white' }} onPress={submit}>Submit</Button>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExamEditScreen;
