import { instance } from '../utils/httpClient';

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
            isCorrect: true,
            id: 0,
            multipleChoiceQuestionId: 0,
          },
          {
            text: '12',
            isCorrect: false,
            id: 1,
            multipleChoiceQuestionId: 1,
          },
          {
            text: 'Todas las anteriores son correctas',
            isCorrect: false,
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

export default {
  getExam,
};
