import ESlideType from '../enums/slideTypes.ts';
import IExam from './IExam';

interface ISlide {
    id?: number;
    media?: any;
    title?: string;
    slideType?: ESlideType;
    position?: number;
    exam?: IExam;
}

export default ISlide;
