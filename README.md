### React Native Rules for an Expo Application

#### Code Style and Structure:
- Write clean, concise, and type-safe TypeScript code.
- Prefer functional components and React Hooks over class components.
- Organize code by feature, grouping related components, hooks, styles, and tests into feature-based directories.
- Ensure components are modular, reusable, and well-documented with comments where necessary.

#### Naming Conventions:
- Use camelCase for variables, functions, and method names (e.g., `fetchUserData`, `handleFormSubmit`).
- Use PascalCase for component names (e.g., `LoginScreen`, `UserCard`).
- Directory and file names should be lowercase and hyphenated (e.g., `user-auth`, `product-listing`).
- Prefix custom hooks with `use` (e.g., `useAuth`, `useFetchData`).

#### TypeScript Best Practices:
- Use TypeScript for all files, enabling strict mode in `tsconfig.json`.
- Define prop types with interfaces or `type` aliases, avoiding `any`.
- Use utility types like `Partial`, `Pick`, and `Omit` when needed to create precise and reusable types.
- Use `React.FC` or `React.FunctionComponent` for functional components with props, if appropriate.

#### Performance Optimization:
- Optimize FlatLists and SectionLists using props like `initialNumToRender`, `windowSize`, `removeClippedSubviews`, and `maxToRenderPerBatch`.
- Use `getItemLayout` for lists with fixed item dimensions.
- Avoid inline functions in render methods; use `useCallback` for memoized handlers.
- Use `React.memo` for components to prevent unnecessary re-renders.
- Avoid heavy computations or API calls inside `render` or `useEffect` hooks—move them to a dedicated helper function or service.

#### UI and Styling:
- Use `StyleSheet.create()` or Styled Components for consistent and reusable styling.
- Ensure responsive design using `Dimensions`, `useWindowDimensions`, or libraries like `react-native-responsive-dimensions`.
- Optimize images with `react-native-fast-image` or similar libraries.
- Adhere to accessibility best practices (e.g., using `accessibilityLabel`, `accessible`, and `aria-*` attributes).
- Use Stylings from the `/src/theme/ts` file

#### Navigation:
- Use React Navigation for handling app navigation, following best practices like lazy-loading screens and deep linking.
- Use `createStackNavigator` or `createDrawerNavigator` with type-safe navigation props.
- Avoid over-nesting navigators; design navigation hierarchies carefully for simplicity.

#### Best Practices:
- Use Expo's EAS Build and Updates for fast, reliable deployments and Over-The-Air (OTA) updates.
- Follow the threading model to ensure smooth animations and UI performance.
- Use environment variables (`expo-constants` or `dotenv`) to manage sensitive configurations.
- Write unit tests for components and integration tests for critical workflows.
- Follow SOLID principles for building scalable and maintainable codebases.

#### Debugging and Logging:
- Use `expo-dev-client` and React DevTools for debugging.
- Leverage tools like Flipper and Expo's debugging utilities to identify performance bottlenecks.
- Log meaningful error messages and use tools like Sentry or Firebase Crashlytics for error tracking.