import ISlide from '../interfaces/ISlide';
import ICourse from '../interfaces/ICourse';
import HTTPClient from '../utils/httpClient';

const formatCourse = (courseTitle:string, courseDescription:string, slides:Array<ISlide>) => {
  const course:ICourse = {
    title: courseTitle,
    description: courseDescription,
    stages: [],
  };
  course.stages = slides.map((element:ISlide) => ({
    position: element.position,
    active: true,
    required: true,
    multimediaUri: element.media.uri,
    title: element.title,
    multimedia_type: element.slideType,
  }));
  return course;
};

const createCourse = async (courseTitle:string, courseDescription:string, slides:Array<ISlide>) => {
  try {
    const course = formatCourse(courseTitle, courseDescription, slides);
    const response = await HTTPClient.post('/course', course);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateCourse = async (id:number, courseTitle:string, courseDescription:string, slides:Array<ISlide>) => {
  try {
    const course = formatCourse(courseTitle, courseDescription, slides);
    const response = await HTTPClient.patch(`/course/${id}`, course);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCourse = async (id) => {
  try {
    const response = await HTTPClient.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setSeen = async (courseId, slideId) => {
  try {
    await HTTPClient.patch(`/course/seen/${courseId}/${slideId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getCourses = async () => {
  try {
    const response = await HTTPClient.get('/course');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  createCourse,
  updateCourse,
  getCourse,
  setSeen,
  getCourses,
};
