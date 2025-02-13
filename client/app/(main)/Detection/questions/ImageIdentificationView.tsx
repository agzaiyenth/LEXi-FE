import React from "react";
import { View, Image, Button } from "react-native";

interface Props {
  imageUrl: string;
  onSelect: (answer: string) => void;
}

const ImageIdentificationView: React.FC<Props> = ({ imageUrl, onSelect }) => {
  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      <Button title="Submit Answer" onPress={() => onSelect("identified")} />
    </View>
  );
};

export default ImageIdentificationView;
