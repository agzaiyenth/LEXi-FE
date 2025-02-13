// import React, { useState } from "react";
// import { View, Button, Text } from "react-native";
// import * as Audio from "expo-av";

// interface Props {
//   expectedWord: string;
//   onSubmit: (audioUri: string) => void;
// }

// const AudioInputView: React.FC<Props> = ({ expectedWord, onSubmit }) => {
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   const startRecording = async () => {
//     try {
//       await Audio.requestPermissionsAsync();
//       const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
//       setRecording(recording);
//     } catch (error) {
//       console.error("Failed to start recording:", error);
//     }
//   };

//   const stopRecording = async () => {
//     if (!recording) return;
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();
//     setAudioUri(uri);
//     setRecording(null);
//     if (uri) onSubmit(uri);
//   };

//   return (
//     <View>
//       <Text>Read the word aloud: {expectedWord}</Text>
//       <Button title={recording ? "Stop Recording" : "Start Recording"} onPress={recording ? stopRecording : startRecording} />
//       {audioUri && <Text>Recorded! Ready to submit.</Text>}
//     </View>
//   );
// };

// export default AudioInputView;
