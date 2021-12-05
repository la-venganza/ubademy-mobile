import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider, Surface, Text, Title,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ICourse from '../interfaces/ICourse';
import CourseService from '../services/courseService';
import ISlide from '../interfaces/ISlide';
import VideoPlayer from '../components/VideoPlayer';
import SlideList from '../components/SlideList';
import FileDownloadWebview from '../components/FileDownloadWebview';
import PDFPlaceholder from '../assets/images/pdf-placeholder.png';
import courseService from '../services/courseService';
import cloudStorage from '../utils/cloudStorage';
import lessonMapper from '../utils/lessonMapper';
import { LoadingContext } from '../context/LoadingContext';
import { AuthContext } from '../context/AuthContext';

interface Props {
    route: {params:{id: number}};
    navigation: object;
}
const dataMock = {
  title: 'Sample title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor nulla ac sem convallis, sit amet lacinia dolor feugiat. Phasellus vitae risus sagittis, cursus arcu vulputate, faucibus neque. Maecenas congue, purus non luctus eleifend, ex neque interdum purus, nec lobortis quam tellus vitae augue. Nullam pharetra facilisis magna, non varius diam faucibus at. Mauris pellentesque aliquam nisl, eget tincidunt eros dignissim at',
  stages: [
    {
      position: 1,
      id: 3,
      active: true,
      required: true,
      multimediaUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      title: 'Course introduction',
      multimedia_type: 'video',
      seen: true,
    },
    {
      position: 2,
      id: 4,
      active: true,
      required: true,
      multimediaUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      title: 'Chapter 1: Why is this so hard?',
      multimedia_type: 'video',
      seen: false,
    },
    {
      position: 3,
      id: 9,
      active: true,
      required: true,
      multimediaUri: '1636513956224edd35c84-b37b-4157-80f5-afb2efead5c5.jpg',
      title: 'Chapter 2: An image lalalalalalalalaala allala lala lal.',
      multimedia_type: 'image',
      seen: false,
    },
    {
      position: 4,
      id: 19,
      active: true,
      required: true,
      multimediaUri: 'https://www.casarosada.gob.ar/images/stories/constitucion-nacional-argentina.pdf',
      title: 'Chapter 3: Here we download a PDF. It\'s amazing!',
      multimedia_type: 'PDF',
      seen: false,
    },
  ],
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  courseInfoWrapper: {
    margin: 16,
  },
  pdfSlide: {
    width: '100%',
    aspectRatio: 2,
    padding: 15,
  },
  pdfSlideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  pdfButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});

const CourseView = ({ route, navigation }:Props) => {
  const auth = useContext(AuthContext);
  const { id } = route.params;
  const [course, setCourse] = useState<ICourse>({});
  const [currentStage, setCurrentStage] = useState<ISlide>({});
  const currentStageRef = useRef(null);
  const [startDownload, setStartDownload] = useState(false);
  // const [activeTimeoutId, setActiveTimeoutId] = useState(0);
  const [stages, setStages] = useState([]);
  const scrollRef = useRef();
  const loadingCtx = useContext(LoadingContext);

  const renderDownload = () => (<FileDownloadWebview uri={currentStage.multimediaUri} />);

  const handleDownload = () => {
    if (!startDownload) {
      setStartDownload(true);
      setTimeout(() => setStartDownload(false), 300);
    }
  };

  const renderVideo = () => <VideoPlayer src={currentStage.url} handleVideoIsSeen={handleIsSeen} seen={currentStage.seen} handleVideoEnd={handleVideoEnd} />;

  const renderImage = () => (
    <Image source={{ uri: currentStage.url }} style={{ width: '100%', aspectRatio: 2 }} />
  );
  const renderPDF = () => (
    <View style={styles.pdfSlide}>
      <Text style={styles.pdfSlideTitle}>This lesson is a PDF. Click here to download it!</Text>
      <View style={styles.pdfButton}>
        <Image source={PDFPlaceholder} resizeMethod="resize" resizeMode="contain" style={{ width: 40, height: 60 }} />
        <Button onPress={handleDownload}>
          {currentStage.title}
        </Button>
      </View>
    </View>
  );

  const renderMedia = () => {
    switch (currentStage.multimedia_type) {
      case 'video':
        return renderVideo();
      case 'image':
        return renderImage();
      case 'PDF':
        return renderPDF();
      default:
        return null;
    }
  };

  const handleGoToExam = () => {
    navigation.navigate('CourseExamToComplete', {
      courseId: course.id,
      lessonId: currentStage.id,
      examId: currentStage.exam?.id,
      userId: auth.userId,
    });
  };

  const renderCompleteExam = () => (
    <Button onPress={handleGoToExam}>
      Complete Exam
    </Button>
  );

  useEffect(() => {
    const fetchCourse = async () => {
      loadingCtx.setLoading(true);
      const courseData = await CourseService.getCourse(id);
      if (courseData?.id) {
        setCourse(courseData);
        setStages(courseData.lessons.map((lesson) => lessonMapper(lesson)));
      } else {
        setCourse(dataMock);
        setStages(dataMock.stages);
        // HANDLE ERROR
      }
      loadingCtx.setLoading(false);
    };
    fetchCourse();
  }, []);

  const handleCourseSelection = async (id:number) => {
    const stage = stages.find((stage, index) => stage.id === id);
    let mediaUrl = '';
    try {
      loadingCtx.setLoading(true);
      mediaUrl = await cloudStorage.downloadUrl(stage.multimediaUri);
      loadingCtx.setLoading(false);
    } catch (error) {
      mediaUrl = stage.multimediaUri;
    }
    setCurrentStage({ ...stage, url: mediaUrl });
    currentStageRef.current = stage;
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    // Uncomment this section once seen is supported
    // if (activeTimeoutId) {
    //   clearTimeout(activeTimeoutId);
    // }
    // if (stage?.multimedia_type === 'image' || stage?.multimedia_type === 'PDF') {
    //   const timeoutId = setTimeout(handleIsSeen, 5000);
    //   setActiveTimeoutId(timeoutId);
    // }
  };

  const handleIsSeen = () => {
    courseService.setSeen(id, currentStageRef.current.id);
    const stageIndex = stages.findIndex((stage) => stage.id === currentStageRef.current.id);
    const aux = [...stages];
    aux[stageIndex].seen = true;
    setStages(aux);
  };

  const handleVideoEnd = () => {
    if (!currentStage.seen) {
      currentStage.seen = true;
    }
    const stageIndex = course.stages.findIndex((stage) => stage.id === currentStage.id);
    if (stageIndex < course.stages.length - 1) {
      setCurrentStage(course.stages[stageIndex + 1]);
      currentStageRef.current = course.stages[stageIndex + 1];
    }
  };

  return (
    <View>
      <ScrollView ref={scrollRef}>
        <Surface>
          {renderMedia()}
          {currentStage.exam && renderCompleteExam()}
        </Surface>
        <View style={styles.courseInfoWrapper}>
          <Title style={styles.title}>{course.title}</Title>
          <Text>{course.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <Surface>
          <SlideList slides={stages} handleSelect={handleCourseSelection} activeSlide={currentStage} />
        </Surface>
        {startDownload && renderDownload()}
      </ScrollView>
    </View>
  );
};

export default CourseView;
