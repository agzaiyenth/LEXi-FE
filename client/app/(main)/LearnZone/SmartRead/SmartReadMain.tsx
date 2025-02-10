
import React , {useState, useCallback} from "react" ;
import {Alert,  StyleSheet, View, Text, TouchableOpacity, ScrollView, Image ,RefreshControl } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../../../../src/theme";
import { useGetAllDocuments } from "@/src/hooks/SmartRead/useGetAllDocuments";
import {FetchAllResponseDTO} from "@/types/SmartRead/Documents";
import { useProcessDocument } from "@/src/hooks/SmartRead/useProcessDocument";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";

export default function SmartReadMain() {
 

 
  const { documents, loading, error, refetch } = useGetAllDocuments();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { processDocument, isProcessing } = useProcessDocument();
  const navigation = useNavigation<StackNavigationProp<any, "SmartReadMain">>();
  
  

  console.log(documents)

   
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);
  

  
  const handleProcessing = async (process: FetchAllResponseDTO) => {
    const fileId = process.id 
    const blobUrl = process.blobUrl
    try {
      await processDocument({fileId,blobUrl}); 
      console.log('Document processing request sent.');
  
      setTimeout(() => {
        Alert.alert('Processing Complete', 'The document has been successfully processed!');
      }, 2000);
    } catch (error) {
      console.error('Processing error:', error);
      Alert.alert('Error', 'Failed to process the document.');
    }
  };
  


  
  

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        
        {/* Header */}
        <Text style={styles.text}>Smart Read</Text>
        <EvilIcons name="arrow-left" style={styles.backArrow} />

        {/*Main Content*/}
        <ScrollView refreshControl={<RefreshControl refreshing ={refreshing} onRefresh ={onRefresh} />}>
        <View style={styles.innercontainer} >

          { documents.length > 0 ? (
             documents?.map((document: FetchAllResponseDTO, index:number) => (
            <View style={styles.cardContainer}  key={document.id}>
              {/* Document Image */}
              <Image
                source={require("@/assets/images/auth/icon.png")}
                style={styles.image}
              />

              {/* Document Details */}

              <View style={styles.detailsContainer}>
                 
                <Text style={styles.title}>{document.fileName}</Text>            

            {/* Conditional Buttons */}
                  {document.processed == true ? (
                  
                    <TouchableOpacity style={styles.playButton} onPress={ () =>navigation.navigate('SpeechScreen', {fileId: document.id})}>
                      <AntDesign
                        name="playcircleo"
                        size={24}
                        
                        style={styles.playButtonIcon}
                      />
                      <Text style={styles.playButtonText}>View</Text>
                    </TouchableOpacity>
                  ) : (
                    
                    <TouchableOpacity style={styles.processButton} onPress={ () =>handleProcessing (document)}>
                      <AntDesign
                        name="playcircleo"
                        size={24}
                       
                        style={styles.playButtonIcon}
                      />
                      <Text style={styles.playButtonText}>Process</Text> 
                    </TouchableOpacity>
                  )}
                </View>
              </View>
             ))): (<Text>no documents found</Text>)}  
            </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton}>
                  <AntDesign name="filetext1" size={24} color="#FFFF" />   {/* add navigation here for the uploading screen */}
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
    height: "140%",
    color: theme.colors.blacks.medium,
  },
  cardContainer: {
    top: -80,
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.colors.background.beige,
    borderRadius: 25,
    alignItems: "center",
    marginBottom:-2,
    margin:25,

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
    
    color: theme.colors.blacks.dark,
    marginRight:30,
    
  },

   processButton: {
    flexDirection: "row",
    alignItems: "center", 
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 8,
    
  },

  playButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:25,
    marginRight: 10,
    
  },
  playButtonIcon: {
    marginRight: 8,
    color: theme.colors.secondary.medium,
  },
  playButtonText: {
    color: theme.colors.secondary.medium,
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

