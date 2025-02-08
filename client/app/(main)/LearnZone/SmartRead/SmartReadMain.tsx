
import React , {useState} from "react" ;
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Back icon
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../../../../src/theme";

export default function SmartReadMain() {
  const title = "Basics of Programming"; 

  const [isProcessed, setIsProcessed] = useState(false);

  const handleSummarise = () => {
     //api call??
    setTimeout(() => {
      setIsProcessed(true);
    }, 2000); 
  };
  

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.text}>Smart Read</Text>
        <EvilIcons name="arrow-left" style={styles.backArrow} />

        {/* Main Content */}
        <View style={styles.innercontainer}>
          <View style={styles.cardContainer}>
            {/* Document Image */}
            <Image
              source={require("@/assets/images/auth/icon.png")}
              style={styles.image}
            />

            {/* Document Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{title}</Text>             

           {/* Conditional Buttons */}
                {isProcessed ? (
                  
                  <TouchableOpacity style={styles.playButton}>
                    <AntDesign
                      name="playcircleo"
                      size={24}
                      color="white"
                      style={styles.playButtonIcon}
                    />
                    <Text style={styles.playButtonText}>View</Text>
                  </TouchableOpacity>
                ) : (
                  
                  <TouchableOpacity style={styles.summariseButton} onPress={handleSummarise}>
                    <Text style={styles.playButtonText}>Process</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
          </View>
          <TouchableOpacity style={styles.floatingButton}>
                <AntDesign name="filetext1" size={24} color="#FFFF" />
            </TouchableOpacity>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",

  },
  container: {
    flex: 1,
    backgroundColor: "#9AC3BB",
    position: "relative",
  },
  backArrow: {
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    color: theme.colors.blacks.medium,
  },
  cardContainer: {
    
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.colors.background.beige,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
    
    margin:20,

  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    width:80,
   
  },
  title: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.blacks.medium},
  author: {
    fontSize: 17,
    color: theme.colors.secondary.medium,
  },

  /*buttons:{
    flexDirection: "row",
    justifyContent: "flex-start",
  }
  ,*/
   summariseButton: {
    
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#009EA5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    
  },

  playButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#009EA5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:25,
    marginRight: 10,
    
  },
  playButtonIcon: {
    marginRight: 8,
  },
  playButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#009EA5',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

