import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './(main)';
import LearnScreen from './(main)/LearnZone';
import PlayScreen from './(main)/PlaySpace';
import ExploreScreen from './(main)/Explore';
import AccountScreen from './(main)/Account';
import DetectionFlow from './(main)/Detection';
import theme from '../src/theme';
import { AppTabParamList } from '@/types/common/navigation';


const Tab = createBottomTabNavigator<AppTabParamList>();


export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Detection" component={DetectionFlow} />
    </Tab.Navigator>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }:any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = (name:any) => {
          switch (name) {
            case 'Home':
              return 'home';
            case 'Learn':
              return 'apps';
            case 'Play':
              return 'sports-esports';
            case 'Explore':
              return 'public';
            case 'Account':
              return 'account-circle';
            case 'Detection':
              return 'pages';
            default:
              return 'home';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabButton,
              isFocused && styles.focusedTabButton,
            ]}
          >
            <View style={styles.container}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={getIcon(route.name)}
                size={24}
                color={isFocused ? theme.colors.background.offWhite : theme.colors.primary.dark1}
              />
            
            </View>
            <Text style={[styles.label, isFocused && styles.focusedLabel]}>
              {options.tabBarLabel || route.name}
            </Text>
            </View>
            {isFocused && <View style={styles.underline} />}
          </TouchableOpacity>
        
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{

  },
  tabBar: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
                  backgroundColor: theme.colors.primary.light2,
                  borderTopLeftRadius: theme.spacing.large,
                  borderTopRightRadius: theme.spacing.large,
                  width: '100%',
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.small,
    backgroundColor: 'transparent',
  },
  focusedTabButton: {
    backgroundColor: theme.colors.primary.medium2 ,
    borderRadius: theme.spacing.medium,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  underline: {
    width: 30,
    height: 4,
    backgroundColor: theme.colors.background.offWhite,
    
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  label: {
    fontSize: 10,
    color: theme.colors.primary.dark1,
    marginTop: 5,
  },
  focusedLabel: {
    color: theme.colors.background.offWhite,
  },
});
