import React, { useContext, useState } from 'react';
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
import IExamQuestion from '../../interfaces/IExamQuestion';
import examService from '../../services/examService';
import { AuthContext } from '../../context/AuthContext';

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
  route: {params:{saveExam: (exam: IExam) => void}};
}

const ExamEditScreen = ({ navigation, route } : Props) => {
  const emptyExam: IExam = {
    title: '',
    description: '',
    minimumQualification: 0,
    questions: [],
    id: 0,
    creationDate: Date().toLocaleString(),
  };

  const auth = useContext(AuthContext);

  const [exam, _setExam] = useState<IExam>(emptyExam);

  const [questionIdCounter, _setQuestionIdCounter] = useState(0);
  const [minimumQualification, _setMinimumQualification] = useState(0);
  const setMinimumQualification = (n) => {
    _setMinimumQualification(n);
  };
  const [description, _setDescription] = useState('');
  const setDescription = (description) => {
    _setDescription(description);
  };

  const [title, _setTitle] = useState('');
  const setTitle = (title) => {
    _setTitle(title);
  };

  const increaseQuestionIdCounter = () => {
    _setQuestionIdCounter(questionIdCounter + 1);
    return questionIdCounter + 1;
  };

  // @rodri, no sé si es la forma correcta de inicializar un array en el state.
  const [questionComponents, _setElements] = useState(new Array(0));
  const setElements = (elms) => {
    _setElements(elms);
  };

  const component1 = () => <Text>+ Multiple Choice</Text>;
  const component2 = () => <Text>+ Develop Question</Text>;
  const buttons = [{ element: component1 }, { element: component2 }];

  const submit = () => {
    const newExam = {
      ...exam,
      minimumQualification,
      description,
      title,
    };
    console.log(newExam);
    _setExam(newExam);

    // Callback to be handled by course creation.
    route.params.saveExam(newExam);
    navigation.navigate("Course creation");
  };

  const cancelAll = () => {
    setElements(new Array(0));
    _setQuestionIdCounter(0);
  };

  // Upserts the question in exam list.
  const updateQuestions = (questions: Array<IExamQuestion>,
    questionToUpdate: IExamQuestion, sequenceIdQuestionToUpdate: number) => {
    // first transform question list into a dictionary indexed by question sequence Id
    const dictQuestions = Object.assign({}, ...questions.map((x) => {
      if (x.sequenceNumber === sequenceIdQuestionToUpdate) {
        return { [x.sequenceNumber]: questionToUpdate };
      }
      return { [x.sequenceNumber]: x };
    }));

    // If sequenceId is not in the dict, it is added
    if (dictQuestions[sequenceIdQuestionToUpdate] === undefined) {
      dictQuestions[sequenceIdQuestionToUpdate] = questionToUpdate;
    }

    // Transform back dictionary into question list
    const questionsUpdated = Object.entries(dictQuestions).map(([, value]) => (value));

    return questionsUpdated;
  };

  const saveQuestion = (examDevelopQuestion, score, sequenceId) => {
    const newExamQuestion : IExamQuestion = {
      sequenceNumber: sequenceId,
      developQuestion: examDevelopQuestion,
      type: 'develop',
      score,
    };

    const newExam = {
      ...exam,
      questions: updateQuestions(exam.questions, newExamQuestion, sequenceId),
    };

    _setExam(newExam);
  };

  const saveExamMultipleChoice = (examMultipleChoiceToAdd, score, sequenceId) => {
    const newExamQuestion : IExamQuestion = {
      sequenceNumber: sequenceId,
      multipleChoiceQuestion: examMultipleChoiceToAdd,
      type: 'multiple',
      score,
    };

    const newExam = {
      ...exam,
      questions: updateQuestions(exam.questions, newExamQuestion, sequenceId),
    };

    _setExam(newExam);
  };

  const getNewDevelpQuestion = () => (
    <ExamDevelopQuestionEditor
      saveQuestion={saveQuestion}
      questionId={increaseQuestionIdCounter()}
    />
  );
  const getNewMultipleChoice = () => (
    <ExamMultipleChoiceEditor
      saveExamMultipleChoice={saveExamMultipleChoice}
      questionId={increaseQuestionIdCounter()}
    />
  );

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
                  onChangeText={setTitle}
                />
                <TextInput
                  mode="outlined"
                  label="Add a description"
                  onChangeText={setDescription}
                />
                <TextInput
                  mode="outlined"
                  label="Min qualification"
                  keyboardType="numeric"
                  onChangeText={setMinimumQualification}
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
