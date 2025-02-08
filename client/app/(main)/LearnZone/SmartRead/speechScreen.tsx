import React ,{useState , useEffect}  from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the back icon
import { theme } from "../../../../src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";


export default function SpeechScreen() {


  return (
    
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Smart Read</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
        
        <View style={styles.innercontainer}>
          

          <View style={styles.textContainer}>
           <Text>The below paragraph is about how Science helps us to improve
            our daily tasks by following certain steps.
           </Text>
          </View>

          {/* Audio Controls */}
          <View style={styles.audioContainer}>
            <View style={styles.audioWaveform}>
              
              
            </View>
            <View style={styles.audioWaveformContainer}>
              {/* Lower half (Original) */}
              <View style={[styles.audioWaveform, styles.mirroredWaveform]}>
                {Array.from({ length: 30 }).map((_, index) => {
                  const height = Math.random() * 40 + 20; // Same height as upper half
                  return <View key={`lower-${index}`} style={[styles.wave, { height }]} />;
                })}
              </View>
              
              {/* Upper half (Mirrored) */}
              <View style={styles.audioWaveform}>
                {Array.from({ length: 30 }).map((_, index) => {
                  const height = Math.random() * 40 + 20; // Same height for both halves
                  return <View key={`upper-${index}`} style={[styles.wave, { height }]} />;
                })}
              </View>

              
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.listenButton}>
                <Text style={styles.listenButtonText}>LISTEN</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="pause-circle" size={50} color={theme.colors.primary.medium} />
              </TouchableOpacity>
            </View>
          </View>
          
          
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    fontFamily: "Poppins",
  },
  container: {
    flex: 1,
    //backgroundColor: theme.colors.background.offWhite,
    backgroundColor: "#9AC3BB",
    position: "relative"
  },

  leftarrow: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 60,
    color: theme.colors.background.offWhite,
    padding: 2,
  },

  text: {
    top: 35,
    fontSize: theme.fonts.sizes.small,
    lineHeight: 30,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },

  innercontainer: {
    top: 80,
    backgroundColor: "#FDF4DE",
    borderRadius: 25,
    flexDirection: "column", // Ensure a column layout for stacking
    justifyContent: "center",
    alignItems: "center", // Center items horizontally
    height: "90%",
    
    color: theme.colors.blacks.medium,

  },

  textContainer:{
    
    borderRadius: 25,
    backgroundColor: theme.colors.secondary.light,
    height: "73%",
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 30, // Add horizontal padding
    paddingVertical: 50,
    alignSelf: "center",
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blacks.medium,
    lineHeight: 30,
    
    
  },
  audioWaveformContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative", 
  },

  mirroredWaveform: {
    transform: [{ scaleY: -1 }], // Flips the waveform upside down
    marginTop: -2, // Overlap slightly to blend
  },

  audioContainer: {
    
    alignItems: "center",
    marginTop: theme.spacing.medium,
    bottom:60,
    position: "fixed",
  },
  audioWaveform: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.medium,
  },
  wave: {
    width: 6,
    marginHorizontal: 2,
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 3,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    paddingHorizontal: theme.spacing.extraLarge,
  },
  listenButton: {
    backgroundColor: theme.colors.primary.medium,
    borderRadius: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.extraLarge,
    marginBottom: theme.spacing.medium,
  },
  listenButtonText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.background.offWhite,
    fontFamily: theme.fonts.bold,
  },
});
