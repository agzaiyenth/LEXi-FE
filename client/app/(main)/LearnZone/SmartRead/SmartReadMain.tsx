
// import React , {useState, useCallback} from "react" ;
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Back icon
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { theme } from "../../../../src/theme";
// import { useGetAllDocuments } from "@/src/hooks/SmartRead/getAllDocuments";
// import { FetchAllDocsDto } from "@/types/SmartRead/Documents";

// export default function SmartReadMain() {
//   const title = "Basics of Programming"; 

//   const [isProcessed, setIsProcessed] = useState(false);
//   const { documents, loading, error, refetch } = useGetAllDocuments();
//   const [refreshing, setRefreshing] = useState<boolean>(false);
  
//   // Refresh data when pulling down
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     refetch().finally(() => setRefreshing(false));
//   }, [refetch]);


//   const handleSummarise = () => {
//      //api call??
//     setTimeout(() => {
//       setIsProcessed(true);0

//     }, 2000); 
//   };
  

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>
        
//         <Text style={styles.text}>Smart Read</Text>
//         <EvilIcons name="arrow-left" style={styles.backArrow} />

       
//         <View style={styles.innercontainer}>
//           <View style={styles.cardContainer}>
           
//             <Image
//               source={require("@/assets/images/auth/icon.png")}
//               style={styles.image}
//             />

//             Document Details 
//             {documents?.map((document: FetchAllDocsDto, index: number) =>(
//             <View style={styles.detailsContainer}>
//               <Text style={styles.title}>{title}</Text>  
//               <Text style={styles.title}>{document.fileName}</Text>
//             ))} 

           
//             {documents?.map((document: FetchAllDocsDto, index: number) => (
//               <View key={index} style={styles.detailsContainer}>
//                 <Text style={styles.title}>{title}</Text> 
//                 <Text style={styles.title}>{document.fileName}</Text> {/* Document-specific file name */}
//               </View>
//             ))}       

           
//                 {isProcessed ? (
                  
//                   <TouchableOpacity style={styles.playButton}>
//                     <AntDesign
//                       name="playcircleo"
//                       size={24}
//                       color="white"
//                       style={styles.playButtonIcon}
//                     />
//                     <Text style={styles.playButtonText}>View</Text>
//                   </TouchableOpacity>
//                 ) : (
                  
//                   <TouchableOpacity style={styles.summariseButton} onPress={handleSummarise}>
//                     <Text style={styles.playButtonText}>Process</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
            
//           </View>
//           <TouchableOpacity style={styles.floatingButton}>
//                 <AntDesign name="filetext1" size={24} color="#FFFF" />
//             </TouchableOpacity>             
//       </View>
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     width: "100%",
//     height: "100%",

//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#9AC3BB",
//     position: "relative",
//   },
//   backArrow: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     fontSize: 60,
//     color: theme.colors.background.offWhite,
//     padding: 2,
//   },
//   text: {
//     top: 35,
//     fontSize: theme.fonts.sizes.small,
//     lineHeight: 30,
//     fontWeight: "400",
//     textAlign: "center",
//     color: theme.colors.background.offWhite,
//   },
//   innercontainer: {
//     top: 80,
//     backgroundColor: "#FDF4DE",
//     borderRadius: 25,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "90%",
//     color: theme.colors.blacks.medium,
//   },
//   cardContainer: {
    
//     flexDirection: "row",
//     padding: 10,
//     backgroundColor: theme.colors.background.beige,
//     borderRadius: 25,
//     marginBottom: 10,
//     alignItems: "center",
    
//     margin:20,

//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   detailsContainer: {
//     flex: 1,
//     justifyContent: "center",
//     width:80,
   
//   },
//   title: {
//     fontSize: theme.fonts.sizes.medium,
//     color: theme.colors.blacks.medium},
//   author: {
//     fontSize: 17,
//     color: theme.colors.secondary.medium,
//   },

//   buttons:{
//     flexDirection: "row",
//     justifyContent: "flex-start",
//   }
//   ,
//    summariseButton: {
    
//     alignItems: "center",
//     marginTop: 10,
//     backgroundColor: "#009EA5",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginRight: 10,
    
//   },

//   playButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     backgroundColor: "#009EA5",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius:25,
//     marginRight: 10,
    
//   },
//   playButtonIcon: {
//     marginRight: 8,
//   },
//   playButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   floatingButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 40,
//     backgroundColor: '#009EA5',
//     padding: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";
import { theme } from "../../../../src/theme";
import { useGetAllDocuments } from "@/src/hooks/SmartRead/getAllDocuments";
import { FetchAllDocsDto } from "@/types/SmartRead/Documents";

export default function SmartReadMain() {
  const [isProcessed, setIsProcessed] = useState(false);
  const { documents, loading, error, refetch } = useGetAllDocuments();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const handleSummarise = () => {
    setTimeout(() => {
      setIsProcessed(true);
    }, 2000);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Smart Read</Text>
        <EvilIcons name="arrow-left" style={styles.backArrow} />

        <View style={styles.innerContainer}>
          {documents?.map((document: FetchAllDocsDto, index: number) => (
            <View key={index} style={styles.cardContainer}>
              <Image source={require("@/assets/images/auth/icon.png")} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{document.fileName}</Text>
              </View>
              {isProcessed ? (
                <TouchableOpacity style={styles.playButton}>
                  <AntDesign name="playcircleo" size={24} color="white" style={styles.playButtonIcon} />
                  <Text style={styles.playButtonText}>View</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.summariseButton} onPress={handleSummarise}>
                  <Text style={styles.playButtonText}>Process</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
    flex: 1,
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
    marginTop: 35,
    fontSize: theme.fonts.sizes.small,
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },
  innerContainer: {
    marginTop: 80,
    backgroundColor: "#FDF4DE",
    borderRadius: 25,
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.colors.background.beige,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
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
  },
  title: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.blacks.medium,
  },
  summariseButton: {
    alignItems: "center",
    backgroundColor: "#009EA5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009EA5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
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
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#009EA5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
