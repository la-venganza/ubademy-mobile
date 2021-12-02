import IExamQuestion from './IExamQuestion'

interface IExam {
  title: string,
  description: string,
  minimumQualification: 0,
  questions: Array<IExamQuestion>
  id: number,
  creationDate: string,
}

export default IExam;
