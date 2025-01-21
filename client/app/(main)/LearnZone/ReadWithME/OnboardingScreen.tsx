import React from 'react';
import {Text, View,StyleSheet,Image,TouchableOpacity}   from 'react-native';
import theme from '../../../../src/theme';
import ReadWithMeNavigator from './ReadWithMeNavigator';


const OnboardingScreen = () => {
    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.Text} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi doloribus minus molestiae distinctio</Text>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop: 15,
        flex: 1,
        backgroundColor: "#9AC3BB",
        padding:12,
    },
    header:{
        paddingTop: 15,
        color: theme.colors.background.offWhite,
        padding:12,
    },
    Text:{
        fontSize:25,
        lineHeight:30,
        fontWeight:"500",
        textAlign:"center",
        color: theme.colors.background.offWhite,
    }
});

export default OnboardingScreen;