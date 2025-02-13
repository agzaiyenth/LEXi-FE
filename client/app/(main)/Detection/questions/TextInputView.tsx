import React from "react";
import { TextInput } from "react-native";

interface Props {
  onChangeText: (text: string) => void;
}

const TextInputView: React.FC<Props> = ({ onChangeText }) => {
  return <TextInput placeholder="Type your answer..." onChangeText={onChangeText} />;
};

export default TextInputView;
