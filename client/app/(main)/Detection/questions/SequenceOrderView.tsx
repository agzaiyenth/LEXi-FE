import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import theme from "@/src/theme";
import { QuestionResponseDTO } from "@/src/types/Detection/Question";
import { useTheme } from '@/src/context/ThemeContext';

interface OptionItem {
  key: string;
  label: string;
}

interface Props {
  question: QuestionResponseDTO;
  onReorder: (answer: string) => void;
}

const SequenceOrderView: React.FC<Props> = ({ question, onReorder }) => {
  // Convert options into an array of objects with unique keys.
  const initialData: OptionItem[] =
    question.options?.map((option, index) => ({
      key: index.toString(),
      label: option,
    })) || [];

  const [data, setData] = useState<OptionItem[]>(initialData);

  // When the order changes, join the labels without commas.
  useEffect(() => {
    const concatenatedAnswer = data.map((item) => item.label).join("");
    onReorder(concatenatedAnswer);
  }, [data, onReorder]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<OptionItem>) => {
    return (
      <TouchableOpacity
        style={[
          styles.answerButton,
          isActive && styles.selectedAnswerButton,
        ]}
        onLongPress={drag}
      >
        <Text style={styles.answerText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    questionTitle: {
      fontSize: theme.fonts.sizes.s24,
      textAlign: "center",
      paddingBottom: 20,
    },
    answerContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 40,
    },
    answerButton: {
      marginBottom: 10,
      backgroundColor: theme.colors.primary.light3,
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
    },
    selectedAnswerButton: {
      backgroundColor: theme.colors.primary.dark2,
    },
    answerText: {
      color: "white",
      fontSize: theme.fonts.sizes.s20,
    },
  });

  return (
    <View>
      <Text style={styles.questionTitle}>{question.questionText}</Text>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }: { data: OptionItem[] }) => setData(data)}
        keyExtractor={(item: OptionItem) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.answerContainer}
      />
    </View>
  );
};

export default SequenceOrderView;

