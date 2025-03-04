// app/(main)/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Redirect } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSession } from '@/src/ctx';
import HomeScreen from '.';
import LearnScreen from './LearnZone';
import PlayScreen from './PlaySpace';
import ExploreScreen from './Explore';
import AccountScreen from './Account';
import DetectionFlow from './Detection';
import LoadingScreen from '@/src/components/loading';
import AccessibilityScreen from "./Account/Accessibility";
import { ThemeProvider, useTheme } from '@/src/context/ThemeContext';
import theme, { getCurrentTheme } from '@/src/theme';

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const { contrast } = useTheme();
  const dynamicTheme = getCurrentTheme(contrast); // Get the current theme dynamically

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen
  }

  if (!session) {
    return <Redirect href="/LandingScreen" />; 
  }

  return (
    <ThemeProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Hide headers
        }}
        tabBar={(props) => <CustomTabBar {...props} theme={dynamicTheme} />} // Pass dynamic theme to CustomTabBar
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="LearnZone" component={LearnScreen} options={{ title: 'Learn' }} />
        <Tab.Screen name="PlaySpace" component={PlayScreen} options={{ title: 'Play' }} />
        <Tab.Screen name="Explore+" component={ExploreScreen} options={{ title: 'Explore' }} />
        <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
        <Tab.Screen name="Detection" component={DetectionFlow} options={{ title: 'Detection' }} />
        <Tab.Screen name="Accessibility" component={AccessibilityScreen} options={{ title: 'Accessibility' }} />
      </Tab.Navigator>
    </ThemeProvider>
  );
}

// Custom Bottom Navigation Bar
const CustomTabBar = ({ state, descriptors, navigation, theme }: any) => {
  return (
    <View style={[styles.tabBar, { backgroundColor: theme.colors.primary.light2 }]}>
      {state.routes.map((route: any, index: number) => {
        if (route.name === 'Detection' || route.name === 'Accessibility') {
          return null; // Exclude the Detection tab from being rendered
        }

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

        const getIcon = (name: string) => {
          switch (name) {
            case 'Home':
              return 'home';
            case 'LearnZone':
              return 'apps';
            case 'PlaySpace':
              return 'sports-esports';
            case 'Explore+':
              return 'public';
            case 'Account':
              return 'account-circle';
            default:
              return 'home';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.focusedTabButton]}
          >
            <View style={styles.container}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name={getIcon(route.name)}
                  size={24}
                  color={
                    isFocused
                      ? theme.colors.background.offWhite
                      : theme.colors.primary.dark1
                  }
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
  container: {},
  tabBar: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
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
    backgroundColor: theme.colors.primary.medium2,
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
    fontSize: theme.fonts.sizes.s10,
    color: theme.colors.primary.dark1,
    marginTop: 5,
  },
  focusedLabel: {
    color: theme.colors.background.offWhite,
  },
});
