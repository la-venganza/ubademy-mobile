import ISlide from '../interfaces/ISlide';
import ICourse from '../interfaces/ICourse';
import { instance as HTTPClient, configureAxiosHeaders } from '../utils/httpClient';
import processSlide from '../utils/processSlide';

const formatCourse = async (courseTitle:string,
  courseDescription:string, slides:Array<ISlide>, userId:string, plan:string, category:string) => {
  const course:ICourse = {
    user_id: userId,
    title: courseTitle,
    description: courseDescription,
    stages: [],
    plan,
    type: category,
  };
  course.stages = await Promise.all(slides.map(async (element:ISlide) => processSlide(element)));
  return course;
};

const setCookie = async (token) => {
  configureAxiosHeaders(token);
};

const createCourse = async (courseTitle:string,
  courseDescription:string, slides:Array<ISlide>, userId:string, plan:string, category:string) => {
  try {
    const course = await formatCourse(courseTitle,
      courseDescription, slides, userId, plan, category);
    const response = await HTTPClient.post('/course', course);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateCourse = async (id:number, courseTitle:string,
  courseDescription:string, slides:Array<ISlide>, userId:string, plan:string, category:string) => {
  try {
    const course = await formatCourse(courseTitle,
      courseDescription, slides, userId, plan, category);
    const response = await HTTPClient.put(`/course/${id}`, course);
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
    console.log('Error at /course/id: ', error);
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

const getCourses = async (searchTerm:string = '', plan:string = '') => {
  try {
    let path = '/course?';
    path += searchTerm ? `category=${searchTerm}&` : '';
    path += plan ? `plan=${plan}` : '';
    const response = await HTTPClient.get(path);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const enroll = async (id, userId) => {
  try {
    const response = await HTTPClient.post(`course/${id}/registration`, { user_id: userId });
    return response.data;
  } catch (error) {
    console.log('Error while enrolling: ', error);
    return null;
  }
};

export default {
  createCourse,
  updateCourse,
  getCourse,
  setSeen,
  getCourses,
  setCookie,
  enroll,
};
