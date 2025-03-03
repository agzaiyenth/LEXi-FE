
import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/loading";
import { useGetAllDocuments } from "@/src/hooks/SmartRead/useGetAllDocuments";
import { useProcessDocument } from "@/src/hooks/SmartRead/useProcessDocument";
import { theme } from "@/src/theme";
import { FetchAllResponseDTO, ProcessDocRequestDTO } from "@/src/types/SmartRead/Documents";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import EmptyState from "./emptyState";
import IconImage from '@/assets/images/auth/icon.png';
import Svg, { Circle, Line } from "react-native-svg";



export default function SmartReadMain() {

  const navigation = useNavigation<StackNavigationProp<any, "SmartReadMain">>();
  const { documents, loading, error, refetch } = useGetAllDocuments();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { processDocument } = useProcessDocument();
  const [processingDocs, setProcessingDocs] = useState<number[]>([]);



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);



  const handleProcessing = async ({ fileId, blobUrl }: ProcessDocRequestDTO) => {
    setProcessingDocs((prev) => [...prev, fileId]);
    try {
      await processDocument({ fileId, blobUrl });
      console.log('Document processing request sent.');

      setTimeout(() => {
        Toast.show({ type: 'success', text1: 'Processing Complete', text2: 'The document has been successfully processed!' });
      }, 2000);
    } catch (error) {
      console.error('Processing error:', error);
      Toast.show({ type: 'error', text1: 'Failed to process the document' });
    } finally {
      setProcessingDocs((prev) => prev.filter((id) => id !== fileId));
      refetch();
    }
  };




  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  else if (error) {
    return (
      <ErrorScreen />
    )
  } else {

    return (

      <View style={styles.wrapper}>
        <View style={styles.container}>

          {/* Header */}
          <Text style={styles.text}>Smart Read</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>
          

          {/*Main Content*/}
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
           contentContainerStyle={styles.scrollViewContent}>
           
              <View style={styles.innercontainer} >

                  {documents.length > 0 ? (
                    documents?.map((document: FetchAllResponseDTO) => (
                      <View style={styles.cardContainer} key={document.id}>
                        {/* Document Image */}
                        <Image
                          source={IconImage}
                          style={styles.image}
                        />

                        {/* Document Details */}

                        <View style={styles.detailsContainer}>

                          <Text style={styles.title}>{document.fileName}</Text>

                          {/* Conditional Buttons */}
                          {document.processed === true ? (
                            <TouchableOpacity
                              style={styles.playButton}
                              onPress={() => navigation.navigate("SpeechScreen", { fileId: document.id })}
                            >
                              <AntDesign
                                name="playcircleo"
                                size={24}
                                style={styles.playButtonIcon}
                              />
                              <Text style={styles.playButtonText}>View</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.processButton}
                              onPress={() => handleProcessing({ fileId: document.id, blobUrl: document.blobUrl })}
                              disabled={processingDocs.includes(document.id)}
                            >
                              {processingDocs.includes(document.id) ? (<>
                                <ActivityIndicator size="small" color={theme.colors.secondary.medium} />
                                <Text style={styles.playButtonText}>Processing Hold Up!</Text>
                              </>
                              ) : (
                                <>
                                  <AntDesign
                                    name="playcircleo"
                                    size={24}
                                    style={styles.playButtonIcon}
                                  />
                                  <Text style={styles.playButtonText}>Process</Text>
                                </>
                              )}
                            </TouchableOpacity>
                          )}

                        </View>
                      </View>
                    ))) : (<EmptyState param="Documents"/>)}


                      <TouchableOpacity style={styles.buttonUpload}onPress={() =>
                                  navigation.navigate('UploadScreen')}>
                        <View style={styles.iconContainer}>
                          <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Circle cx="12" cy="12" r="10" fill="#B0C4C7" />
                            <Line x1="12" y1="8" x2="12" y2="16" stroke="#2C858D" strokeWidth="2" />
                            <Line x1="8" y1="12" x2="16" y2="12" stroke="#2C858D" strokeWidth="2" />
                          </Svg>
                        </View>
                          <Text style={styles.textUpload}>Upload</Text>
                      </TouchableOpacity>
                
              </View>  
              
           
            
          </ScrollView>
          

          

        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",

  },
  container: {
    height: "150%",
    backgroundColor: "#9AC3BB",
    position: "relative",
    
  },
  backArrow: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: theme.fonts.sizes.s60,
    color: theme.colors.background.offWhite,
    padding: 2,
  },
  text: {
    top: 35,
    fontSize: theme.fonts.sizes.large,
    lineHeight: 30,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },
  backButton:{
    padding:10,
    marginTop:-13,
  },
  innercontainer: {
    flex: 1,
    top: 80,
    backgroundColor: "#FDF4DE",
    borderRadius: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.blacks.medium,
    position: "relative",
    paddingBottom:700,
  },
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.colors.background.beige,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: -2,
    margin: 25,

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
    width: 80,
    

  },
  title: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.blacks.dark,
    marginRight: 30,

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
    borderRadius: 25,
    marginRight: 10,

  },
  playButtonIcon: {
    marginRight: 8,
    color: theme.colors.secondary.medium,
  },
  playButtonText: {
    color: theme.colors.secondary.medium,
    fontSize: theme.fonts.sizes.s16,
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

  buttonUpload: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009EA5",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 30,
    width:300, 
    justifyContent: "center",
    margin: 50,
    marginBottom: 20,
    top: 550,
    position: "absolute",
  },
  iconContainer: {
    backgroundColor: "#B0C4C7",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textUpload: {
    color: "#FFF9EF",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    top: -50,
    
  },


});

