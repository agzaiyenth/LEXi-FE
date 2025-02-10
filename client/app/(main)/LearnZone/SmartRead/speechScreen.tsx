import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Audio } from "expo-av";
import { theme } from "../../../../src/theme";
import Markdown from 'react-native-markdown-display';
import { useFetchDocument } from "../../../../src/hooks/SmartRead/useFetchDocument";
import { useRoute } from "@react-navigation/native";
import { FetchAllResponseDTO } from "@/types/SmartRead/Documents";

export default function SpeechScreen() {
  const route = useRoute();
  const {fileId}= route.params as {fileId:number};
  const { document, loading, error } = useFetchDocument(fileId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [waveAnim] = useState(() => Array.from({ length: 30 }, () => new Animated.Value(1)));

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const animateWaves = () => {
    if (isPlaying) {
      Animated.loop(
        Animated.stagger(
          100,
          waveAnim.map((anim, index) =>
            Animated.sequence([
              Animated.timing(anim, { toValue: index % 5 === 0 ? 1.2 : index % 5 === 1 ? 1 : index % 5 === 2 ? 0.8 : index % 5 === 3 ? 0.6 : 0.4, duration: 300, useNativeDriver: true }),
              Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true })
            ])
          )
        )
      ).start();
    } else {
      waveAnim.forEach(anim => anim.setValue(1));
    }
  };

  useEffect(() => {
    animateWaves();
  }, [isPlaying]);

  const handleAudioPlay = async () => {
    if (isPlaying) {
      sound?.stopAsync();
      setIsPlaying(false);
    } else if (document?.ttsAudioUrl) {
      const { sound } = await Audio.Sound.createAsync({ uri: document.ttsAudioUrl });
      setSound(sound);
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) setIsPlaying(false);
      });
      await sound.playAsync();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Smart Read</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />

        <View style={styles.innercontainer}>
          <View style={styles.textContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.primary.medium} />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <ScrollView>
                <Markdown style={StyleSheet.create({ summaryText: styles.summaryText })}>{document?.summary}</Markdown>
      
              </ScrollView>
            )}
          </View>

          <View style={styles.audioContainer}>
            <View style={styles.audioWaveformContainer}>
              {waveAnim.map((anim, index) => (
                <Animated.View key={`wave-${index}`} style={[styles.wave, { transform: [{ scaleY: anim }] }]} />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.listenButton} onPress={handleAudioPlay}>
                <Text style={styles.listenButtonText}>{isPlaying ? "STOP" : "LISTEN"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAudioPlay}>
                <Ionicons name={isPlaying ? "stop-circle" : "play-circle"} size={50} color={theme.colors.primary.medium} />
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
  leftarrow: { position: "absolute", top: 20, left: 20, fontSize: 60, color: theme.colors.background.offWhite, padding: 2 },
  text: { top: 35, fontSize: theme.fonts.sizes.small, lineHeight: 30, fontWeight: "400", textAlign: "center", color: theme.colors.background.offWhite },
  innercontainer: { top: 80, backgroundColor: "#FDF4DE", borderRadius: 25, height: "90%", padding: 20 },
  textContainer: { borderRadius: 25, backgroundColor: theme.colors.secondary.light, height: "73%", padding: 30 },
  summaryText: { fontSize: theme.fonts.sizes.medium, fontFamily: theme.fonts.regular, color: theme.colors.blacks.medium, lineHeight: 30 },
  errorText: { color: "red", textAlign: "center" },
  audioContainer: { marginTop: 20, alignItems: "center" },
  audioWaveformContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", height: 64 },
  wave: { width: 6, marginHorizontal: 2, backgroundColor: theme.colors.primary.medium, borderRadius: 8, height: "50%" },
  buttonContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "60%" },
  listenButton: { backgroundColor: theme.colors.primary.medium, borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20 },
  listenButtonText: { fontSize: theme.fonts.sizes.medium, color: theme.colors.background.offWhite, fontFamily: theme.fonts.bold },
});

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import * as Speech from "expo-speech";
// import { theme } from "../../../../src/theme";
// import { useFetchDocument } from "../../../../src/hooks/SmartRead/useFetchDocument";

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
