import cloudStorage from '../utils/cloudStorage';

const processSlide = async (slide) => {
  const filename = await cloudStorage.upload(slide.media, slide.slideType);
  //   const uri = await cloudStorage.downloadUrl(filename);
  return {
    position: slide.position,
    active: true,
    required: true,
    multimediaUri: filename,
    title: slide.title,
    multimedia_type: slide.slideType,
  };
};

export default processSlide;
