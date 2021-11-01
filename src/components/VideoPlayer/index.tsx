import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  video: {
    width: '100%',
    height: 'auto',
    aspectRatio: 2,
  },
  controls: {
    backgroundColor: 'black',
    marginTop: 15,
  },
});

const VideoPlayer = ({
  src, seen, handleVideoIsSeen, handleVideoEnd,
}) => {
  const video = React.useRef(null);

  const handleStatusUpdate = (status) => {
    if ((status.playableDurationMillis - status.positionMillis) < 500) {
      handleVideoEnd();
    }
    if (!seen && status.isPlaying && (status.playableDurationMillis - status.positionMillis) < 5000) {
      handleVideoIsSeen();
    }
  };
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{
          uri: src,
        }}
        style={styles.video}
        useNativeControls
        resizeMode="cover"
        onPlaybackStatusUpdate={handleStatusUpdate}
      />
    </View>
  );
};

export default VideoPlayer;
