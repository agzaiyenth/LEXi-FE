import React from "react";
import { Text, View, StyleSheet, Image ,TouchableOpacity} from "react-native";
import theme from "../../../../src/theme";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const Scan = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text} >Read With Me</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
        <View  style={styles.innercontainer}></View>
         Image
         
      </View>
    </View>
  );
};
export default Scan;

const styles = StyleSheet.create({
    wrapper:{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        fontFamily: "Poppins",
        zIndex: 0,
      },
      container:{
        paddingTop: 15,
        flex: 1,
        backgroundColor: "#9AC3BB",
        justifyContent: "center",
        textAlign: "center",
      },
      text:{
        top:20,
        fontSize:25,
        lineHeight:30,
        fontWeight:"400",
        textAlign:"center",
        color: theme.colors.background.offWhite,
      },
      leftarrow:{   
        position: "absolute",
        top: 20,
        left: 20,
        fontSize: 50,
        color: theme.colors.background.offWhite,
      },
      innercontainer:{
        flexDirection: 'column',
        top: 65,
        flex: 2,
        backgroundColor: "#FDF4DE",
        borderRadius:20,
      }
      
    

});