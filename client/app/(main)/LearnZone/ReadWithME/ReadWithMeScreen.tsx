import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import Eclipse from "@/assets/Ellipse.png";
import * as FileSystem from "expo-file-system";
import { theme } from "@/src/theme"; 

export default function ReadWithMeScreen() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const NUM_BARS = 15;
  const barHeights = useRef(Array.from({ length: NUM_BARS }, () => new Animated.Value(0))).current;
  const waveInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      startSimulatedWave();
    } else {
      stopSimulatedWave();
    }
    return () => stopSimulatedWave();
  }, [isRecording]);

  const startSimulatedWave = () => {
    stopSimulatedWave();
    waveInterval.current = setInterval(() => {
      barHeights.forEach((bar) => {
        const randomHeight = Math.random();
        Animated.timing(bar, {
          toValue: randomHeight,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }, 300);
  };

  const stopSimulatedWave = () => {
    if (waveInterval.current) {
      clearInterval(waveInterval.current);
      waveInterval.current = null;
    }
    barHeights.forEach((bar) => bar.setValue(0));
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        console.log("Microphone permission not granted");
        return;
      }

      if (recording) {
        await stopRecording();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync({
        android: {
          extension: ".wav",
          outputFormat: Audio.AndroidOutputFormat.WAVE,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 256000,
        },
        ios: {
          extension: ".wav",
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
          audioQuality: Audio.IOSAudioQuality.MAX,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 256000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/wav",
          bitsPerSecond: 256000,
        },
      });

      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri);
        setIsRecording(false);
        setRecording(null);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

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
      console.error("Failed to play recording", err);
    }
  };

  const stopPlayback = async () => {
    try {
      await sound?.stopAsync();
      setIsPlaying(false);
    } catch (err) {
      console.error("Failed to stop playback", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ReadWithME</Text>
      </View>

      {/* Text Prompt */}
      <View style={styles.textContainer}>
        <Text style={styles.textPrompt}>Try to read</Text>
      </View>

      {/* Animated Waveform */}
      <View style={styles.waveContainer}>
        {barHeights.map((barValue, idx) => {
          const height = barValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["10%", "100%"],
          });
          return (
            <View style={styles.barWrapper} key={idx}>
              <Animated.View style={[styles.bar, { height }]} />
            </View>
          );
        })}
      </View>

      {/* Mic Button inside Image Ring */}
      <View style={styles.micContainer}>
        <Image source={Eclipse} style={styles.ringImage} />
        <TouchableOpacity
          style={styles.micButton}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Ionicons name="mic" size={90} color={theme.colors.primary.dark2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: theme.fonts.sizes.medium,
    color: "white",
    marginLeft: 10,
  },
  textContainer: {
    backgroundColor: theme.colors.secondary.light2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textPrompt: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.blacks.medium,
    fontFamily: theme.fonts.regular,
  },
  waveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "80%",
    height: 80,
    marginBottom: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  micContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  ringImage: {
    width: 300, // Adjust size if necessary
    height: 300, // Adjust size if necessary
    position: "absolute",
  },
  micButton: {
    width: 120,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // No background
  },
});
