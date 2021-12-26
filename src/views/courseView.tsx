import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider, Surface, Text, Title,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { createDownloadResumable } from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native';
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
import examService from '../services/examService';
import IExam from '../interfaces/IExam';
import LeaveCourseButton from '../components/LeaveCourseButton';

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

  const [loadingExam, setLoadingExam] = useState(false);
  const [isCurrentExamCompleted, setIsCurrentExamCompleted] = useState(false);
  const [currentExamLastTakenId, setCurrentExamLastTakenId] = useState(0);

  const scrollRef = useRef();
  const loadingCtx = useContext(LoadingContext);

  const isFocused = useIsFocused();

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
    setLoadingExam(true);
    navigation.navigate('CourseExamToComplete', {
      courseId: course.id,
      lessonId: currentStage.id,
      examId: currentStage.exam?.id,
      userId: auth.userId,
      readOnly: false,
    });
  };

  const handleGoToExamReadOnlyView = () => {
    navigation.navigate('CourseExamToCorrect', {
      courseId: course.id,
      lessonId: currentStage.id,
      examId: currentStage.exam?.id,
      userId: auth.userId,
      takenId: currentExamLastTakenId,
      readOnly: true,

    });
  };

  const renderCompleteExam = (exam : IExam) => (
    <Button onPress={handleGoToExam}>
      Complete Exam
    </Button>
  );

  const renderViewExam = (exam : IExam) => (
    <Button onPress={handleGoToExamReadOnlyView}>
      Exam submitted, view exam
    </Button>
  );

  useEffect(() => {
    const fetchCourse = async () => {
      if (!auth.enroll) {
        navigation.navigate("Home");
      } else if (!auth.auth.courses.some((course) => course.course.id === id)
      || auth.userId === course.creatorId) {
        navigation.navigate('Course Enroll', { id });
      }
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

    setLoadingExam(true);
    if (currentStage.exam) {
      examService
        .getExamsCompleted(id, currentStage.id, auth.userId, currentStage.exam.id)
        .then((result) => {
          setCurrentExamLastTakenId(result[0]);
          setIsCurrentExamCompleted(result.length !== 0);
          setLoadingExam(false);
        });
    }
  }, [isFocused, auth.auth.courses]);

  const handleCourseSelection = async (stageId:number) => {
    const stage = stages.find((stage, index) => stage.id === stageId);
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

    setLoadingExam(true);
    examService
      .getExamsCompleted(id, stageId, auth.userId, stage.exam.id)
      .then((result) => {
        if (result && result.length > 0) {
          // Por ahora solo permito y muestro un intento de examen.
          setCurrentExamLastTakenId(result[0]);
        }
        setIsCurrentExamCompleted(result.length !== 0);
        setLoadingExam(false);
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
          {(currentStage.exam
          && !loadingExam
          && !isCurrentExamCompleted)
          && renderCompleteExam(currentStage.exam)}
          {
            currentStage.exam
            && isCurrentExamCompleted
            && renderViewExam(currentStage.exam)
          }
        </Surface>
        <View style={styles.courseInfoWrapper}>
          <Title style={styles.title}>{course.title}</Title>
          <Text>{course.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <Surface>
          <SlideList
            slides={stages}
            handleSelect={handleCourseSelection}
            activeSlide={currentStage}
          />
        </Surface>
        <LeaveCourseButton courseId={id} />
        {startDownload && renderDownload()}
      </ScrollView>
    </View>
  );
};

export default CourseView;
