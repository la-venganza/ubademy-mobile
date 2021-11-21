interface IExamDevelopSection {
    id:number,
    questionId:number,
    text:string,
}

interface IExamDevelopQuestion {
    id?: number,
    examId: number,
    score: number,
    sequenceNumber: number,
    type: string,
    developQuestion: IExamDevelopSection;
    questionId: number;
}

export { IExamDevelopQuestion, IExamDevelopSection };
