interface IExamChoiceOption {
    id: number;
    text: string;
    multipleChoiceQuestionId: string;
    isCorrect?: boolean;
}

interface IExamMultipleChoice {
    id: number;
    text: string;
    amountOfOptions: number;
    choices: Array<IExamChoiceOption>;
    questionId: number;
}

export { IExamMultipleChoice, IExamChoiceOption };
