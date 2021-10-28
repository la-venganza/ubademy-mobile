import ISlide from '../interfaces/ISlide';
import ICourse from '../interfaces/ICourse';
import HTTPClient from '../utils/httpClient';

const createCourse = async (courseTitle:string, courseDescription:string, slides:Array<ISlide>) => {
  const course:ICourse = {
    title: courseTitle,
    description: courseDescription,
    stages: [],
  };
  course.stages = slides.map((element:ISlide) => ({
    position: element.position,
    active: true,
    required: true,
    multimedia_id: element.media.uri,
    title: element.title,
    multimedia_type: element.slideType,
  }));

  try {
    const response = await HTTPClient.post('/course', course);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateCourse = () => {

};

export default {
  createCourse,
  updateCourse,
};
