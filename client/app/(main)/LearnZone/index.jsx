import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const LearnScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.ScreenContainer}>
        <Text style={styles.header}>Select A Document To Read</Text>

        <View style={styles.CardContainer}>
          <View style={styles.SelectedCard}>
            <View style={styles.Card}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.CardImage}
              />
              <View style={styles.CardDetails}>
                <Text style={styles.CardTitle}>How To Be a Good Designer</Text>
                <Text style={styles.CardAuthor}>Micheal Zaffran</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Trending Podcast</Text>

          {/* Other Cards */}
          <View style={styles.Card}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }}
              style={styles.CardImage}
            />
            <View style={styles.CardDetails}>
              <Text style={styles.CardTitle}>
                Let's Make A World More Meaningful
              </Text>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>Play Now</Text>
                <PlayCircleOutlineIcon style={{ fontSize: 40, color: '#F9BE7C' }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    fontFamily: "Poppins",
    zIndex: 0,
  },
  ScreenContainer: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#9AC3BB",
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 30,
    textAlign: "center",
    color: "#FFF9EB",
  },
  CardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#FDF4DE",
    borderRadius: 25,
    height: "100%",
    width: "100%",
    position: "relative", // Ensure this is the positioned ancestor for absolute positioning
  },
  SelectedCard: {
    position: "absolute", // Make it overlap other elements
    top: 30, // Adjust to place it higher than other cards
    left: 20, // Adjust horizontal position
    backgroundColor: "#EADFC4",
    padding: 10,
    borderRadius: 25,
    width: "90%", // Adjust width as needed
    height: 250,
    zIndex: 10, // Ensure it appears on top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  Card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9EB",
    height: 150,
    borderRadius: 25,
    padding: 10,
  },
  CardImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 20,
  },

  CardDetails: {
    flex: 1, // Take the remaining space in the flex container
    justifyContent: "center", // Center content vertically in the container
    paddingLeft: 10, // Add some padding to separate from the image
  },
  CardTitle: {
    fontSize: 23,
    fontWeight: "500",
  },
  CardAuthor: {
    fontSize: 17,
    color: "#F9BE7C",
    fontWeight: "400",
    lineHeight: 20,
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#A17E56",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFF9EB",
    fontWeight: "500",
    fontSize: 16,
  },
  sectionTitle: {
    color: "#302A37",
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 22,
    marginLeft: 20,
    marginTop: -120,
  },
  playButton: {
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  playButtonText: {
    fontSize: 12,
    color: "#F9BE7C",
  },
});

export default LearnScreen;
