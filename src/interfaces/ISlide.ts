import ESlideType from '../enums/slideTypes.ts';

interface ISlide {
    id?: number;
    media?: any;
    title?: string;
    slideType?: ESlideType;
}

export default ISlide;
