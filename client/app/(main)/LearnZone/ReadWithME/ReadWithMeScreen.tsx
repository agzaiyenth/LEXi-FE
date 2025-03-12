import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import Eclipse from "@/assets/Ellipse.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { theme } from "@/src/theme";

export default function ReadWithMeScreen() {
  type RootStackParamList = {
    ReadWithMeScreen: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "ReadWithMeScreen">>();

  const [mode, setMode] = useState("process");

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const recordingAnimation = useRef(new Animated.Value(1)).current;

  const [textChunks, setTextChunks] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState<{ chunk: string; score: number }[]>([]);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, { toValue: 0.3, duration: 500, useNativeDriver: true }),
          Animated.timing(recordingAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      recordingAnimation.setValue(1);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        console.log("Microphone permission not granted");
        return;
      }
      // If there is an ongoing recording, stop it
      if (recording) {
        await stopRecording();
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync({
        android: {
          extension: ".3gp",
          outputFormat: Audio.AndroidOutputFormat.THREE_GPP,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
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
          mimeType: "audio/webm",
          bitsPerSecond: 128000,
        },
      });
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Stop recording and store the URI
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

  const processRecording = async () => {
    if (!recordingUri) return;
    setIsUploading(true);
    try {
      const fileId = 1;
      const requestBody = {
        fileId: fileId,
        blobUrl: recordingUri,
      };
      const response = await fetch("/readWithMe/file/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      const fullText = data.text;
      const level = 3;
      const chunks = splitText(fullText, level);
      setTextChunks(chunks);
      setMode("evaluate");
      setCurrentChunkIndex(0);
    } catch (err) {
      console.error("Error processing recording:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Evaluate Mode: Evaluate pronunciation for the current text chunk
  
  const evaluateChunk = async () => {
    if (!recordingUri || textChunks.length === 0) return;
    setIsUploading(true);
    try {
      const currentChunk = textChunks[currentChunkIndex];
      const formData = new FormData();
      const response = await fetch(recordingUri);
      const blob = await response.blob();
      formData.append("audioFile", blob, "recording.wav");
      formData.append("expectedWord", currentChunk);

      const evalResponse = await fetch("/readWithMe/file/evaluate", {
        method: "POST",
        body: formData,
      });
      const evalData = await evalResponse.json();
      setEvaluationResults(prev => [
        ...prev,
        { chunk: currentChunk, score: evalData.pronunciationScore },
      ]);
      setCurrentChunkIndex(prevIndex => prevIndex + 1);
    } catch (err) {
      console.error("Error evaluating chunk:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const splitText = (text: string, level: number): string[] => {
    const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");
    let result: string[] = [];
    let nonHeadingLines: string[] = [];

    const fullCapsHeading = /^[A-Z][A-Z0-9 \-]+$/;
    const numberedHeading = /^\d+\.\s?[A-Z].*/;
    const titleCaseHeading = /^(?:[A-Z][a-z]+\s*){1,6}$/;

    lines.forEach((line) => {
      const isHeading =
        fullCapsHeading.test(line) ||
        numberedHeading.test(line) ||
        (titleCaseHeading.test(line) && line.length < 50);

      if (isHeading) {
        if (nonHeadingLines.length > 0) {
          result = result.concat(splitIntoChunks(nonHeadingLines.join(" "), level));
          nonHeadingLines = [];
        }
        result.push(line);
      } else {
        nonHeadingLines.push(line);
      }
    });

    if (nonHeadingLines.length > 0) {
      result = result.concat(splitIntoChunks(nonHeadingLines.join(" "), level));
    }

    return result;
  };

  const splitIntoChunks = (text: string, level: number): string[] => {
    const words = text.split(" ").filter(word => word.length > 0);
    let chunkSize: number;
    switch (level) {
      case 4:
        chunkSize = 1;
        break; // Severe Dyslexia (word-by-word)
      case 3:
        chunkSize = 3;
        break; // Moderate Dyslexia (three words per chunk)
      case 2:
        chunkSize = 5;
        break; // Mild Dyslexia (five words per chunk)
      default:
        chunkSize = words.length; 
    }
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }
    return chunks;
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

      {mode === "process" && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.textPrompt}>Please read the text aloud.</Text>
          </View>

          <View style={styles.micContainer}>
            <Image source={Eclipse} style={styles.ringImage} />
            <TouchableOpacity
              style={styles.micButton}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Animated.View style={{ opacity: recordingAnimation }}>
                <Ionicons name="mic" size={90} color={theme.colors.primary.dark2} />
              </Animated.View>
            </TouchableOpacity>
            {isRecording && <Text style={styles.recordingText}>Recording...</Text>}
          </View>

          {recordingUri && (
            <TouchableOpacity style={styles.sendButton} onPress={processRecording} disabled={isUploading}>
              {isUploading ? <ActivityIndicator color="white" /> : <Text style={styles.sendText}>Process</Text>}
            </TouchableOpacity>
          )}
        </>
      )}

      {mode === "evaluate" && textChunks.length > 0 && (
        <>
          {/* Display current chunk with highlight */}
          <View style={styles.chunkContainer}>
            <Text style={styles.chunkText}>
              {currentChunkIndex < textChunks.length ? textChunks[currentChunkIndex] : "All done!"}
            </Text>
          </View>

          {/* Recording mic button for evaluation */}
          <View style={styles.micContainer}>
            <Image source={Eclipse} style={styles.ringImage} />
            <TouchableOpacity
              style={styles.micButton}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Animated.View style={{ opacity: recordingAnimation }}>
                <Ionicons name="mic" size={90} color={theme.colors.primary.dark2} />
              </Animated.View>
            </TouchableOpacity>
            {isRecording && <Text style={styles.recordingText}>Recording...</Text>}
          </View>

        
          {recordingUri && currentChunkIndex < textChunks.length && (
            <TouchableOpacity style={styles.sendButton} onPress={evaluateChunk} disabled={isUploading}>
              {isUploading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.sendText}>Evaluate</Text>
              )}
            </TouchableOpacity>
          )}

          {/* Optionally, show evaluation results */}
          {evaluationResults.length > 0 && (
            <View style={styles.resultsContainer}>
              {evaluationResults.map((result, index) => (
                <Text key={index} style={styles.resultText}>
                  {result.chunk}: {result.score}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

// ------------------
// Styles
// ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    marginBottom: 30,
  },
  textPrompt: {
    marginBottom: 40,
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.blacks.medium,
    fontFamily: theme.fonts.regular,
  },
  micContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  ringImage: {
    width: 300,
    height: 300,
    position: "absolute",
  },
  micButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  recordingText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
  sendButton: {
    backgroundColor: theme.colors.primary.dark2,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop:100,
    marginBottom: 0,
  },
  sendText: {
    color: "white",
    fontSize: 18,
  },
  chunkContainer: {
    backgroundColor: "#fff9c4", // a highlighted background effect
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  chunkText: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.blacks.medium,
    fontFamily: theme.fonts.regular,
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    color: theme.colors.blacks.medium,
  },
});
