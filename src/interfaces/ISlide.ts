import ESlideType from '../enums/slideTypes.ts';

interface ISlide {
    id?: number;
    media?: any;
    title?: string;
    slideType?: ESlideType;
    position?: number;
}

export default ISlide;
