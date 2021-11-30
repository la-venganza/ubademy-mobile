import { IExamMultipleChoice } from './IExamMultipleChoice';
import { IExamDevelopQuestion } from './IExamDevelopQuestion';

interface IExamQuestion {
    id?: number;
    questionId?: number;
    sequenceNumber: number;
    multipleChoiceQuestion?: IExamMultipleChoice;
    developQuestion?: IExamDevelopQuestion;
    type: string;
    score: number;
}

export default IExamQuestion;
