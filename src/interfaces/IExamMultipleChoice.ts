import IExamChoiceOption from './IExamChoiceOption';

interface IExamChoice {
    id?: number;
    text: string;
    amountOfOptions: number;
    choices: Array<IExamChoiceOption>;
    questionId: number;
}

export default IExamChoice;
