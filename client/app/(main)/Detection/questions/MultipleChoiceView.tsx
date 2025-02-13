import React from "react";
import { View, Button } from "react-native";

interface Props {
  options: string[];
  onSelect: (answer: string) => void;
}

const MultipleChoiceView: React.FC<Props> = ({ options, onSelect }) => {
  return (
    <View>
      {options.map((option, index) => (
        <Button key={index} title={option} onPress={() => onSelect(option)} />
      ))}
    </View>
  );
};

export default MultipleChoiceView;
