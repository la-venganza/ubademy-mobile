interface IExamChoiceOption {
    id?: number;
    text: string;
    multipleChoiceQuestionId: number;
    questionId: number;
    isCorrect: boolean;
}

export default IExamChoiceOption;
