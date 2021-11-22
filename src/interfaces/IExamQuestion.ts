import { IExamMultipleChoice } from './IExamMultipleChoice';
import { IExamDevelopQuestion } from './IExamDevelopQuestion';

interface IExamQuestion {
    id?: number;
    sequenceNumber: number;
    text: string;
    amountOfOptions: number;
    multipleChoiceQuestion?: IExamMultipleChoice;
    developQuestion?: IExamDevelopQuestion;
    questionId: number;
    type: string;
    score: number;
}

export default IExamQuestion;
