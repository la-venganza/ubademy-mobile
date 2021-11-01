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

const VideoPlayer = ({ src }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default VideoPlayer;
