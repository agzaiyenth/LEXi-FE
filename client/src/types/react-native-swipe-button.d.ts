declare module 'react-native-swipe-button' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface SwipeButtonProps {
    title?: string;
    titleColor?: string;
    thumbIconBackgroundColor?: string;
    thumbIconComponent?: () => JSX.Element;
    railBackgroundColor?: string;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    onSwipeSuccess?: () => void;
    containerStyles?: ViewStyle;
    titleStyles?: TextStyle;
  }

  export default class SwipeButton extends Component<SwipeButtonProps> {}
} 