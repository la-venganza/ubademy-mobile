import cloudStorage from '../utils/cloudStorage';

const processSlide = async (slide) => {
  const filename = await cloudStorage.upload(slide.media, slide.slideType);
  return {
    position: slide.position,
    active: true,
    required: true,
    multimedia_id: filename,
    title: slide.title,
    multimedia_type: slide.slideType,
    id: slide.id,
  };
};

export default processSlide;
