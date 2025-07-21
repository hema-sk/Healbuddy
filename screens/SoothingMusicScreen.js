import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const SoothingMusicScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Soothing Music 🎵</Text>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: 'https://youtu.be/3ttYWBPCXdI?si=CGDb9DOmxjGkyn5o' }} // Sleep music
          allowsFullscreenVideo
        />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: 'https://youtu.be/l-2hOKIrIyI?si=4evvSfboPCdhF9Dg' }} // Relaxing piano
          allowsFullscreenVideo
        />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: 'https://youtu.be/yM9T2b7_9oc?si=zQoAn9-zWl-qpMri' }} // Meditation music
          allowsFullscreenVideo
        />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: 'https://youtu.be/3wlO4lpCHl8?si=ys8T2S8PjOlWksWu' }} // Meditation music
          allowsFullscreenVideo
        />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: 'https://youtu.be/ZXEC0IrOWGk?si=eupS8YBL0twxNlEu' }} // Meditation music
          allowsFullscreenVideo
        />
      </View>

      <Text style={styles.note}>Tap any video to play and enjoy some peace 💆‍♀️✨</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    width: screenWidth * 0.9,
    height: (screenWidth * 0.9) * (9 / 16), // 16:9 aspect ratio
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  note: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SoothingMusicScreen;
