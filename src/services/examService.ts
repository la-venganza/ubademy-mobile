import { base64 } from '@firebase/util';
import IExam from '../interfaces/IExam';
import IExamDevelopQuestion from '../interfaces/IExamDevelopQuestion';
import { IExamChoiceOption, IExamMultipleChoice } from '../interfaces/IExamMultipleChoice';
import IExamQuestion from '../interfaces/IExamQuestion';
import { instance } from '../utils/httpClient';

const formatChoiceOption = (choiceOption: IExamChoiceOption) => ({
  text: choiceOption.text,
  multiple_choice_question_id: choiceOption.multipleChoiceQuestionId,
  is_correct: choiceOption.isCorrect,
});

const formatDevelopQuestion = (developQuestion: IExamDevelopQuestion) => ({
  text: developQuestion.text,
  id: developQuestion.id,
  question_id: developQuestion.questionId,
});

const formatMultipleChoice = (multipleChoice: IExamMultipleChoice | undefined) => ({
  id: multipleChoice.id,
  text: multipleChoice.text,
  amount_of_options: multipleChoice.amountOfOptions,
  choices: multipleChoice.choices.map((x) => formatChoiceOption(x)),
  question_id: multipleChoice.questionId,
});

const formatQuestion = (question: IExamQuestion) => {
  const base = {
    sequence_number: question.sequenceNumber,
    type: question.type,
    score: question.score,
  };

  if (question.type === 'multiple') {
    return {
      ...base,
      multiple_choice_question: formatMultipleChoice(question.multipleChoiceQuestion),
    };
  }
  return {
    ...base,
    develop_question: formatDevelopQuestion(question.developQuestion),
  };
};

const formatExam = (exam: IExam, courseId: number, lessonId: number, userId: number) => ({
  lesson_id: lessonId,
  course_id: courseId,
  user_id: userId,
  exam: {
    title: exam.title,
    description: exam.description,
    minimum_qualification: exam.minimumQualification,
    questions: exam.questions.map((x) => formatQuestion(x)),
  },
});

const mockedExam = () => ({
  title: 'Algebra VII',
  description: 'Matrices vectoriales y autovalores de poisson',
  minimumQualification: 0,
  questions: [
    {
      sequenceNumber: 0,
      type: 'multiple',
      score: 3,
      multipleChoiceQuestion: {
        text: 'Cuantos años tiene cauchi?',
        amountOfOptions: 0,
        choices: [
          {
            text: '234',
            id: 0,
            multipleChoiceQuestionId: 0,
          },
          {
            text: '12',
            id: 1,
            multipleChoiceQuestionId: 1,
          },
          {
            text: 'Todas las anteriores son correctas',
            id: 2,
            multipleChoiceQuestionId: 2,
          },
        ],
        id: 0,
        questionId: 0,
      },
      id: 0,
      examId: 0,
    },
    {
      sequenceNumber: 0,
      type: 'develop',
      score: 7,
      developQuestion: {
        text: 'Opine aquí',
        id: 3,
        questionId: 1,
      },
      id: 2,
      examId: 0,
    },
  ],
  id: 0,
  creationDate: '2021-11-21T01:39:19.287Z',
});

const getExam = async (courseId, lessonId) => {
  try {
    console.log(`Fetch exam ${courseId} from lesson ${lessonId}`);
    // TODO
    // const response = await instance.get(`/exam/${courseId}/{lessonId}`);
    return mockedExam();
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const createExam = async (exam: IExam, courseId, lessonId, userId) => {
  try {
    console.log(`Submitting exam to course ${courseId} to lesson ${lessonId}`);

    console.log(formatExam(exam, courseId, lessonId, userId));
    const response = await instance.post('/exam', formatExam(exam, courseId, lessonId, userId));

    return response.data;
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

export default {
  getExam, createExam,
};
