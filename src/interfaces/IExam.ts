import IExamMultipleChoice from './IExamMultipleChoice';
import IExamDevelopQuestion from './IExamDevelopQuestion'

interface IExam {
  title: string,
  description: string,
  minimumQualification: 0,
  questions: Array<IExamDevelopQuestion | IExamMultipleChoice>
  id: number,
  creationDate: string,
}

export default IExam;
