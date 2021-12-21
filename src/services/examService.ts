import { base64 } from '@firebase/util';
import IExam from '../interfaces/IExam';
import IExamAnswer from '../interfaces/IExamAnswer';
import IExamDevelopQuestion from '../interfaces/IExamDevelopQuestion';
import { IExamChoiceOption, IExamMultipleChoice } from '../interfaces/IExamMultipleChoice';
import IExamQuestion from '../interfaces/IExamQuestion';
import { instance } from '../utils/httpClient';

const formatChoiceOption = (choiceOption: IExamChoiceOption) => ({
  text: choiceOption.text,
  multiple_choice_question_id: choiceOption.multipleChoiceQuestionId,
  is_correct: choiceOption.isCorrect,
  id: choiceOption.id,
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

const formatInnerExam = (exam: IExam) => (exam ? {
  title: exam.title,
  description: exam.description,
  minimum_qualification: exam.minimumQualification,
  questions: exam.questions.map((x) => formatQuestion(x)),
} : null);

const formatExam = (exam: IExam, courseId: number, lessonId: number, userId: number) => ({
  lesson_id: lessonId,
  course_id: courseId,
  user_id: userId,
  exam: formatInnerExam(exam),
});

const deFormatChoiceOption = (choiceOption) => ({
  text: choiceOption.text,
  multipleChoiceQuestionId: choiceOption.multiple_choice_question_id,
  isCorrect: choiceOption.is_correct,
  id: choiceOption.id,
});

const deFormatDevelopQuestion = (developQuestion) => ({
  text: developQuestion.text,
  id: developQuestion.id,
  questionId: developQuestion.question_id,
});

const deFormatMultipleChoice = (multipleChoice) => ({
  id: multipleChoice.id,
  text: multipleChoice.text,
  amountOfOptions: multipleChoice.amount_of_options,
  choices: multipleChoice.choices.map((x) => deFormatChoiceOption(x)),
  questionId: multipleChoice.question_id,
});

const deFormatQuestion = (question) => {
  const base = {
    sequenceNumber: question.sequence_number,
    type: question.type,
    score: question.score,
  };

  if (question.type === 'multiple') {
    return {
      ...base,
      multipleChoiceQuestion: deFormatMultipleChoice(question.multiple_choice_question),
    };
  }
  return {
    ...base,
    developQuestion: deFormatDevelopQuestion(question.develop_question),
  };
};

const deFormatExam = (exam) => ({
  title: exam.title,
  description: exam.description,
  minimumQualification: exam.minimum_qualification,
  questions: exam.questions.map((x) => deFormatQuestion(x)),
});

const formatAnswer = (answer: IExamAnswer) => ({
  question_id: answer.questionId,
  input_answer: answer.inputText,
  choice_id: answer.choiceId,
});

const formatExamAnswers = (courseId: number, lessonId: number, userId: string,
  answers: Array<IExamAnswer>) => ({
  lesson_id: lessonId,
  course_id: courseId,
  user_id: userId,
  answers: answers.map((asw) => formatAnswer(asw)),
});

const getExam = async (courseId, lessonId, userId, examId) => {
  try {
    console.log(`Fetch exam ${courseId} from lesson ${lessonId}`);
    const response = await instance.get(`/exam/${examId}/course/${courseId}/lesson/${lessonId}/user/${userId}`);
    return deFormatExam(response.data);
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const getExamsCompleted = async (courseId, lessonId, userId, examId) => {
  try {
    console.log('check exam completion');
    const response = await instance.get(`/user/${userId}?properties=all`);

    const course = response.data.enroll_courses
      .filter((enroll_course) => enroll_course.course.id === courseId);

    if (course.length > 0) {
      const examTakenIds = course[0].exams.map((exam) => {
        let takenId = -1;
        if (exam.exam_id === examId && exam.lesson_id === lessonId) {
          takenId = exam.exam_taken_id;
        }
        return takenId;
      });

      return examTakenIds.filter((takenId) => takenId !== -1);
    }

    return [];
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log('Returning null');
    console.log(error);
    return null;
  }
};

const getExamsListToCorrect = async (userId) => {
  try {
    console.log(`Fetching all exams from user ${userId} to correct. `);
    const response = await instance.get(`/exam?user_id=${userId}`);
    return response.data.results;
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const getExamSolution = async (examId, courseId, lessonId, userId, takenId) => {
  const response = await instance
    .get(`/exam/${examId}/course/${courseId}/lesson/${lessonId}/solution/${takenId}?user_id=${userId}`);
  console.log(response.data);
  return response.data;
};

const createExam = async (exam: IExam, courseId, lessonId, userId) => {
  try {
    console.log(`Submitting exam to course ${courseId} to lesson ${lessonId}`);
    const response = await instance.post('/exam', formatExam(exam, courseId, lessonId, userId));

    return response.data;
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const submitExamAnswers = async (examId: number, courseId: number, lessonId: number, userId: string,
  answers: Array<IExamAnswer>) => {
  try {
    console.log(`Submitting exam answers to course ${courseId} to lesson ${lessonId}`);
    console.log(formatExamAnswers(courseId, lessonId, userId, answers));
    const response = await instance.post(`/exam/${examId}`, formatExamAnswers(courseId, lessonId, userId, answers));

    return response.data;
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const setExamGrade = async (examId, userId, takenId, enrollId, grade, courseId, lessonId) => {
  try {
    console.log(`Submitting exam grade to exam ${examId}`);
    const response = await instance.patch(`/exam/${examId}`, {
      user_id: userId,
      exam_to_grade_id: takenId,
      enroll_course_id: enrollId,
      course_id: courseId,
      lesson_id: lessonId,
      grade: Number(grade),
    });

    return response.data;
  } catch (error) {
    console.log('Could not get exam from backend.');
    console.log(error);
    console.log('Returning null');
    return null;
  }
};

export default {
  getExam,
  createExam,
  formatInnerExam,
  submitExamAnswers,
  getExamsListToCorrect,
  getExamsCompleted,
  getExamSolution,
  setExamGrade,
};
