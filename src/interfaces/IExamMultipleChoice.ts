interface IExamChoiceOption {
    id: number;
    text: string;
    multipleChoiceQuestionId: string;
}

interface IExamMultipleChoice {
    id: number;
    text: string;
    amountOfOptions: number;
    choices: Array<IExamChoiceOption>;
    questionId: number;
    isCorrect?: boolean;
}

export { IExamMultipleChoice, IExamChoiceOption };
