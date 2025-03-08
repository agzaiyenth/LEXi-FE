import theme from '@/src/theme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { useTheme } from '@/src/context/ThemeContext';


const FileDirectory = () => {

  const cards = [
    { id: 1, title: 'How To Be a Good Designer', author: 'Micheal Zaffran', imageUrl: 'https://via.placeholder.com/80' },
    { id: 2, title: 'Let\'s Make A World More Meaningful', author: 'Jane Doe', imageUrl: 'https://via.placeholder.com/80' },
    { id: 3, title: 'A Blam Game Movie Fan Theory', author: 'Jack Mickel', imageUrl: 'https://via.placeholder.com/80' },
    { id: 4, title: 'A Blam Game Movie Fan Theory', author: 'Jack Mickel', imageUrl: 'https://via.placeholder.com/80' },
    { id: 5, title: 'A Blam Game Movie Fan Theory', author: 'Jack Mickel', imageUrl: 'https://via.placeholder.com/80' },
    { id: 6, title: 'A Blam Game Movie Fan Theory', author: 'Jack Mickel', imageUrl: 'https://via.placeholder.com/80' },
  ];

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    Wrapper: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      fontFamily: "Poppins",
      zIndex: 0,
    },
    Container: {
      paddingTop: 15,
      flex: 1,
      backgroundColor: "#9AC3BB",
      padding: 12,
    },
    Topic: {
      fontSize: theme.fonts.sizes.s26,
      lineHeight: 30,
      fontWeight: "500",
      textAlign: "center",
      color: theme.colors.background.offWhite,
    },
    SubTopic: {
      marginTop: 25,
      marginLeft: 20,
      fontWeight: "600",
      fontSize: theme.fonts.sizes.medium,
      lineHeight: 27,
      color: theme.colors.primary.medium,
      marginBottom: 10,
    },
  })

  return (
    <View style={styles.Wrapper} >
      <View style={styles.Container}>
        <Text style={styles.Topic} >Select A Document To Read</Text>
        <FlatList
          data={cards}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              author={item.author}
              imageUrl={item.imageUrl}
            />
          )}
          ListHeaderComponent={() => <Text style={styles.SubTopic}>Trending Podcast</Text>}
        />
      </View>
    </View>
  );
};

export default FileDirectory;
