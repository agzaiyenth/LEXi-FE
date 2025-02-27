import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import { QuestionResponseDTO } from '@/src/types/Detection/Question';
import theme from '@/src/theme';

interface Props {
  question: QuestionResponseDTO;
  onSelect: (answer: string) => void;
}

const AudioComparison = ({ question, onSelect }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onSelect(answer);
  };

  // --- Custom Audio Player (only changes inside audioContainer) ---
  const AudioPlayer = ({ audioUrl }: { audioUrl: string | undefined}) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
      let soundObj: Audio.Sound;
      const loadSound = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
          soundObj = sound;
          setSound(soundObj);
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      };
      loadSound();
      return () => {
        if (soundObj) {
          soundObj.unloadAsync();
        }
      };
    }, [audioUrl]);

    const handlePlayPause = async () => {
      if (!sound) return;
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    };

    return (
      <View style={styles.audioPlayerContainer}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
          <Text style={styles.playPauseText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        {/* Placeholder for waveform or other visualizations */}
        <Text style={styles.waveText}>[Waveform Placeholder]</Text>
      </View>
    );
  };
  // --- End Custom Audio Player ---

  return (
    <View>
      <Text style={styles.questionTitle}>{question.questionText}</Text>
      <View style={styles.audioContainer}>
        {/* Insert custom audio player here */}
        <AudioPlayer audioUrl={question.mediaUrl} />
      </View>
      <View style={styles.answerContainer}>
        {question.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === option && styles.selectedAnswerButton,
            ]}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.answerText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AudioComparison;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  audioContainer: {
    backgroundColor: theme.colors.primary.dark2,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  audioPlayerContainer: {
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: theme.colors.primary.light3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  playPauseText: {
    color: 'white',
    fontSize: theme.fonts.sizes.s18,
  },
  waveText: {
    color: 'white',
    fontSize:theme.fonts.sizes.s14,
  },
  questionTitle: {
    fontSize: theme.fonts.sizes.s24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  answerButton: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: theme.colors.primary.light3,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedAnswerButton: {
    backgroundColor: theme.colors.primary.dark2,
  },
  answerText: {
    color: 'white',
    fontSize: theme.fonts.sizes.s20,
  },
});
