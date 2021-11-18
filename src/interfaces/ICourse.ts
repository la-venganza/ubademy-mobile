import ISlide from './ISlide';

interface ICourse {
    id?: number;
    title: string;
    description: string;
    stages: Array<ISlide>;
    user_id: string;
    plan: string;
    type: string;
}

export default ICourse;
