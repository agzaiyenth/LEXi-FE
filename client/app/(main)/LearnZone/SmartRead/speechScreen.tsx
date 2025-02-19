import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/loading";
import { useFetchDocument } from "@/src/hooks/SmartRead/useFetchDocument";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { LearnZoneParamList } from './navigator';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Markdown from "react-native-markdown-display";

type NavigationProp = StackNavigationProp<LearnZoneParamList, 'SpeechScreen', 'SmartReadMain'>;
export default function SpeechScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { fileId } = route.params as { fileId: number };

  console.log("Route Params:", route.params);

  const { document, loading, error } = useFetchDocument(fileId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [waveAnim] = useState(() =>
    Array.from({ length: 30 }, () => new Animated.Value(1))
  );

  // Unload the sound when the component unmounts or the sound changes
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Animate the waveform when playing
  const animateWaves = () => {
    if (isPlaying) {
      Animated.loop(
        Animated.stagger(
          100,
          waveAnim.map((anim, index) =>
            Animated.sequence([
              Animated.timing(anim, {
                toValue:
                  index % 5 === 0
                    ? 1.2
                    : index % 5 === 1
                    ? 1
                    : index % 5 === 2
                    ? 0.8
                    : index % 5 === 3
                    ? 0.6
                    : 0.4,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
            ])
          )
        )
      ).start();
    } else {
      waveAnim.forEach((anim) => anim.setValue(1));
    }
  };

  useEffect(() => {
    animateWaves();
  }, [isPlaying]);

  // Function to handle play/pause toggle
  const handlePlayPause = async () => {
    try {
      // If no sound has been loaded yet, create and play one
      if (!sound) {
        if (document?.ttsAudioUrl) {
          const { sound: newSound } = await Audio.Sound.createAsync({
            uri: document.ttsAudioUrl,
          });
          setSound(newSound);
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              // When playback finishes, update state
              if (!status.isPlaying && status.positionMillis >= status.durationMillis) {
                setIsPlaying(false);
              }
            }
          });
          await newSound.playAsync();
          setIsPlaying(true);
        }
      } else {
        // If the sound exists, check its status and toggle play/pause
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
      }
    } catch (err) {
      console.error("Play/Pause error:", err);
    }
  };

  // Skip forward 5 seconds
  const handleForward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        let newPosition = status.positionMillis + 5000;
        if (newPosition > status.durationMillis) {
          newPosition = status.durationMillis;
        }
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  // Skip backward 5 seconds
  const handleBackward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        let newPosition = status.positionMillis - 5000;
        if (newPosition < 0) {
          newPosition = 0;
        }
        await sound.setPositionAsync(newPosition);
      }
    }
  };
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Smart Read</Text>
        <TouchableOpacity style={styles.backButton}onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
                </TouchableOpacity>
        

        <View style={styles.innercontainer}>
          <View style={styles.textContainer}>
            {loading ? (
              <LoadingScreen />
            ) : error ? (
              <ErrorScreen />
            ) : (
              <ScrollView>
                {document && (
                  <Markdown style={StyleSheet.create({ summaryText: styles.summaryText })}>
                    {document.summary}
                  </Markdown>
                )}
              </ScrollView>
            )}
          </View>

          <View style={styles.audioContainer}>
            <View style={styles.audioWaveformContainer}>
              {waveAnim.map((anim, index) => (
                <Animated.View
                  key={`wave-${index}`}
                  style={[styles.wave, { transform: [{ scaleY: anim }] }]}
                />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              {/* Backward Button */}
              <TouchableOpacity
                onPress={handleBackward}
                disabled={!sound}
                style={!sound ? styles.disabledButton : undefined}
              >
                <Ionicons
                  name="play-skip-back"
                  size={50}
                  color={sound ? theme.colors.primary.medium : "gray"}
                />
              </TouchableOpacity>

              {/* Play / Pause Button */}
              <TouchableOpacity onPress={handlePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause-circle" : "play-circle"}
                  size={50}
                  color={theme.colors.primary.medium}
                />
              </TouchableOpacity>

              {/* Forward Button */}
              <TouchableOpacity
                onPress={handleForward}
                disabled={!sound}
                style={!sound ? styles.disabledButton : undefined}
              >
                <Ionicons
                  name="play-skip-forward"
                  size={50}
                  color={sound ? theme.colors.primary.medium : "gray"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%", height: "100%" },
  container: { flex: 1, backgroundColor: "#9AC3BB", position: "relative" },
  leftarrow: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 60,
    color: theme.colors.background.offWhite,
    padding: 2,
  },
  text: {
    top: 35,
    fontSize: theme.fonts.sizes.large,
    lineHeight: 30,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },
  backButton:{
    marginLeft:20,
  },
  innercontainer: {
    top: 35,
    backgroundColor: "#FDF4DE",
    borderRadius: 25,
    height: "90%",
    padding: 20,
  },
  textContainer: {
    borderRadius: 25,
    backgroundColor: theme.colors.secondary.light,
    height: "73%",
    padding: 30,
  },
  summaryText: {
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blacks.medium,
    lineHeight: 30,
  },
  audioContainer: { marginTop: 20, alignItems: "center" },
  audioWaveformContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  wave: {
    width: 6,
    marginHorizontal: 2,
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 8,
    height: "50%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
});


// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import * as Speech from "expo-speech";
// import { theme } from "@/src/theme";
// import { useFetchDocument } from "@/src/hooks/SmartRead/useFetchDocument";

// export default function SpeechScreen() {
//   const { document, loading, error } = useFetchDocument(31);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [waveAnim] = useState(() => Array.from({ length: 30 }, () => new Animated.Value(1)));

//   const animateWaves = () => {
//     if (isSpeaking) {
//       Animated.loop(
//         Animated.stagger(100, waveAnim.map((anim, index) =>
//           Animated.sequence([
//             Animated.timing(anim, { toValue: index % 5 === 0 ? 1.2 : index % 5 === 1 ? 1 : index % 5 === 2 ? 0.8 : index % 5 === 3 ? 0.6 : 0.4, duration: 300, useNativeDriver: true }),
//             Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true })
//           ])
//         ))
//       ).start();
//     } else {
//       waveAnim.forEach(anim => anim.setValue(1));
//     }
//   };

//   useEffect(() => {
//     animateWaves();
//   }, [isSpeaking]);

//   const handleSpeech = () => {
//     if (isSpeaking) {
//       Speech.stop();
//       setIsSpeaking(false);
//     } else if (document?.summary) {
//       setIsSpeaking(true);
//       Speech.speak(document.summary, {
//         onDone: () => setIsSpeaking(false),
//         onStopped: () => setIsSpeaking(false),
//       });
//     }
//   };

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>
//         <Text style={styles.text}>Smart Read</Text>
//         <EvilIcons name="arrow-left" style={styles.leftarrow} />
        
//         <View style={styles.innercontainer}>
//           <View style={styles.textContainer}>
//             {loading ? (
//               <ActivityIndicator size="large" color={theme.colors.primary.medium} />
//             ) : error ? (
//               <Text style={styles.errorText}>{error}</Text>
//             ) : (
//               <ScrollView>
//                 <Text style={styles.summaryText}>{document?.summary}</Text>
//               </ScrollView>
//             )}
//           </View>
          
//           <View style={styles.audioContainer}>
//             <View style={styles.audioWaveformContainer}>
//               {waveAnim.map((anim, index) => (
//                 <Animated.View key={`wave-${index}`} style={[styles.wave, { transform: [{ scaleY: anim }] }]} />
//               ))}
//             </View>
            
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.listenButton} onPress={handleSpeech}>
//                 <Text style={styles.listenButtonText}>{isSpeaking ? "STOP" : "LISTEN"}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSpeech}>
//                 <Ionicons name={isSpeaking ? "stop-circle" : "play-circle"} size={50} color={theme.colors.primary.medium} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { width: "100%", height: "100%" },
//   container: { flex: 1, backgroundColor: "#9AC3BB", position: "relative" },
//   leftarrow: { position: "absolute", top: 20, left: 20, fontSize: 60, color: theme.colors.background.offWhite, padding: 2 },
//   text: { top: 35, fontSize: theme.fonts.sizes.small, lineHeight: 30, fontWeight: "400", textAlign: "center", color: theme.colors.background.offWhite },
//   innercontainer: { top: 80, backgroundColor: "#FDF4DE", borderRadius: 25, height: "90%", padding: 20 },
//   textContainer: { borderRadius: 25, backgroundColor: theme.colors.secondary.light, height: "73%", padding: 30 },
//   summaryText: { fontSize: theme.fonts.sizes.medium, fontFamily: theme.fonts.regular, color: theme.colors.blacks.medium, lineHeight: 30 },
//   errorText: { color: "red", textAlign: "center" },
//   audioContainer: { marginTop: 20, alignItems: "center" },
//   audioWaveformContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", height: 64 },
//   wave: { width: 6, marginHorizontal: 2, backgroundColor: theme.colors.primary.medium, borderRadius: 8, height: "50%" },
//   buttonContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "60%" },
//   listenButton: { backgroundColor: theme.colors.primary.medium, borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20 },
//   listenButtonText: { fontSize: theme.fonts.sizes.medium, color: theme.colors.background.offWhite, fontFamily: theme.fonts.bold },
// });
