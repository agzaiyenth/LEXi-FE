import React, { useState } from "react";
import { View, Button, Text } from "react-native";

interface Props {
  options: string[];
  onReorder: (answer: string) => void;
}

const SequenceOrderView: React.FC<Props> = ({ options, onReorder }) => {
  const [order, setOrder] = useState(options);

  const shuffleOptions = () => {
    const shuffled = [...order].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
  };

  return (
    <View>
      <Text>Rearrange the words:</Text>
      {order.map((item, index) => (
        <Button key={index} title={item} onPress={() => onReorder(order.join(","))} />
      ))}
      <Button title="Shuffle Order" onPress={shuffleOptions} />
    </View>
  );
};

export default SequenceOrderView;
