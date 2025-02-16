import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import theme from '@/src/theme';
import { QuestionResponseDTO } from '@/src/types/Detection/Question';

interface Props {
  question: QuestionResponseDTO;
  onSelect: (audioBase64: string) => void;
}

const AudioInputView = ({ question, onSelect }: Props) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Flags
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // We use 15 bars for the wave
  const NUM_BARS = 15;

  // Each bar has its own Animated.Value for height
  const barHeights = useRef<Animated.Value[]>(
    Array.from({ length: NUM_BARS }, () => new Animated.Value(0))
  ).current;

  // Interval ref for randomizing bar heights
  const waveInterval = useRef<NodeJS.Timeout | null>(null);

  // Start randomizing bars if recording or playing
  useEffect(() => {
    if (isRecording || isPlaying) {
      startSimulatedWave();
    } else {
      stopSimulatedWave();
    }
    // Cleanup on unmount
    return () => stopSimulatedWave();
  }, [isRecording, isPlaying]);

  const startSimulatedWave = () => {
    // Clear any existing interval
    stopSimulatedWave();

    waveInterval.current = setInterval(() => {
      barHeights.forEach((bar) => {
        const randomHeight = Math.random(); // 0 to 1
        Animated.timing(bar, {
          toValue: randomHeight,
          duration: 300,
          useNativeDriver: false, // we are animating height in style
        }).start();
      });
    }, 300);
  };

  const stopSimulatedWave = () => {
    if (waveInterval.current) {
      clearInterval(waveInterval.current);
      waveInterval.current = null;
    }
    // Reset bars to zero
    barHeights.forEach((bar) => {
      bar.setValue(0);
    });
  };

  // Recording logic
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        console.log('Microphone permission not granted');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
      });
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();
      setRecordingUri(uri || null);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  // Playback logic
  const playRecording = async () => {
    if (!recordingUri) return;
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (!status.isPlaying && status.positionMillis === status.durationMillis) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error('Failed to play recording', err);
    }
  };

  const stopPlayback = async () => {
    try {
      await sound?.stopAsync();
      setIsPlaying(false);
    } catch (err) {
      console.error('Failed to stop playback', err);
    }
  };

  // Convert audio to Base64 whenever we have a new recordingUri
  useEffect(() => {
    const encodeAudio = async () => {
      if (recordingUri) {
        try {
          const base64Audio = await FileSystem.readAsStringAsync(recordingUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          onSelect(base64Audio);
        } catch (err) {
          console.error('Failed to read audio file', err);
        }
      } else {
        onSelect('');
      }
    };
    encodeAudio();
  }, [recordingUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>{question.questionText}</Text>

      {/* Simulated Wave */}
      <View style={styles.waveContainer}>
        {barHeights.map((barValue, idx) => {
          // barValue is 0 to 1, scale to container height
          // we'll do container height of 100, so bar height is barValue * 100
          const height = barValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['10%', '100%'],
          });
          return (
            <View style={styles.barWrapper} key={idx}>
              <Animated.View style={[styles.bar, { height }]} />
            </View>
          );
        })}
      </View>

      <View style={styles.controlsRow}>
        {/* Start/Stop Recording */}
        {!isRecording ? (
          <TouchableOpacity style={styles.iconButton} onPress={startRecording}>
            <MaterialCommunityIcons name="microphone" size={36} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconButton} onPress={stopRecording}>
            <MaterialCommunityIcons name="stop" size={36} color="#ff4444" />
          </TouchableOpacity>
        )}

        {/* Play/Stop Playback */}
        {recordingUri && !isRecording && (
          !isPlaying ? (
            <TouchableOpacity style={styles.iconButton} onPress={playRecording}>
              <MaterialCommunityIcons name="play" size={36} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconButton} onPress={stopPlayback}>
              <MaterialCommunityIcons name="stop" size={36} color="#ff4444" />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default AudioInputView;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  waveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: 100,
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barWrapper: {
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: theme.colors.primary.dark2,
    borderRadius: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: 15,
    backgroundColor: theme.colors.primary.light3,
    padding: 10,
    borderRadius: 40,
  },
});
